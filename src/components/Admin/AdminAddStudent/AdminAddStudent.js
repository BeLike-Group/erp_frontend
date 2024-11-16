import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import ThreeDotLoader from "../../Loaders/ThreeDotLoader";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure accessibility

export const AdminAddStudent = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentPassword: "",
    studentId: "",
    studentIdCardNumber: "",
    studentAvatar: null,
    studentIdCardCopy: null,
    studentFee: "",
    amountPaid: "", // New field
    submissionDate: "", // New field
  });

  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const fetchAllGrades = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-grades");
        setGrades(response.data.grades);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllGrades();

    const fetchAllCourses = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllCourses();

    const fetchAllStudents = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        setStudents(response.data.students);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchAllStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSelectChange = (e) => {
    const { value, name } = e.target;
    const selectedOption = JSON.parse(value);

    if (name === "grades") {
      setSelectedGrades((prev) => [
        ...new Set([...prev, selectedOption.gradeId]),
      ]);
    } else if (name === "courses") {
      setSelectedCourses((prev) => [
        ...new Set([...prev, selectedOption.courseId]),
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(formData).some((val) => !val) ||
      selectedGrades.length === 0 ||
      selectedCourses.length === 0
    ) {
      handleShowFailureToast(
        "Please fill all fields and select at least one grade and course!"
      );
      return;
    }

    const {
      studentAvatar,
      studentIdCardCopy,
      studentName,
      studentEmail,
      studentPassword,
      studentId,
      studentIdCardNumber,
      studentFee,
      amountPaid, // Include amountPaid
      submissionDate, // Include submissionDate
    } = formData;

    const data = {
      studentName,
      studentEmail,
      studentPassword,
      studentId,
      studentIdCardNumber,
      studentAvatar,
      studentIdCardCopy,
      studentGrades: selectedGrades.map((grade) => ({ gradeId: grade })),
      studentCourses: selectedCourses.map((course) => ({ courseId: course })),
      studentFee,
      amountPaid, // Include amountPaid
      submissionDate, // Include submissionDate
    };

    try {
      setLoading(true);
      const url = editingStudent
        ? `/api/v1/admin/update-student/${editingStudent._id}`
        : `/api/v1/admin/add-student/${selectedGrades}`;
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleShowSuccessToast(response.data.message);
      setFormData({
        studentName: "",
        studentEmail: "",
        studentPassword: "",
        studentId: "",
        studentIdCardNumber: "",
        studentAvatar: null,
        studentIdCardCopy: null,
        studentFee: "",
        amountPaid: "", // Reset field
        submissionDate: "", // Reset field
      });
      setSelectedGrades([]);
      setSelectedCourses([]);
      setIsModalOpen(false);
      setEditingStudent(null);

      // Fetch updated students
      const studentsResponse = await axios.get(
        "/api/v1/admin/load-all-students"
      );
      setStudents(studentsResponse.data.students);
    } catch (error) {
      handleShowFailureToast(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeSelection = (id, type) => {
    if (type === "grades") {
      setSelectedGrades((prev) => prev.filter((item) => item !== id));
    } else if (type === "courses") {
      setSelectedCourses((prev) => prev.filter((item) => item !== id));
    }
  };

  const openModal = (student = null) => {
    setEditingStudent(student);
    setFormData({
      studentName: student?.studentName || "",
      studentEmail: student?.studentEmail || "",
      studentPassword: student?.studentPassword || "",
      studentId: student?.studentId || "",
      studentIdCardNumber: student?.studentIdCardNumber || "",
      studentAvatar: null,
      studentIdCardCopy: null,
      studentFee: "",
      amountPaid: "", // Reset field for editing
      submissionDate: "", // Reset field for editing
    });
    setSelectedGrades(student?.studentGrades.map((g) => g.gradeId) || []);
    setSelectedCourses(student?.studentCourses.map((c) => c.courseId) || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/admin/delete-student/${id}`);
      handleShowSuccessToast("Student deleted successfully!");
      // Fetch updated students
      const studentsResponse = await axios.get(
        "/api/v1/admin/load-all-students"
      );
      setStudents(studentsResponse.data.students);
    } catch (error) {
      handleShowFailureToast(error.response?.data?.message || error.message);
    }
  };

  // Custom modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      borderRadius: "0.5rem",
      width: "90%",
      maxWidth: "800px",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div className="h-auto md:px-8 mt-4">
      <Toaster />
      <button
        onClick={() => openModal()}
        className="flex mx-auto justify-center items-center text-white bg-[#40b08c] border-0 py-1 px-4 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
      >
        Add New Student
      </button>

      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-black text-white">Name</th>
            <th className="px-6 py-3 bg-black text-white">Email</th>
            <th className="px-6 py-3 bg-black text-white">ID</th>
            <th className="px-6 py-3 bg-black text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {student.studentName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {student.studentEmail}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {student.studentId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 flex space-x-2">
                <button
                  onClick={() => openModal(student)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700"
            >
              Student Name
            </label>
            <input
              type="text"
              name="studentName"
              id="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Student Email
            </label>
            <input
              type="email"
              name="studentEmail"
              id="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={show ? "password" : "text"}
                name="studentPassword"
                id="studentPassword"
                value={formData.studentPassword}
                onChange={handleInputChange}
                className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleShow}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              name="studentId"
              id="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentIdCardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              ID Card Number
            </label>
            <input
              type="text"
              name="studentIdCardNumber"
              id="studentIdCardNumber"
              value={formData.studentIdCardNumber}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentAvatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <input
              type="file"
              name="studentAvatar"
              id="studentAvatar"
              onChange={handleFileChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentIdCardCopy"
              className="block text-sm font-medium text-gray-700"
            >
              ID Card Copy
            </label>
            <input
              type="file"
              name="studentIdCardCopy"
              id="studentIdCardCopy"
              onChange={handleFileChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentFee"
              className="block text-sm font-medium text-gray-700"
            >
              Fee
            </label>
            <input
              type="text"
              name="studentFee"
              id="studentFee"
              value={formData.studentFee}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="amountPaid"
              className="block text-sm font-medium text-gray-700"
            >
              Amount Paid
            </label>
            <input
              type="number"
              name="amountPaid"
              id="amountPaid"
              value={formData.amountPaid}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="submissionDate"
              className="block text-sm font-medium text-gray-700"
            >
              Submission Date
            </label>
            <input
              type="date"
              name="submissionDate"
              id="submissionDate"
              value={formData.submissionDate}
              onChange={handleInputChange}
              className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {/* grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grades
            </label>
            <select
              name="grades"
              onChange={handleSelectChange}
              className="text-black p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select grades
              </option>
              {grades.map((grade) => (
                <option
                  key={grade._id}
                  className=""
                  value={JSON.stringify({
                    gradeId: grade._id,
                    gradeCategory: grade.gradeCategory,
                  })}
                >
                  {grade.gradeCategory}
                </option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap">
              {selectedGrades.map((gradeId) => {
                const grade = grades.find((g) => g._id === gradeId);
                return (
                  <span
                    key={gradeId}
                    className="inline-block bg-white text-black rounded-full px-3 py-1 text-sm font-semibold  mr-2 mb-2"
                  >
                    {grade.gradeCategory}{" "}
                    <button
                      type="button"
                      onClick={() => removeSelection(gradeId, "grades")}
                      className="text-red-500 ml-2"
                    >
                      x
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
          {/* course */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Courses
            </label>
            <select
              name="courses"
              onChange={handleSelectChange}
              className="text-black p-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select courses
              </option>
              {courses.map((course) => (
                <option
                  key={course._id}
                  value={JSON.stringify({
                    courseId: course._id,
                    courseTitle: course.courseTitle,
                  })}
                >
                  {course.courseTitle}
                </option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap">
              {selectedCourses.map((courseId) => {
                const course = courses.find((c) => c._id === courseId);
                return (
                  <span
                    key={courseId}
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    {course.courseTitle}{" "}
                    <button
                      type="button"
                      onClick={() => removeSelection(courseId, "courses")}
                      className="text-red-500 ml-2"
                    >
                      x
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editingStudent ? "Update Student" : "Add Student"}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
