import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from "react-modal";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";

Modal.setAppElement('#root'); // Ensure the modal is attached to the root for accessibility

const StudentFeeTracker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for modal
  const [totalFee, setTotalFee] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        setStudents(response?.data?.students);
        setGrades([...new Set(response?.data?.students.map(fee => fee.studentGrade.gradeCategory))]);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };

    fetchAllTransactions();
  }, []);
  // Update filtered students based on selected filters
  useEffect(() => {
    const filterStudents = () => {
      let filtered = students;

      if (selectedStatus) {
        filtered = filtered.filter(student => student.status === selectedStatus);
      }
      if (selectedGrade) {
        filtered = filtered.filter(student => student.studentGrade.gradeCategory === selectedGrade);
      }
      if (rollNumber) {
        filtered = filtered.filter(student => student.studentId.toString().includes(rollNumber));
      }

      setFilteredStudents(filtered);
    };

    filterStudents();
  }, [students, selectedStatus, selectedGrade, rollNumber]);

  const handleAddFeeClick = (student) => {
    setSelectedStudent(student);
    setTotalFee(student.studentFee); // Set total fee based on selected student
    setAmountReceived('');
    setRemainingAmount('');
    setSubmissionDate('');
    setModalOpen(true); // Open the modal
  };

  const handleAmountReceivedChange = (e) => {
    const received = parseFloat(e.target.value);
    setAmountReceived(received);
    setRemainingAmount(totalFee - received); // Calculate remaining amount
  };

  const handleSubmitFee = async () => {
    try {
      const adminId = "someAdminId"; // Set your admin ID or fetch from user state
      const feeData = {
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade,
        totalFees: totalFee,
        amountPaid: amountReceived,
        remainingAmount: remainingAmount,
        date: submissionDate,
        adminId: adminId
      };

      const response = await axios.post("/api/v1/admin/create-student-fee", feeData);

      console.log(response.data);
      handleShowSuccessToast(response.data.message)
      setModalOpen(false); // Close modal after successful submission
    } catch (error) {
      handleShowFailureToast(error.message)
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-white mb-4">Student Fee Tracker</h1>

      <div className="mb-4 text-black">
        {/* Filters */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="mr-2 p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Fully Paid">Fully Paid</option>
          <option value="Remaining">Remaining</option>
        </select>

        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
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
          onChange={(e) => setRollNumber(e.target.value)}
          className="p-2 rounded"
        />
      </div>

      {/* Students Table */}
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left">Student ID</th>
            <th className="py-2 px-4 text-left">Student Name</th>
            <th className="py-2 px-4 text-left">Grade</th>
            <th className="py-2 px-4 text-left">Fee</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents?.map((fee) => (
            <tr key={fee?.studentId}>
              <td className="py-2 px-4">{fee?.studentId}</td>
              <td className="py-2 px-4">{fee?.studentName}</td>
              <td className="py-2 px-4">{fee?.studentGrade.gradeCategory}</td>
              <td className="py-2 px-4">Rs: {fee?.studentFee}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleAddFeeClick(fee)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Add Fee
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white p-6 rounded-lg max-w-lg w-full text-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Add Fee</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Total Fee:</label>
            <input
              type="text"
              value={totalFee}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Amount Received:</label>
            <input
              type="number"
              value={amountReceived}
              onChange={handleAmountReceivedChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Remaining Amount:</label>
            <input
              type="text"
              value={remainingAmount}
              disabled
              className="w-full p-2 border rounded-lg bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Submission Date:</label>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitFee}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentFeeTracker;
