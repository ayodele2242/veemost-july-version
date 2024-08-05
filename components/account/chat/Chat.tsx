"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SideBar from '../SideBar';
import Container from '../../Container';
import useAutoLogout from '@/hooks/useAutoLogout';
import { isUserLoggedIn, redirectToLoginPage } from '@/auth/auth';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonPage from '@/loaders/SkeletonPage';
import { ApiRequestService } from '@/services/apiRequest.service';
import { fetchCustomerRepresentatives, fetchMessages } from '@/services/requestAll.service';
import Pagination from "@/pagination/Pagination";
import EmptyList from '../orders/EmptyList';
import LazyImage from '@/components/LazyImage';
import { RiGalleryUploadFill, RiImageFill, RiMic2Fill, RiMicFill, RiMicOffFill, RiSendPlane2Fill, RiFileUploadFill } from 'react-icons/ri';
import { Camera02Icon, ClosedCaptionAltIcon, MultiplicationSignIcon, 
  Delete04Icon, Delete03Icon, CameraAdd01Icon, CameraAdd02Icon, RecordIcon, VoiceIcon, CameraVideoIcon } from 'hugeicons-react';
import styles from '../../products/CheckboxStyles.module.css'
import { ToastContainer, Bounce, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useModal } from '@/contexts/ModalContext';
import Picker, { EmojiClickData } from 'emoji-picker-react';
import { CameraIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Spinner from '@/components/Spinner';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Media {
  id: number;
  image: string;
  type: 'image' | 'video';
  name: string;
}

interface Message {
  id: number;
  dept_name: string;
  from_msg_id: number;
  from_name: string;
  to_msg_id: number;
  to_name: string;
  msg: string;
  media: Media[];
  insert_date: string;
  status: boolean;
}

interface ResponseDataItem {
  status: boolean;
  message: string;
  data: any[];
  totalRecords: number;
  page: number;
  limit: number;
}


  
  interface Emoji {
    character: string;
    unicodeName: string;
  }
  
  interface User {
    userId: string;
    userName: string;
    departmentName: string;
  }

  interface Representative {
    id: any;
    name: string;
    department: string;
  }

  interface UserProfile {
    user_id: number;
    last_name: string;
    first_name: string;
    email: string;
    
  }

  const defaultProfile: UserProfile = {
    user_id: 0,
    last_name: '',
    first_name: '',
    email: ''
  };

  interface MessageRequest {
    from_id: number;
    to_id: number;
    dept: string;
    msg: string;
    // Add other fields as needed
  }

  interface FileData {
    name: string;
    type: string;
    size: number;
    content?: string; // Optional if you're working with base64 content
  }

const Chat = () => {

    const [loading, setLoading] = useState(true);
    const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
    const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
    const [capturedVideo, setCapturedVideo] = useState<Blob | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
    const [recordingTimer, setRecordingTimer] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [isEmojiSelectorActive, setIsEmojiSelectorActive] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [choosenEmoji, setChoosenEmoji] = useState('');
    const mediaPreviewContainerRef = useRef<HTMLDivElement | null>(null);
    const emojiSelectorRef = useRef<HTMLDivElement | null>(null);
    const emojiListRef = useRef<HTMLUListElement | null>(null);
    const emojiSearchRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordingStartTimeRef = useRef<number | null>(null);
    const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [textareaHeight, setTextareaHeight] = useState<number>(0);
    const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
    const [isIconListVisible, setIsIconListVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [representatives, setRepresentatives] = useState<Representative[]>([]);
    const [selectedRepresentative, setSelectedRepresentative] = useState<Representative | null>(null);
    const iconListRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [fetchedMessageIds, setFetchedMessageIds] = useState<Set<number>>(new Set());
    const [selectedChat, setSelectedChat] = useState<{ from_id: number; to_id: number; dept: string } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [previousChats, setPreviousChats] = useState<Message[]>([]);
    const [chatInterval, setChatInterval] = useState<NodeJS.Timer | null>(null);
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const [isSending, setIsSending] = useState(false);
    
       

    const expirePeriod =
    typeof window !== "undefined" ? localStorage.getItem("expire_period") : null;
    const expireTime = expirePeriod ? parseInt(expirePeriod, 10) : 0; 
    const isLoggedIn = useAutoLogout(expireTime);

    // Function to get user profile from localStorage
    const getUserProfile = (): UserProfile | null => {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        return JSON.parse(userJson) as UserProfile;
      }
      return null;
    };


if (!isLoggedIn) {
  redirectToLoginPage();
}

useLayoutEffect(() => {
  const loggedIn = isUserLoggedIn();
  if (!loggedIn) {
    redirectToLoginPage();
  } else {
    setLoading(false);
  }
}, []);




const fetchChatHistory = useCallback(async (senderId: number, receiverId: number, dept: string) => {
  try {
    const response = await axios.get<{ data: Message[] }>(
      `${API_URL}messaging/fetch_message_records`,
      {
        params: {
          senderId,
          receiverId,
          dept
        }
      }
    );

    const { data } = response.data;

    if (!data || data.length === 0) {
      setMessages([{ id: -1, dept_name: '', from_msg_id: 0, from_name: '', to_msg_id: 0, to_name: '', msg: 'No chats available', media: [], insert_date: '', status: false }]);
      return;
    }

    const isSameData = JSON.stringify(data) === JSON.stringify(previousChats);
    if (!isSameData) {
      setPreviousChats(data);
      setMessages(data);
      scrollToBottom();
    }
  } catch (error) {
    console.error('Error fetching chat history:', error);
    // Handle error (e.g., show notification or update state with error message)
  }
}, [previousChats]);
 

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

useEffect(() => {
  fetchCustomerRepresentatives()
      .then((data) => {
        setRepresentatives(data.representatives)
        //console.log(JSON.stringify(data.representatives));
      })
      .catch((error) => {
          console.log("Error occurred " + error)
      })
}, [])

useEffect(() => {
  const userProfile = getUserProfile();
  setProfile(userProfile);
}, []);


useEffect(() => {
  return () => {
    if (recordingTimer) {
      clearInterval(recordingTimer);
    }
  };
}, [recordingTimer]);



const handleFiles = async (files: FileList) => {
  const fileArray = Array.from(files).map(async (file) => {
    const base64Content = await convertFileToBase64(file);
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      content: base64Content,
    };
  });

  // Wait for all files to be converted to base64
  const resolvedFiles = await Promise.all(fileArray);
  setUploadedFiles(prev => [...prev, ...resolvedFiles]);
  resolvedFiles.forEach(file => previewMedia(file.content, file.type.split('/')[0], file.content, file.name));
};


const previewMedia = (blobUrl: string, type: string, previewUrl: string, fileName?: string) => {
  const mediaPreviewContainer = mediaPreviewContainerRef.current!;
  let previewHtml = '';

  if (type === 'video') {
    previewHtml = `
      <div class="media-preview-item">
        <video controls><source src="${previewUrl}" type="video/webm"></video>
        <button class="remove-preview-btn" data-type="video">X</button>
      </div>`;
  } else if (type === 'audio') {
    previewHtml = `
      <div class="media-preview-item">
        <audio controls><source src="${previewUrl}" type="audio/webm"></audio>
        <button class="remove-preview-btn" data-type="audio">X</button>
      </div>`;
  } else if (type === 'image') {
    previewHtml = `
      <div class="media-preview-item">
        <img src="${previewUrl}" class="img-preview" />
        <button class="remove-preview-btn" data-type="image">X</button>
      </div>`;
  } else if (fileName) {
    previewHtml = `
      <div class="media-preview-item">
        <a href="${previewUrl}" target="_blank">${fileName}</a>
        <button class="remove-preview-btn" data-type="file" data-name="${fileName}">X</button>
      </div>`;
  }

  mediaPreviewContainer.innerHTML += previewHtml;
  mediaPreviewContainer.classList.remove('d-none');

  // Attach event listeners to the newly added remove buttons
  const removeButtons = mediaPreviewContainer.querySelectorAll('.remove-preview-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const targetButton = event.currentTarget as HTMLButtonElement;
      const previewItem = targetButton.closest('.media-preview-item');
      if (previewItem) {
        mediaPreviewContainer.removeChild(previewItem);
        // Optional: Update internal state or perform other actions as needed
      }
    });
  });
};





const startRecording = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        let chunks: Blob[] = [];
        mediaRecorder.ondataavailable = event => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setRecordedAudio(blob);
          previewMedia(URL.createObjectURL(blob), 'audio', URL.createObjectURL(blob), 'Recorded Audio');
        };

        mediaRecorder.start();
        setIsRecording(true);
        recordingStartTimeRef.current = Date.now();
        startRecordingTimer();
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  } else {
    console.error('getUserMedia not supported on your browser');
  }
};

const stopRecording = () => {
  if (mediaRecorderRef.current && isRecording) {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    stopRecordingTimer();
  }
};


const startRecordingTimer = () => {
  recordingTimerRef.current = setInterval(() => {
    if (recordingStartTimeRef.current) {
      const elapsedTime = Date.now() - recordingStartTimeRef.current;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      if (textareaRef.current) {
        textareaRef.current.value = `Recording: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);
};

const stopRecordingTimer = () => {
  if (recordingTimerRef.current) {
    clearInterval(recordingTimerRef.current);
    if (textareaRef.current) {
      textareaRef.current.value = 'Recording: 00:00';
    }
  }
};

// Convert Blob URL to Blob
const urlToBlob = async (url: string): Promise<Blob> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

const handleSendMessage = async () => {
  if (!selectedRepresentative) {
    console.error('No user selected');
    return;
  }

  setIsSending(true);
  const currentProfile = profile || defaultProfile;

  // Prepare the JSON payload

  const prepareFileData = async (file: File | Blob, name: string, type: string): Promise<any> => {
    const base64String = await convertFileToBase64(file);
    return {
      name: name,
      type: type,
      size: file.size,
      content: base64String
    };
  };


  const filesArray = [];

  // Convert uploaded files
  for (const file of uploadedFiles) {
    if (file.content) {
      filesArray.push({
        name: file.name,
        type: file.type,
        size: file.size,
        content: file.content
      });
    } else {
      console.error('File content is undefined:', file);
    }
  }

  // Convert recorded audio
  if (recordedAudio) {
    const audioFileData = await prepareFileData(recordedAudio, 'recorded_audio_' + Date.now() + '.wav', recordedAudio.type);
    filesArray.push(audioFileData);
  }

  // Convert captured image
  if (capturedImage) {
    const imageFileData = await prepareFileData(capturedImage, 'captured_image_' + Date.now() + '.webp', 'image/webp');
    filesArray.push(imageFileData);
  }

  // Convert captured video
  if (capturedVideo) {
    const videoFileData = await prepareFileData(capturedVideo, 'captured_video_' + Date.now() + '.mp4', capturedVideo.type);
    filesArray.push(videoFileData);
  }

  // Create the JSON payload
  const payload = {
    command: 'message',
    dept_name: selectedRepresentative.department,
    message: message,
    toUserId: selectedRepresentative.id,
    toUserName: selectedRepresentative.name,
    fromUserId: currentProfile.user_id.toString(),
    fromUserName: `${currentProfile.last_name} ${currentProfile.first_name}`,
    files: filesArray
  };

  try {
    // Send JSON payload to the backend
    const response = await ApiRequestService.callAPI<ResponseDataItem>(
      payload, 'messaging/new_message'
    );

    const responseData = response.data;

    if (responseData.status === 'success') {
      setIsSending(false);
      setMessage('');
      setUploadedFiles([]);
      setRecordedAudio(null);
      setCapturedVideo(null);
      //mediaPreviewContainerRef.current?.classList.add('d-none');
       // Empty the media preview container
       if (mediaPreviewContainerRef.current) {
        mediaPreviewContainerRef.current.innerHTML = '';
        mediaPreviewContainerRef.current.classList.add('d-none');
      }
    } else {
      console.error('Error sending message:', responseData);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};



const convertFileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};


// Function to convert base64 string to Blob
const base64ToBlob = (base64: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const [prefix, base64Data] = base64.split(',');
    const mimeString = prefix.split(':')[1].split(';')[0];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    resolve(new Blob(byteArrays, { type: mimeString }));
  });
};




const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};


const handleCaptureMedia = (mediaType: 'video' | 'image') => {
  setIsIconListVisible(false);

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    const constraints: MediaStreamConstraints = {
      video: mediaType === 'video' || mediaType === 'image',
      audio: mediaType === 'video', // Include audio for video recording
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.setAttribute('autoplay', 'true');
        videoElement.classList.add('capture-video');
        videoElement.style.width = '100%'; // Ensure video takes up full width
        videoElement.style.height = 'auto'; // Maintain aspect ratio

        const overlay = document.createElement('div');
        overlay.classList.add('capture-overlay');
        overlay.style.position = 'fixed'; // Ensure overlay is fixed to the screen
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Slight dark background

        const videoWrapper = document.createElement('div');
        videoWrapper.style.position = 'relative';
        videoWrapper.style.width = '80%'; // Set a max width for video
        videoWrapper.style.maxWidth = '800px'; // Maximum width for larger screens
        videoWrapper.style.maxHeight = '80%'; // Maximum height for larger screens
        videoWrapper.style.overflow = 'hidden'; // Hide overflow to prevent scrolling

        videoWrapper.appendChild(videoElement);
        overlay.appendChild(videoWrapper);

        // Timer
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        overlay.appendChild(timerElement);

        let timerInterval: NodeJS.Timeout | null = null;
        let seconds = 0;

        // Create capture button
        const captureButton = document.createElement('button');
        captureButton.textContent = 'Capture';
        captureButton.classList.add('capture-button');
        captureButton.style.position = 'absolute'; // Absolute positioning for capture button
        captureButton.style.bottom = '20px'; // Place button at the bottom
        captureButton.style.left = '50%'; // Center horizontally
        captureButton.style.transform = 'translateX(-50%)'; // Center horizontally
        captureButton.style.padding = '10px 20px';
        captureButton.style.backgroundColor = '#007bff';
        captureButton.style.color = '#fff';
        captureButton.style.border = 'none';
        captureButton.style.borderRadius = '5px';
        captureButton.style.cursor = 'pointer';

        captureButton.onclick = () => {
          if (mediaType === 'image') {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = videoElement.videoWidth;
              canvas.height = videoElement.videoHeight;

              // Scale the canvas if needed
              const maxWidth = 800; // Max width for the image
              const maxHeight = 600; // Max height for the image
              let scale = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
              canvas.width *= scale;
              canvas.height *= scale;
              
              context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

              canvas.toBlob(blob => {
                if (blob) {
                  setCapturedImage(blob);
                  previewMedia(URL.createObjectURL(blob), mediaType, URL.createObjectURL(blob));
                  stopMediaStream(stream); // Stop the camera stream after capturing
                  overlay.remove(); // Automatically close the overlay after capturing
                }
              }, 'image/webp');
            }
          }
        };

        // Create start recording button (for video recording)
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Recording';
        startButton.classList.add('capture-button');
        startButton.style.position = 'absolute'; // Absolute positioning for start button
        startButton.style.bottom = '20px'; // Place button at the bottom
        startButton.style.left = '50%'; // Center horizontally
        startButton.style.transform = 'translateX(-50%)'; // Center horizontally
        startButton.style.padding = '10px 20px';
        startButton.style.backgroundColor = '#007bff';
        startButton.style.color = '#fff';
        startButton.style.border = 'none';
        startButton.style.borderRadius = '5px';
        startButton.style.cursor = 'pointer';

        startButton.style.display = mediaType === 'video' ? 'inline-block' : 'none'; // Show only for video

        // Create stop button (for video recording)
        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop Recording';
        stopButton.classList.add('capture-button');
        stopButton.style.position = 'absolute'; // Absolute positioning for stop button
        stopButton.style.bottom = '20px'; // Place button at the bottom
        stopButton.style.left = '50%'; // Center horizontally
        stopButton.style.transform = 'translateX(-50%)'; // Center horizontally
        stopButton.style.padding = '10px 20px';
        stopButton.style.backgroundColor = '#dc3545';
        stopButton.style.color = '#fff';
        stopButton.style.border = 'none';
        stopButton.style.borderRadius = '5px';
        stopButton.style.cursor = 'pointer';
        stopButton.style.display = mediaType === 'video' ? 'none' : 'inline-block'; // Hide by default
        stopButton.disabled = true;

        let mediaRecorder: MediaRecorder | null = null;
        if (mediaType === 'video') {
          mediaRecorder = new MediaRecorder(stream);
          let chunks: Blob[] = [];

          mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            chunks = [];
            setCapturedVideo(blob);
            previewMedia(URL.createObjectURL(blob), mediaType, URL.createObjectURL(blob));
            stopMediaStream(stream); // Stop the camera stream after capturing
          };

          startButton.onclick = () => {
            mediaRecorder!.start();
            timerInterval = setInterval(() => {
              seconds++;
              timerElement.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;
            }, 1000);
            startButton.style.display = 'none'; // Hide start button after starting recording
            stopButton.style.display = 'inline-block'; // Show stop button
            stopButton.disabled = false;
          };

          stopButton.onclick = () => {
            if (mediaRecorder) {
              mediaRecorder.stop();
              clearInterval(timerInterval!);
              startButton.style.display = 'inline-block'; // Show start button for next recording
              stopButton.style.display = 'none'; // Hide stop button
              stopMediaStream(stream); // Stop the camera stream after capturing
              overlay.remove();
            }
          };
        }

        overlay.appendChild(startButton);
        if (mediaType === 'video') {
          overlay.appendChild(stopButton);
        }
        overlay.appendChild(captureButton);

        // Append overlay to the document
        document.body.appendChild(overlay);

        // Add click event listener to the overlay to allow manual closing of the overlay
        overlay.addEventListener('click', (event: MouseEvent) => {
          if (event.target === overlay) {
            overlay.remove();
            stopMediaStream(stream); // Stop the camera stream on manual overlay close
            if (timerInterval) {
              clearInterval(timerInterval);
            }
          }
        });
      })
      .catch(error => {
        console.error(`Error accessing ${mediaType} capture:`, error);
      });
  } else {
    console.error('getUserMedia not supported on your browser');
  }
};




// Helper function to stop the media stream
const stopMediaStream = (stream: MediaStream) => {
  stream.getTracks().forEach(track => track.stop());
};








const handleRemovePreview = (e: React.MouseEvent<HTMLButtonElement>) => {
  const target = e.target as HTMLButtonElement;
  const type = target.dataset.type as string;
  const name = target.dataset.name as string;

  setUploadedFiles(prev => prev.filter(file => file.name !== name));

  if (type === 'audio' && recordedAudio) {
    setRecordedAudio(null);
  } else if (type === 'video' && capturedVideo) {
    setCapturedVideo(null);
  }

  if (mediaPreviewContainerRef.current) {
    const mediaPreviewItem = target.closest('.media-preview-item');
    if (mediaPreviewItem) {
      mediaPreviewItem.remove();
    }
  }
};

const toggleEmojiSelector = () => {
  setIsEmojiSelectorActive(prev => !prev);
  if (emojiSelectorRef.current) {
    emojiSelectorRef.current.classList.toggle('active');
  }
};

const handleEmojiClick = (event: React.MouseEvent, emojiObject: EmojiClickData) => {
  if (textareaRef.current) {
    const cursorPosition = textareaRef.current.selectionStart!;
    const textBefore = message.substring(0, cursorPosition);
    const textAfter = message.substring(cursorPosition, message.length);
    setMessage(`${textBefore}${emojiObject.emoji}${textAfter}`);
    textareaRef.current.focus();
    textareaRef.current.selectionEnd = cursorPosition + emojiObject.emoji.length;
  }
};

const handleReaction = (emojiData: EmojiClickData) => {
  handleEmojiClick({} as React.MouseEvent, emojiData);
};

// Handle clicks outside the emoji picker to close it
const handleClickOutside = useCallback((event: MouseEvent) => {
  if (emojiSelectorRef.current && !emojiSelectorRef.current.contains(event.target as Node)) {
    //console.log("Clicked outside")
    setIsEmojiSelectorActive(prev => !prev);
    setIsIconListVisible(prev => !prev);
    
    if (emojiSelectorRef.current) {
      emojiSelectorRef.current.classList.toggle('inactive');
    }
    setIsEmojiPickerVisible(false);
    setIsIconListVisible(false);
  }

  if (iconListRef.current && !iconListRef.current.contains(event.target as Node)) {
    setIsIconListVisible(false);
  }
}, []);


useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [handleClickOutside]);


useEffect(() => {
  const textarea = textareaRef.current;

  if (textarea) {
    // Set the initial height to 'auto' so that it expands to fit content
    textarea.style.height = '40px';
    setTextareaHeight(textarea.scrollHeight); // Set initial height

    const handleInput = () => {
      // Set the height to 'auto' to recalculate
      textarea.style.height = 'auto';
      
      // Get the scroll height
      const newHeight = Math.min(textarea.scrollHeight, 100); // Limit to 100px

      // Set the height
      textarea.style.height = `${newHeight}px`;
      setTextareaHeight(newHeight);
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }
}, []);



const toggleIconList = () => {
  setIsIconListVisible(prev => !prev);
};

const triggerFileInput = () => {
  setIsIconListVisible(false);
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};


const handleItemClick = (representative: Representative) => {
  setSelectedRepresentative(representative);
  console.log('Selected Representative:', representative);
};



  useEffect(() => {
    if (selectedRepresentative && profile) {
      const { user_id } = profile;
      const { id, department } = selectedRepresentative;
  
      // Fetch chat history initially
      fetchChatHistory(user_id, id, department);
  
      // Set up an interval to fetch chat history every 3 seconds
      const intervalId = setInterval(() => {
        fetchChatHistory(user_id, id, department);
      }, 3000);
  
      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [selectedRepresentative, profile, fetchChatHistory]);
  


  /*const renderMedia = (media: Media[]) => {
    return media.map(item => {
      if (item.type === 'audio') return <audio controls src={item.image} key={item.id} />;
      if (item.type === 'image') return <img src={item.image} alt={item.name} key={item.id} />;
      if (item.type === 'video') return <video controls src={item.image} key={item.id} />;
      if (item.type === 'file') return <a href={item.image} download={item.name} key={item.id}>{item.name}</a>;
      return null;
    });
  };*/




  return (
    <main className="w-full overflow-hidden">
    <Header />
        <Container>
            <div className="flex gap-5">
                <div className="w-1/4 hidden md:block">
                <SideBar />
                </div>
                <div className="w-full md:w-3/4">

               
                <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 bg-gray-200 p-4 flex flex-wrap lg:flex-col xl:flex-col relative">
                    
                   <div className="flex flex-col text-[14px]">
                   {representatives.map((rep) => (
                    <div
                      key={rep.id}
                      className={`w-full md:w-1/2 lg:w-full p-2 cursor-pointer ${selectedRepresentative?.id === rep.id ? 'bg-lightBg text-primaryText font-bold fadeIn' : ''}`}
                      onClick={() => handleItemClick(rep)}
                    >
                      {rep.name} - {rep.department}
                    </div>
                  ))}
                   </div>
                   
                    
                    <div ref={mediaPreviewContainerRef} className="media-preview d-none absolute bottom-[2px]"></div>
                   
                </div>
                <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 p-0">
                
                  <div className="chat-container relative w-full h-[500px] p-1 bg-gray-50">
      
                  <div className="chat-messages h-[83%] w-full bg-gray-50 flex-1 overflow-auto flex flex-col-reverse relative">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`message p-2 mb-2 border rounded-lg w-[60%] ${
                            message.from_msg_id === profile?.user_id
                              ? 'self-end bg-lightBg text-black'
                              : 'self-start bg-gray-200 text-black'
                          }`}
                        >
                          <div className="message-info mb-2">
                            <p className="font-semibold">{message.from_msg_id === profile?.user_id ? 'You' : message.from_name}</p>
                            <small className="text-gray-500">{new Date(message.insert_date).toLocaleTimeString()}</small>
                          </div>
                          <p>{message.msg}</p>
                          <div className="media mt-2 flex flex-wrap gap-3">
                            {message?.media?.map((mediaItem) => (
                              mediaItem.type === 'image' ? (
                                <Image
                                  key={mediaItem.id}
                                  src={mediaItem.image}
                                  alt={mediaItem.name}
                                  width={100}
                                  height={100}
                                  className="w-[100px] h-[100px] h-auto mb-2 rounded-lg"
                                />
                              ) : mediaItem.type === 'video' ? (
                                <video
                                  key={mediaItem.id}
                                  src={mediaItem.image}
                                  controls
                                  className="max-w-full h-auto mb-2 rounded-lg"
                                />
                              ) : null
                            ))}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                      {isSending && <div className="sending-indicator flex gap-2 justify-center items-center"><Spinner size='sm' /> Sending message...</div>}
                    </div>
                    

                    <div className="w-full flex justify-center items-center w-full bg-white gap-4 h-[17%]">
                        <div className="gallery relative">
                          <Camera02Icon onClick={toggleIconList}/>
                          {isIconListVisible && (
                              <div 
                              ref={iconListRef}
                              className="iconList flex flex-col absolute z-50 z50 bottom-[30px] 
                              w-[170px] text-sm bg-white gap-2 p-3">
                                <div onClick={() => handleCaptureMedia('video')} 
                                className="flex justify-left items-center gap-2 w-full p-1 cursor-pointer"><CameraVideoIcon /> Record Video</div>
                                <div onClick={() => handleCaptureMedia('image')} 
                                  className="flex justify-left items-center gap-2 w-full p-1 cursor-pointer">
                                    <RiImageFill size={20} /> Capture Image
                                </div>
                                <div onClick={triggerFileInput} className="flex justify-left items-center gap-2 w-full p-1 cursor-pointer">
                                    <RiFileUploadFill size={20} /> Upload Files
                                </div>
                              </div>
                          )}
                          </div>
                        <textarea
                          ref={textareaRef}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          placeholder="Type message..."
                        />
                        <div className="flex gap-3">
                        <button onClick={toggleEmojiSelector}>😊</button>
                        {isRecording ? (
                          <button onClick={stopRecording} className="rounded-full h-6 w-6 bg-red-500 text-white p-1 relative ripple-button"><RiMicOffFill /></button>
                        ) : (
                          <button onClick={startRecording} ><RiMicFill /></button>
                        )}
                        
                        <button onClick={handleSendMessage}><RiSendPlane2Fill size={20} className="text-primaryBg"/></button>
                        </div>
                        <input
                          type="file"
                          multiple
                          onChange={e => handleFiles(e.target.files!)}
                          style={{ display: 'none' }}
                          id="file-input"
                          ref={fileInputRef}
                        />

                    </div>

                    {isEmojiSelectorActive && (
                      <div ref={emojiSelectorRef} className="emoji-selector">
                        <Picker
                          onEmojiClick={handleReaction}
                        />
                      </div>
                    )}


     

     
                   
                  </div>
                </div>
                </div>

                
                
                </div>
            </div>
        </Container>
    <Footer />
    </main>
  )
}

export default Chat
