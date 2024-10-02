import React, { useState } from 'react';
import { FaBed } from 'react-icons/fa';
import { MdHotel } from 'react-icons/md';
import FormModal from './FormModal'; // Import the FormModal component

const Modal = ({ ward, onClose }) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);

  const rooms = [
    {
      roomNumber: "101",
      beds: [
        { status: "Free" },
        { status: "Occupied" },
        { status: "Free" }
      ],
    },
    {
      roomNumber: "102",
      beds: [
        { status: "Occupied" },
        { status: "Occupied" },
        { status: "Free" }
      ],
    },
    {
      roomNumber: "103",
      beds: [
        { status: "Occupied" },
        { status: "Occupied" },
        { status: "Occupied" }
      ],
    },
  ];

  const getBedsSummary = (beds) => {
    const freeBeds = beds.filter(bed => bed.status === 'Free').length;
    const occupiedBeds = beds.filter(bed => bed.status === 'Occupied').length;
    return { free: freeBeds, occupied: occupiedBeds };
  };

  const handleBedClick = (roomNumber, bedIndex) => {
    setSelectedBed({ roomNumber, bedIndex });
    setShowFormModal(true);
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full relative overflow-hidden">
          <button
            className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
            onClick={onClose}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <MdHotel className="text-blue-600 mr-3" /> {ward.name} Details
          </h2>
          <div className="overflow-y-auto max-h-[70vh]">
            <h3 className="text-2xl font-semibold mb-6">Rooms and Beds</h3>
            {rooms.map((room, index) => {
              const { free, occupied } = getBedsSummary(room.beds);
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-lg mb-6 shadow-md border border-gray-200">
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <MdHotel className="text-blue-500 mr-3" /> Room {room.roomNumber}
                  </h4>
                  <div className="flex space-x-4 mb-4">
                    {room.beds.map((bed, bedIndex) => (
                      <div
                        key={bedIndex}
                        className={`flex-1 p-4 rounded-md ${bed.status === 'Free' ? 'bg-green-100 cursor-pointer hover:bg-green-200' : 'bg-red-100 cursor-not-allowed'} flex items-center justify-center`}
                        onClick={bed.status === 'Free' ? () => handleBedClick(room.roomNumber, bedIndex) : undefined}
                      >
                        <FaBed className={`w-8 h-8 ${bed.status === 'Free' ? 'text-green-500' : 'text-red-500'}`} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-gray-700">
                    <p className="font-semibold">
                      Free Beds: {free} <FaBed className="inline text-green-500 ml-2" />
                    </p>
                    <p className="font-semibold">
                      Occupied Beds: {occupied} <FaBed className="inline text-red-500 ml-2" />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
         
        </div>
      </div>
      {showFormModal && selectedBed && (
        <FormModal
          bedInfo={selectedBed}
          wardName={ward.name} // Pass ward name as prop
          onClose={() => setShowFormModal(false)}
        />
      )}
    </div>
  );
};

export default Modal;
