import React, { useState } from 'react';

const FormModal = ({ bedInfo, wardName, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientDetails: '',
    phone: '',
    date: '',
    time: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Form submitted for Bed ${bedInfo.bedIndex + 1} in Room ${bedInfo.roomNumber}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative overflow-hidden transform transition-transform duration-300 ease-in-out">
        <button
          className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
          onClick={onClose}
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-3">
          Bed {bedInfo.bedIndex + 1} Form
        </h2>
        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Ward Name</label>
                <input
                  type="text"
                  value={wardName}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Room Number</label>
                <input
                  type="text"
                  value={bedInfo.roomNumber}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                />
              </div>
             
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">Patient Details</label>
                <textarea
                  name="patientDetails"
                  value={formData.patientDetails}
                  onChange={handleChange}
                  className="mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  rows="4"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 transform hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
