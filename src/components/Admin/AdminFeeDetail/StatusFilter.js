import React, { useState } from 'react';

const StatusFilter = ({ onFilter }) => {
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter(status);
  };

  return (
    <div className="filter-section p-4 text-white flex flex-col md:flex-row items-center justify-between bg-blue-900 rounded-lg shadow-md space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
        <label htmlFor="status" className="text-white">Filter by Status:</label>
        <select
          id="status"
          className="bg-gray-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Remaining">Remaining</option>
        </select>
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Filter
      </button>
    </div>
  );
};

export default StatusFilter;
