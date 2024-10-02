import React from 'react';

const FeeTable = ({ fees }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-dark-blue text-white shadow-lg">
        <thead>
          <tr className="bg-blue-900 text-left">
            <th className="py-3 px-6 border-b border-gray-700">Student Name</th>
            <th className="py-3 px-6 border-b border-gray-700">Roll Number</th>
            <th className="py-3 px-6 border-b border-gray-700">Grade</th>
            <th className="py-3 px-6 border-b border-gray-700">Total Fees (Rs:)</th>
            <th className="py-3 px-6 border-b border-gray-700">Amount Paid (Rs:)</th>
            <th className="py-3 px-6 border-b border-gray-700">Remaining Amount (Rs:)</th>
            <th className="py-3 px-6 border-b border-gray-700">Date</th>
            <th className="py-3 px-6 border-b border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index} className="bg-blue-800 hover:bg-blue-700 transition-colors duration-200">
              <td className="py-3 px-6 border-b border-gray-700">{fee.studentName}</td>
              <td className="py-3 px-6 border-b border-gray-700">{fee.rollNumber}</td>
              <td className="py-3 px-6 border-b border-gray-700">{fee.grade}</td>
              <td className="py-3 px-6 border-b border-gray-700">Rs:{fee.totalFees}</td>
              <td className="py-3 px-6 border-b border-gray-700">Rs:{fee.amountPaid}</td>
              <td className={`py-3 px-6 border-b border-gray-700 ${fee.remainingAmount === 0 ? 'text-green-400' : 'text-red-400'}`}>
                Rs:{fee.remainingAmount}
              </td>
              <td className="py-3 px-6 border-b border-gray-700">{fee.date}</td>
              <td className="py-3 px-6 border-b border-gray-700">{fee.remainingAmount === 0 ? 'Fully Paid' : 'Remaining'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeTable;
