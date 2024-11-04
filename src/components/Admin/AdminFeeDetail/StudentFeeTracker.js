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
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for modal
  const [totalFee, setTotalFee] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [showPrintSlip, setShowPrintSlip] = useState(false); // State to control PrintSlip display
  const [printSlipData, setPrintSlipData] = useState(null); // Separate state for PrintSlip data
  // const [studentsemail, setStudentEmail] = useState([]);
  // Fetch students data from the backend
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        const studentsData = response?.data?.students || [];

        // const emails = response?.data?.students.map(
        //   (student) => student.studentEmail
        // );
        // console.log(emails);
        // setStudentEmail(emails);
        // console.log(studentsemail);

        console.log(studentsData);
        // Calculate remaining amount based on total fee and amount paid
        const studentsWithRemaining = studentsData.map((student) => {
          const totalFee = student.studentFee;
          const amountPaid = student.amountPaid || 0;
          const remaining = totalFee - amountPaid; // Calculate remaining amount

          return {
            ...student,
            remainingAmount: remaining < 0 ? 0 : remaining, // Ensure remaining amount doesn't go below zero
          };
        });

        setStudents(studentsWithRemaining);
        setFilteredStudents(studentsWithRemaining); // Initialize filtered students
        setGrades([
          ...new Set(
            studentsWithRemaining.map((fee) => fee.studentGrade.gradeCategory)
          ),
        ]);
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
        handleShowFailureToast(
          error.response?.data?.message || "Failed to load students"
        );
      }
    };

    fetchAllTransactions();
  }, []);

  // Filter students based on selected criteria
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

  // Handle clicking the "Edit Fee" button
  const handleAddFeeClick = (student) => {
    setSelectedStudent(student);
    setTotalFee(student.studentFee);
    setAmountReceived(student.amountReceived || 0); // Initialize as 0 if undefined
    setRemainingAmount(student.remainingAmount || student.studentFee); // Use calculated remainingAmount
    setSubmissionDate(
      student.submissionDate
        ? new Date(student.submissionDate).toISOString().substr(0, 10)
        : ""
    );
    setModalOpen(true);
  };

  // Handle closing the modal and resetting form fields (without resetting selectedStudent)
  const handleCloseModal = () => {
    setModalOpen(false);
    setTotalFee("");
    setAmountReceived("");
    setRemainingAmount("");
    setSubmissionDate("");
  };

  // Handle changes in the "Amount Received" input
  const handleAmountReceivedChange = (e) => {
    const received = parseFloat(e.target.value) || 0;
    setAmountReceived(received);
    const calculatedRemaining = parseFloat(totalFee) - received;
    setRemainingAmount(calculatedRemaining >= 0 ? calculatedRemaining : 0);
  };

  // Handle changes in the "Total Fee" input
  const handleTotalFeeChange = (e) => {
    const fee = parseFloat(e.target.value) || 0;
    setTotalFee(fee);
    const calculatedRemaining = fee - parseFloat(amountReceived);
    setRemainingAmount(calculatedRemaining >= 0 ? calculatedRemaining : 0);
  };

  // // Send Reminder
  // const sendReminder = async (student) => {
  //   // fee.studentEmail  studentName
  //   try {
  //     const result = {
  //       studentId: student.studentId,
  //       studentEmail: student.studentEmail,
  //       studentName: student.studentName,
  //       studentFee: student.studentFee,
  //       amountPaid: student.amountPaid,
  //       remainingAmount: student.studentFee - student.amountPaid,
  //       submissionDate: student.submissionDate,
  //     };
  //     const message = `Fee Details:\n
  //     Student ID : ${result.studentId}\n
  //       Student Email: ${result.studentEmail}\n
  //       Student Name: ${result.studentName}\n
  //       Student Fee: ${result.studentFee}\n
  //       Amount Paid : ${result.amountPaid}\n
  //       Remaining Amount : ${result.remainingAmount}\n
  //       Submission Date : ${result.submissionDate}\n
  //       Kindly Submit your Fee on Time`;

  //     await axios.post("/api/v1/reminder/send-reminder", {
  //       recipientType: "Email",
  //       recipients: [result.studentEmail],
  //       message: message,
  //     });
  //     handleShowSuccessToast("Reminder sent successfully.");
  //   } catch (error) {
  //     handleShowFailureToast(
  //       error.response?.data?.message || "Failed to send reminder"
  //     );
  //   }
  // };

  // Handle submitting the fee
  const handleSubmitFee = async () => {
    try {
      // Validations
      if (!submissionDate) {
        handleShowFailureToast("Please select a submission date.");
        return;
      }

      if (amountReceived > totalFee) {
        handleShowFailureToast("Amount received cannot exceed the total fee.");
        return;
      }

      // Prepare fee data for the frontend calculations
      const adminId = "someAdminId"; // Replace with actual admin ID logic
      const feeData = {
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade.gradeCategory, // Assuming you need only the grade category
        totalFees: totalFee,
        amountPaid: amountReceived,
        remainingAmount: remainingAmount, // This will stay only on the frontend
        date: submissionDate,
        adminId: adminId,
      };

      // Submit fee data to backend (local fee creation)
      const response = await axios.post(
        "/api/v1/admin/create-student-fee",
        feeData
      );

      console.log(response.data);
      handleShowSuccessToast(
        response.data.message || "Fee submitted successfully."
      );

      // Prepare data for PrintSlip
      setPrintSlipData({
        studentName: selectedStudent.studentName,
        rollNumber: selectedStudent.studentId,
        grade: selectedStudent.studentGrade.gradeCategory,
        totalFee: totalFee,
        amountReceived: amountReceived,
        remainingAmount: remainingAmount, // Calculated and only used on the frontend
        submissionDate: submissionDate,
      });

      // Show PrintSlip
      setShowPrintSlip(true);

      // Update the student in the local `students` state without re-fetching
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === selectedStudent.studentId
            ? {
                ...student,
                studentFee: totalFee,
                amountReceived: amountReceived,
                remainingAmount: remainingAmount, // Calculated locally, not saved to backend
                submissionDate: submissionDate,
              }
            : student
        )
      );

      // Close the modal without resetting selectedStudent
      handleCloseModal();

      // PATCH request to update the student's fee and amount paid (not remaining amount)
      const updateResponse = await axios.patch(
        `/api/v1/admin/update-student/${selectedStudent._id}`, // Use _id here
        {
          studentFee: totalFee,
          amountPaid: amountReceived,
          submissionDate: submissionDate, // Only updating the fields allowed on the backend
        }
      );

      console.log(updateResponse.data);
      handleShowSuccessToast(
        updateResponse.data.message || "Student record updated successfully."
      );
    } catch (error) {
      handleShowFailureToast(
        error.response?.data?.message || "Failed to submit fee"
      );
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Send Reminder
  const sendReminder = async (student) => {
    try {
      const result = {
        studentId: student.studentId,
        studentEmail: student.studentEmail,
        studentName: student.studentName,
        studentFee: student.studentFee,
        amountPaid: student.amountPaid,
        remainingAmount: student.studentFee - student.amountPaid,
        submissionDate: student.submissionDate,
      };
      const message = `Fee Details:\n
      Student ID : ${result.studentId}\n
        Student Email: ${result.studentEmail}\n
        Student Name: ${result.studentName}\n
        Student Fee: ${result.studentFee}\n
        Amount Paid : ${result.amountPaid}\n
        Remaining Amount : ${result.remainingAmount}\n
        Submission Date : ${result.submissionDate}\n
        Kindly Submit your Fee on Time`;

      await axios.post("/api/v1/reminder/send-reminder", {
        recipientType: "Email",
        recipients: [result.studentEmail],
        message: message,
      });
      handleShowSuccessToast("Reminder sent successfully.");
    } catch (error) {
      handleShowFailureToast(
        error.response?.data?.message || "Failed to send reminder"
      );
    }
  };

  // Handle completing the print slip process
  const handlePrintComplete = () => {
    // Hide PrintSlip and reset printSlipData and selectedStudent
    setShowPrintSlip(false);
    setSelectedStudent(null);
    setPrintSlipData(null);
  };

  return (
    <div className="p-4 bg-gray-800 min-h-screen">
      <Toaster />

      {/* Conditionally render the StudentFeeTracker or the PrintSlip */}
      {!showPrintSlip ? (
        <>
          <h1 className="text-3xl font-bold text-white mb-4">
            Student Fee Tracker
          </h1>

          {/* Filters */}
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

          {/* Students Fee Table */}
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
                  <th className="py-2 px-4 text-left">Email</th>
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
                      <td className="py-2 px-4"> {fee?.studentEmail}</td>
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
                      <td className="py-2 px-4 flex gap-2">
                        <button
                          onClick={() => handleAddFeeClick(fee)}
                          className="bg-blue-500 text-white text-xs px-1 py-1 my-[0.30rem] rounded"
                        >
                          Edit Fee
                        </button>
                        <button
                          onClick={() => {
                            console.log("reminder send...");
                            sendReminder(fee);
                          }}
                          className="bg-blue-500 text-white text-xs px-1 my-[0.30rem] py-1 rounded"
                        >
                          Send Reminder
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

          {/*-------------------------- Edit Fee Modal------------------------------ */}
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
                  min={amountReceived} // Ensure Total Fee cannot be less than Amount Received
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
        </>
      ) : (
        // Only render PrintSlip if printSlipData is available
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
