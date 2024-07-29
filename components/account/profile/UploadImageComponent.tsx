import React, { useEffect, useState } from 'react';
import { useImage } from '@/providers/ImageContext'; 
import Image from 'next/image';

const UploadImageComponent: React.FC = () => {
  const { uploadImage } = useImage();
  const { uploadedImage, uploadStatus, resetUploadStatus } = useImage();
  const [messageVisible, setMessageVisible] = useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input dialog
    }
  };

  const hideMessage = () => {
    setMessageVisible(false);
    resetUploadStatus();
  };

  if (uploadStatus === 'uploading' || uploadStatus === 'success' || uploadStatus === 'error') {
    setTimeout(hideMessage, 8000);
  }

  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined' && localStorage.getItem('uploadedImage')) {
      const img = localStorage.getItem('uploadedImage');
      setProfilePicture(img);
    } else {
      setProfilePicture(uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <div className="flex flex-col gap-3">
    <div className="flex flex-col lg:flex-row 2xl:flex-row justify-left items-center gap-4">
      <div className="imgDiv"> 

      {profilePicture && (
                
                <div className="w-[130px] h-[130px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden rounded-full">
                <Image
                    src={profilePicture}
                    alt="Profile"
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover" 
                />
               </div>
            )}
            {!profilePicture && (
                <Image 
                src={'/no-image-icon.png'} 
                alt="Profile" 
                width="20" 
                height="20" 
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" 
            />
            
         )}
        
      </div>
      <div className="flex flex-col">
        <div 
          className="font-bold bg-lightBg text-primaryText flex justify-center items-center p-3 rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          Change Profile Photo
        </div>
        <p className="text-gray-400 text-[12px] mt-1 font-bold">JPEG, GIF or PNG. 1MB max.</p>
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/jpeg, image/png, image/gif"
          onChange={handleImageUpload}
        />
      </div>
  </div>
      {uploadStatus === 'uploading' && <div className="w-full text-blue-400 flex justify-left items-center font-bold">Uploading image...</div>}
      {uploadStatus === 'success' && <div className="w-full text-green-400 flex justify-left items-center font-bold">Profile Image updated successfully!</div>}
      {uploadStatus === 'error' && <div className="w-full text-red-400 flex jujustify-left items-center font-bold">Failed to upload image.</div>}
  
    </div>
  );
};

export default UploadImageComponent;
