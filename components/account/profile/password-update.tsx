import React, { FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ApiRequestService } from '@/services/apiRequest.service';

interface ResponseDataItem {
  status: string;
  message: string;
  data: any;
  totalRecords: any;
}

const UpdatePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!oldPassword) newErrors.oldPassword = 'Old password is required.';
    if (!password) newErrors.password = 'New password is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const data = {
        old_password: oldPassword,
        new_password: password,
        confirm_password: confirmPassword
      };

      const response = await ApiRequestService.callAPI<ResponseDataItem>(data, 'auth/updatePassword');

      if (response.status === 200) {

        const responseData = response.data;

        if (responseData.status === false) {
          toast.error(responseData.message);
      } else if (responseData.status === true) {

        toast.success('Password updated successfully.');
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
         
      }

       
      } else {
        toast.error('Failed to update password.');
      }
    } catch (error) {
      console.error('Update Password Error:', error);
      toast.error('An error occurred while updating password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-10 p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-semibold">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setErrors(prev => ({ ...prev, oldPassword: '' }));
            }}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
          />
          {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }}
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primaryBg text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdatePassword;
