import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import PrintSlip from "./PrintSlip"; // Import the PrintSlip component

Modal.setAppElement("#root"); // Ensure the modal is attached to the root for accessibility

const StudentFeeTracker = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newFeeModalOpen, setNewFeeModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [totalFee, setTotalFee] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [feeRecords, setFeeRecords] = useState([]); // Store fee records
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [showPrintSlip, setShowPrintSlip] = useState(false);
  const [printSlipData, setPrintSlipData] = useState(null);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        setStudents(response?.data?.students || []);
        setGrades([
          ...new Set(
            response?.data?.students.map(
              (fee) => fee.studentGrade.gradeCategory
            )
          ),
        ]);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        handleShowFailureToast(
          error.response?.data?.message || "Failed to load students"
        );
      }
    };

    const fetchFeeRecords = async () => {
      try {
        const response = await axios.get("/api/v1/admin/get-student-fee");
        setFeeRecords(response.data.data || []);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        handleShowFailureToast(
          error.response?.data?.message || "Failed to load fee records"
        );
      }
    };

    fetchAllStudents();
    fetchFeeRecords();
  }, []);

  useEffect(() => {
    const filterStudents = () => {
      let filtered = students;

      if (selectedStatus) {
        filtered = filtered.filter(
          (student) =>
            (selectedStatus === "Fully Paid" &&
              student.remainingAmount === 0) ||
            (selectedStatus === "Remaining" && student.remainingAmount > 0)
        );
      }
      if (selectedGrade) {
        filtered = filtered.filter(
          (student) => student.studentGrade.gradeCategory === selectedGrade
        );
      }
      if (rollNumber) {
        filtered = filtered.filter((student) =>
          student.studentId.toString().includes(rollNumber)
        );
      }

      setFilteredStudents(filtered);
    };

    filterStudents();
  }, [students, selectedStatus, selectedGrade, rollNumber]);

  const handleAddFeeClick = (student) => {
    setSelectedStudent(student);
    setTotalFee(student.studentFee);
    setAmountReceived(student.amountReceived || 0);
    setRemainingAmount(student.remainingAmount);
    setSubmissionDate(
      student.submissionDate
        ? new Date(student.submissionDate).toISOString().substr(0, 10)
        : ""
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewFeeModalOpen(false);
    setTotalFee("");
    setAmountReceived("");
    setRemainingAmount("");
    setSubmissionDate("");
  };

  const handleAmountReceivedChange = (e) => {
    const received = parseFloat(e.target.value) || 0;
    setAmountReceived(received);
    const calculatedRemaining = parseFloat(totalFee) - received;
    setRemainingAmount(calculatedRemaining >= 0 ? calculatedRemaining : 0);
  };

  const handleTotalFeeChange = (e) => {
    const fee = parseFloat(e.target.value) || 0;
    setTotalFee(fee);
    const calculatedRemaining = fee - parseFloat(amountReceived);
    setRemainingAmount(calculatedRemaining >= 0 ? calculatedRemaining : 0);
  };

  const handleSubmitFee = async () => {
    try {
      if (!submissionDate) {
        handleShowFailureToast("Please select a submission date.");
        return;
      }

      if (amountReceived > totalFee) {
        handleShowFailureToast("Amount received cannot exceed the total fee.");
        return;
      }

      const feeData = {
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade.gradeCategory,
        totalFees: totalFee,
        amountPaid: amountReceived,
        remainingAmount: remainingAmount,
        date: submissionDate,
      };

      let response;

      if (selectedStudent.feeRecordId) {
        // Update existing fee record
        response = await axios.put(
          `/api/v1/admin/update-student-fee/${selectedStudent.feeRecordId}`,
          feeData
        );
      } else {
        // Create a new fee record
        response = await axios.post(
          "/api/v1/admin/create-student-fee",
          feeData
        );
      }

      handleShowSuccessToast(
        response.data.message || "Fee submitted successfully."
      );

      setPrintSlipData({
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade.gradeCategory,
        totalFee: totalFee,
        amountReceived: amountReceived,
        remainingAmount: remainingAmount,
        submissionDate: submissionDate,
      });

      setShowPrintSlip(true);
      handleCloseModal();

      // Update local state
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === selectedStudent.studentId
            ? {
                ...student,
                studentFee: totalFee,
                amountReceived: amountReceived,
                remainingAmount: remainingAmount,
                submissionDate: submissionDate,
              }
            : student
        )
      );
    } catch (error) {
      handleShowFailureToast(
        error.response?.data?.message || "Failed to submit fee"
      );
      console.error(error.response?.data?.message || error.message);
    }
  };

  const handlePrintComplete = () => {
    setShowPrintSlip(false);
    setSelectedStudent(null);
    setPrintSlipData(null);
  };

  const handleNewFeeSubmit = async () => {
    try {
      if (!submissionDate) {
        handleShowFailureToast("Please select a submission date.");
        return;
      }

      const feeData = {
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade.gradeCategory,
        totalFees: totalFee,
        amountPaid: amountReceived,
        remainingAmount: remainingAmount,
        date: submissionDate,
      };

      const response = await axios.post(
        "/api/v1/admin/create-student-fee",
        feeData
      );

      handleShowSuccessToast(
        response.data.message || "New fee record created successfully."
      );

      handleCloseModal();
      // fetchFeeRecords(); // Refresh fee records
    } catch (error) {
      handleShowFailureToast(
        error.response?.data?.message || "Failed to create fee record"
      );
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <Toaster />

      {!showPrintSlip ? (
        <>
          <h1 className="text-3xl font-bold text-white mb-4">
            Student Fee Tracker
          </h1>

          <button
            onClick={() => setNewFeeModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            New Fee
          </button>

          <div className="mb-4 text-black flex flex-wrap items-center">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="mr-2 p-2 rounded"
              aria-label="Filter by Status"
            >
              <option value="">All Status</option>
              <option value="Fully Paid">Fully Paid</option>
              <option value="Remaining">Remaining</option>
            </select>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="mr-2 p-2 rounded"
              aria-label="Filter by Grade"
            >
              <option value="">All Grades</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="p-2 rounded"
              aria-label="Search by Roll Number"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-white shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Student ID</th>
                  <th className="py-2 px-4 text-left">Student Name</th>
                  <th className="py-2 px-4 text-left">Grade</th>
                  <th className="py-2 px-4 text-left">Total Fee (Rs:)</th>
                  <th className="py-2 px-4 text-left">
                    Remaining Amount (Rs:)
                  </th>
                  <th className="py-2 px-4 text-left">Submission Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((fee) => (
                    <tr
                      key={fee?.studentId}
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="py-2 px-4">{fee?.studentId}</td>
                      <td className="py-2 px-4">{fee?.studentName}</td>
                      <td className="py-2 px-4">
                        {fee?.studentGrade.gradeCategory}
                      </td>
                      <td className="py-2 px-4">Rs: {fee?.studentFee}</td>
                      <td
                        className={`py-2 px-4 ${
                          fee?.remainingAmount === 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        Rs: {fee?.remainingAmount}
                      </td>
                      <td className="py-2 px-4">
                        {fee?.submissionDate
                          ? new Date(fee?.submissionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {fee?.remainingAmount === 0
                          ? "Fully Paid"
                          : "Remaining"}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleAddFeeClick(fee)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit Fee
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-4 px-4 text-center text-gray-400"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Edit Fee Modal */}
          <Modal
            isOpen={modalOpen}
            onRequestClose={handleCloseModal}
            className="bg-white p-6 rounded-lg max-w-lg w-full text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <h2 className="text-xl font-bold mb-4">Edit Fee</h2>
            <form>
              {/* Total Fee */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Total Fee:</label>
                <input
                  type="number"
                  value={totalFee}
                  onChange={handleTotalFeeChange}
                  className="w-full p-2 border rounded-lg"
                  min={amountReceived}
                  aria-label="Total Fee"
                />
              </div>

              {/* Amount Received */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Amount Received:
                </label>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={handleAmountReceivedChange}
                  className="w-full p-2 border rounded-lg"
                  min="0"
                  max={totalFee}
                  aria-label="Amount Received"
                />
              </div>

              {/* Remaining Amount */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Remaining Amount:
                </label>
                <input
                  type="text"
                  value={`Rs: ${remainingAmount}`}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-200"
                  aria-label="Remaining Amount"
                />
              </div>

              {/* Submission Date */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Submission Date:
                </label>
                <input
                  type="date"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  aria-label="Submission Date"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
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

          {/* New Fee Modal */}
          <Modal
            isOpen={newFeeModalOpen}
            onRequestClose={handleCloseModal}
            className="bg-white p-6 rounded-lg max-w-lg w-full text-black"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <h2 className="text-xl font-bold mb-4">New Fee Record</h2>
            <form>
              {/* Total Fee */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Total Fee:</label>
                <input
                  type="number"
                  value={totalFee}
                  onChange={handleTotalFeeChange}
                  className="w-full p-2 border rounded-lg"
                  min={amountReceived}
                  aria-label="Total Fee"
                />
              </div>

              {/* Amount Received */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Amount Received:
                </label>
                <input
                  type="number"
                  value={amountReceived}
                  onChange={handleAmountReceivedChange}
                  className="w-full p-2 border rounded-lg"
                  min="0"
                  max={totalFee}
                  aria-label="Amount Received"
                />
              </div>

              {/* Remaining Amount */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Remaining Amount:
                </label>
                <input
                  type="text"
                  value={`Rs: ${remainingAmount}`}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-200"
                  aria-label="Remaining Amount"
                />
              </div>

              {/* Submission Date */}
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">
                  Submission Date:
                </label>
                <input
                  type="date"
                  value={submissionDate}
                  onChange={(e) => setSubmissionDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  aria-label="Submission Date"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleNewFeeSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </Modal>

          {/* Fee Records Table */}
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Fee Records
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 text-white shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Student Name</th>
                  <th className="py-2 px-4 text-left">Roll Number</th>
                  <th className="py-2 px-4 text-left">Grade</th>
                  <th className="py-2 px-4 text-left">Total Fee (Rs:)</th>
                  <th className="py-2 px-4 text-left">Amount Paid (Rs:)</th>
                  <th className="py-2 px-4 text-left">
                    Remaining Amount (Rs:)
                  </th>
                  <th className="py-2 px-4 text-left">Submission Date</th>
                </tr>
              </thead>
              <tbody>
                {feeRecords.length > 0 ? (
                  feeRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="py-2 px-4">{record.studentName}</td>
                      <td className="py-2 px-4">{record.rollNumber}</td>
                      <td className="py-2 px-4">{record.grade}</td>
                      <td className="py-2 px-4">Rs: {record.totalFee}</td>
                      <td className="py-2 px-4">Rs: {record.amountPaid}</td>
                      <td className="py-2 px-4">
                        Rs: {record.remainingAmount}
                      </td>
                      <td className="py-2 px-4">
                        {record.submissionDate
                          ? new Date(record.submissionDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 px-4 text-center text-gray-400"
                    >
                      No fee records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        printSlipData && (
          <PrintSlip
            selectedStudent={selectedStudent}
            onPrintComplete={handlePrintComplete}
            feeData={printSlipData}
          />
        )
      )}
    </div>
  );
};

export default StudentFeeTracker;
