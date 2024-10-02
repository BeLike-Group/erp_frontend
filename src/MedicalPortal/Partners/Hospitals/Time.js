import React from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Modal({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = React.useState('Aug, 16');
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [startIndex, setStartIndex] = React.useState(0);

  const navigate = useNavigate();

  // Sample dates
  const dates = [
    'Aug, 16', 'Aug, 17', 'Aug, 18', 'Aug, 19', 'Aug, 20',
    'Aug, 21', 'Aug, 22', 'Aug, 23', 'Aug, 24', 'Aug, 25', 'Aug, 26'
  ];

  const datesPerPage = 4;
  const totalDates = dates.length;
  const maxStartIndex = Math.max(0, totalDates - datesPerPage);

  const visibleDates = dates.slice(startIndex, startIndex + datesPerPage);

  const showMoreDates = () => {
    setStartIndex(prevIndex => Math.min(prevIndex + datesPerPage, maxStartIndex));
  };

  const showPreviousDates = () => {
    setStartIndex(prevIndex => Math.max(prevIndex - datesPerPage, 0));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot selection when changing date
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    navigate('/appointments'); // Navigate to the appointments page
  };

  // Define slots for each date
  const getSlotsForDate = (date) => {
    switch (date) {
      case 'Aug, 16':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM','02:00'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM','05:00'] };
      case 'Aug, 17':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 18':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 19':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 20':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 21':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 22':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 23':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 24':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 25':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      case 'Aug, 26':
        return { morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'], afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'] };
      default:
        return { morning: [], afternoon: [] };
    }
  };

  const { morning, afternoon } = getSlotsForDate(selectedDate);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center h-screen text-black'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div className='relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg'>
        <button onClick={onClose} className="absolute text-2xl text-gray-800 top-2 right-2">
          &times;
        </button>
        <div className="relative">
          <div className="flex flex-col mb-6">
            <div className="relative flex items-center mb-6">
              <div className="flex overflow-x-auto flex-nowrap">
                {visibleDates.map(date => (
                  <button
                    key={date}
                    onClick={() => handleDateChange(date)}
                    className={`px-4 py-2 mx-2 rounded-lg transition-colors duration-300 ease-in-out ${selectedDate === date ? 'bg-yellow-300 text-gray-800' : 'bg-white text-gray-600'
                      }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
              <div className="absolute right-0 flex flex-col items-center space-y-2 transform -translate-y-1/2 top-1/2">
                {startIndex > 0 && (
                  <button
                    onClick={showPreviousDates}
                    className="p-2 text-gray-800 transition-colors duration-300 ease-in-out bg-yellow-200 rounded-lg hover:bg-yellow-300"
                  >
                    <FaChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {startIndex < maxStartIndex && (
                  <button
                    onClick={showMoreDates}
                    className="p-2 text-gray-800 transition-colors duration-300 ease-in-out bg-yellow-200 rounded-lg hover:bg-yellow-300"
                  >
                    <FaChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2.691a7.75 7.75 0 10-7.75 7.75 7.75 7.75 0 007.75-7.75zm1.06 3.24a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0z"
                  />
                </svg>
                <h2 className="ml-2 text-xl font-semibold">Morning Slots</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {morning.map(slot => (
                  <button
                    key={slot}
                    onClick={() => handleSlotClick(slot)}
                    className={`px-5 py-3 font-medium rounded-lg transition-colors duration-300 ease-in-out ${selectedSlot === slot ? 'bg-yellow-300 text-gray-800' : 'bg-yellow-100 text-gray-800'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2.691a7.75 7.75 0 10-7.75 7.75 7.75 7.75 0 007.75-7.75zm1.06 3.24a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0z"
                    />
                  </svg>
                  <h2 className="ml-2 text-xl font-semibold">Afternoon Slots</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {afternoon.map(slot => (
                    <button
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className={`px-5 py-3 font-medium rounded-lg transition-colors duration-300 ease-in-out ${selectedSlot === slot ? 'bg-yellow-300 text-gray-800' : 'bg-yellow-100 text-gray-800'
                        }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Modal;
  
