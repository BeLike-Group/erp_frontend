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

Modal.setAppElement("#root");

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
    amountPaid: "",
    submissionDate: "", // Include submission date here
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

  const handleShow = () => setShow(!show);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gradesRes = await axios.get("/api/v1/admin/load-all-grades");
        setGrades(gradesRes.data.grades);

        const coursesRes = await axios.get("/api/v1/admin/load-all-courses");
        setCourses(coursesRes.data.courses);

        const studentsRes = await axios.get("/api/v1/admin/load-all-students");
        setStudents(studentsRes.data.students);
      } catch (error) {
        handleShowFailureToast(error.response?.data?.message || error.message);
      }
    };
    fetchData();
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
      setSelectedGrades((prev) => {
        const newGrades = [...prev];
        if (!newGrades.includes(selectedOption.gradeId)) {
          newGrades.push(selectedOption.gradeId);
        }
        return newGrades;
      });
    } else if (name === "courses") {
      setSelectedCourses((prev) => {
        const newCourses = [...prev];
        if (!newCourses.includes(selectedOption.courseId)) {
          newCourses.push(selectedOption.courseId);
        }
        return newCourses;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any form field is empty or if grades/courses are not selected
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

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    selectedGrades.forEach((grade) =>
      formDataObj.append("studentGrades[]", grade)
    );
    selectedCourses.forEach((course) =>
      formDataObj.append("studentCourses[]", course)
    );

    try {
      setLoading(true);
      const url = editingStudent
        ? `/api/v1/admin/update-student/${editingStudent._id}`
        : `/api/v1/admin/add-student`;
      const method = editingStudent ? "patch" : "post";

      const response = await axios[method](url, formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleShowSuccessToast(response.data.message);
      setIsModalOpen(false); // Close modal after submission
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
      amountPaid: "",
      submissionDate: student?.submissionDate || "", // Set date if editing
    });
    setSelectedGrades(student?.studentGrades?.map((g) => g.gradeId) || []);
    setSelectedCourses(student?.studentCourses?.map((c) => c.courseId) || []);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`/api/v1/admin/delete-student/${id}`);
        handleShowSuccessToast("Student deleted successfully!");
        const studentsRes = await axios.get("/api/v1/admin/load-all-students");
        setStudents(studentsRes.data.students);
      } catch (error) {
        handleShowFailureToast(error.response?.data?.message || error.message);
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      borderRadius: "0.5rem",
      width: "90%",
      maxWidth: "800px",
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
        className="flex mx-auto justify-center items-center text-white bg-[#40b08c] border-0 py-2 px-6 focus:outline-none hover:bg-[#75dbbb] rounded text-lg"
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
        contentLabel="Add/Update Student"
      >
        <h2 className="text-xl font-semibold">
          {editingStudent ? "Edit Student" : "Add New Student"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 mt-4 text-black h-full"
          encType="multipart/form-data"
        >
          <div className="space-y-4">
            {/* Form Fields */}
            <label className="text-lg">Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <label className="text-lg">Email</label>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <label className="text-lg">Password</label>
            <div className="relative">
              <input
                type={show ? "password" : "text"}
                name="studentPassword"
                value={formData.studentPassword}
                onChange={handleInputChange}
                required
                className="w-full p-3 border rounded-lg"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={handleShow}
              >
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* New Date Field */}
            <label className="text-lg">Submission Date</label>
            <input
              type="date"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            {/* Remaining Fields */}
            <label className="text-lg">Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <label className="text-lg">ID Card Number</label>
            <input
              type="text"
              name="studentIdCardNumber"
              value={formData.studentIdCardNumber}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg"
            />

            <label className="text-lg">Avatar</label>
            <input
              type="file"
              name="studentAvatar"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-3 border rounded-lg"
            />

            <label className="text-lg">ID Card Copy</label>
            <input
              type="file"
              name="studentIdCardCopy"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-lg"
            />

            {/* Select Grades and Courses */}
            <div className="space-y-4">
              <label className="text-lg">Select Grades</label>
              <select
                name="grades"
                className="w-full p-3 border rounded-lg"
                onChange={handleSelectChange}
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option
                    key={grade.gradeId}
                    value={JSON.stringify({ gradeId: grade.gradeId })}
                  >
                    {grade.gradeCategory}
                  </option>
                ))}
              </select>

              <label className="text-lg">Select Courses</label>
              <select
                name="courses"
                className="w-full p-3 border rounded-lg"
                onChange={handleSelectChange}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option
                    key={course.courseId}
                    value={JSON.stringify({ courseId: course.courseId })}
                  >
                    {course.courseTitle}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg"
            >
              {loading ? (
                <ThreeDotLoader />
              ) : (
                `${editingStudent ? "Update" : "Add"} Student`
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
