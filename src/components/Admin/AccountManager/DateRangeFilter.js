import React, { useState } from 'react';

const DateRangeFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(new Date(startDate), new Date(endDate));
  };

  return (
    <div className="filter-section p-4 text-white flex flex-col md:flex-row items-center justify-between bg-blue-900 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <label htmlFor="start-date" className="text-white">From:</label>
        <input
          id="start-date"
          className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          required
        />
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <label htmlFor="end-date" className="text-white">To:</label>
        <input
          id="end-date"
          className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          required
        />
      </div>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default DateRangeFilter;
