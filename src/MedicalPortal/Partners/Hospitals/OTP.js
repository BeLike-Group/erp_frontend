import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhoneAlt, FaRedo } from 'react-icons/fa';

const OTP = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    let timer;
    if (isRequesting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRequesting(false);
    }

    return () => clearInterval(timer);
  }, [isRequesting, timeLeft]);

  const handleRequestAgain = () => {
    setIsRequesting(true);
    setTimeLeft(36); // Set the countdown time here
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-black bg-gradient-to-r from-green-200 to-blue-200  dark:bg-gray-900">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-200">
        <h1 className="mb-6 text-2xl font-semibold text-center">Enter OTP</h1>
        <p className="mb-4 text-center text-gray-600">Code sent to +880-123456789</p>
        <div className="grid grid-cols-5 my-2 gap-x-4">
          {['1', '9', '6', '4', '3'].map((digit, index) => (
            <div
              key={index}
              contentEditable="true"
              className="flex items-center justify-center bg-gray-100 rounded-lg cursor-text dark:bg-gray-800 w-14 aspect-square"
            >
              <span className="text-gray-700 dark:text-gray-400">{digit}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between mb-6">
          <p className="text-sm text-gray-600">Didn't receive code?</p>
          <div className="flex items-center space-x-2">
            <NavLink to="/request-call" className="flex items-center px-3 py-2 text-sm font-medium text-center text-gray-500 rounded hover:text-blue-500">
              <FaPhoneAlt className="mr-1" /> Request via Call
            </NavLink>
            <button
              onClick={handleRequestAgain}
              className="flex items-center px-3 py-2 text-sm font-medium text-center text-gray-500 rounded hover:text-blue-500"
              disabled={isRequesting}
            >
              <FaRedo className="mr-1" /> 
              {isRequesting ? `Request Again (${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')})` : 'Request Again'}
            </button>
          </div>
        </div>
        <NavLink to={"payment"}>
        <button className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Verify
        </button>
        </NavLink>
      </div>
      
    </div>
  );
};

export default OTP;














