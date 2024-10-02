import React, { useState, useEffect } from 'react';
import TransactionModal from './TransactionModal'; // Ensure this is updated to handle the new fields
import axios from 'axios';

// StatusFilter Component
const StatusFilter = ({ onFilter, grades }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleFilterChange = () => {
    onFilter(selectedStatus, selectedGrade, rollNumber);
  };

  return (
    <div className="mb-4">
      <select
        value={selectedStatus}
        onChange={(e) => {
          setSelectedStatus(e.target.value);
          handleFilterChange();
        }}
        className="mr-2 p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="Fully Paid">Fully Paid</option>
        <option value="Remaining">Remaining</option>
      </select>

      <select
        value={selectedGrade}
        onChange={(e) => {
          setSelectedGrade(e.target.value);
          handleFilterChange();
        }}
        className="mr-2 p-2 rounded"
      >
        <option value="">All Grades</option>
        {grades.map((grade) => (
          <option key={grade} value={grade}>{grade}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => {
          setRollNumber(e.target.value);
          handleFilterChange();
        }}
        className="p-2 rounded"
      />
    </div>
  );
};

// FeeTable Component
const FeeTable = ({ fees, onAddFee }) => {
  return (
    <table className="min-w-full bg-gray-800">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left text-gray-200">Student ID</th>
          <th className="py-2 px-4 text-left text-gray-200">Student Name</th>
          <th className="py-2 px-4 text-left text-gray-200">Student Grade</th>
          <th className="py-2 px-4 text-left text-gray-200">Student Fee</th>
          <th className="py-2 px-4 text-left text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {fees.map((fee) => (
          <tr key={fee.studentId}>
            <td className="py-2 px-4 text-gray-300">{fee.studentId}</td>
            <td className="py-2 px-4 text-gray-300">{fee.studentName}</td>
            <td className="py-2 px-4 text-gray-300">{fee.studentGrade}</td>
            <td className="py-2 px-4 text-gray-300">Rs: {fee.totalFees}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => onAddFee(fee)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Add Fee
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// StudentFeeTracker Component
const StudentFeeTracker = () => {
  const [fees, setFees] = useState([]);
  const [filteredFees, setFilteredFees] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const response = await axios.get("/api/v1/admin/get-student-fee");
        setFees(response.data.data);
        setFilteredFees(response.data.data);
        setGrades([...new Set(response.data.data.map(fee => fee.studentGrade))]); // Extract unique grades
        setLoading(false);
      } catch (error) {
        setError('Failed to load transactions');
        setLoading(false);
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchAllTransactions();
  }, []);

  const addFeeRecord = async (feeData) => {
    try {
      const response = await axios.post('/api/v1/admin/create-student-fee', feeData);
      const newTransaction = response.data.data;
      const newTransactions = [...fees, newTransaction];
      setFees(newTransactions);
      setFilteredFees(newTransactions);
      console.log(feeData);
    } catch (error) {
      setError('Failed to add transaction');
      console.error(error.response?.data?.message || error.message);
    }
  };

  const filterFees = (status, grade, rollNumber) => {
    let filtered = fees;

    // Filter by status
    if (status) {
      if (status === 'Fully Paid') {
        filtered = filtered.filter(fee => fee.remainingAmount === 0);
      } else if (status === 'Remaining') {
        filtered = filtered.filter(fee => fee.remainingAmount > 0);
      }
    }

    // Filter by grade
    if (grade) {
      filtered = filtered.filter(fee => fee.studentGrade === grade);
    }

    // Filter by roll number
    if (rollNumber) {
      filtered = filtered.filter(fee => fee.rollNumber.toString().includes(rollNumber));
    }

    setFilteredFees(filtered);
  };

  const downloadCSV = () => {
    const csvContent = [
      ['Student ID', 'Student Name', 'Student Grade', 'Student Fee'],
      ...filteredFees.map(fee => [
        fee.studentId,
        fee.studentName,
        fee.studentGrade,
        `Rs:${fee.totalFees}`
      ])
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_fee_data.csv');
    link.click();
  };

  const openModal = (fee) => {
    setSelectedFee(fee);
    setModalOpen(true);
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Student Fee Tracker</h1>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Add Fee Record
          </button>
          <button
            onClick={downloadCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Download CSV
          </button>
        </div>
      </div>
      <StatusFilter onFilter={filterFees} grades={grades} />
      <FeeTable fees={filteredFees} onAddFee={openModal} />
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addFeeRecord}
        selectedFee={selectedFee} // Pass the selected fee to the modal
      />
    </div>
  );
};

export default StudentFeeTracker;
