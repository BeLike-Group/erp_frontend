import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
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
    submissionDate: "",
  });
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchAllGrades = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-grades");
        setGrades(response.data.grades);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    fetchAllGrades();

    const fetchAllCourses = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    fetchAllCourses();

    const fetchAllStudents = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        setStudents(response.data.students);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    fetchAllStudents();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // const handleSelectChange = (e) => {
  //   const { value, name } = e.target;
  //   const selectedOption = JSON.parse(value);

  //   if (name === "grades") {
  //     setSelectedGrades((prev) =>
  //       !prev.includes(selectedOption.gradeId)
  //         ? [...prev, selectedOption.gradeId]
  //         : prev
  //     );
  //   } else if (name === "courses") {
  //     setSelectedCourses((prev) =>
  //       !prev.includes(selectedOption.courseId)
  //         ? [...prev, selectedOption.courseId]
  //         : prev
  //     );
  //   }
  // };
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

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataObj.append(key, formData[key])
    );
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
      setIsModalOpen(false);
      // Refresh students list after adding/updating
      const studentsRes = await axios.get("/api/v1/admin/load-all-students");
      setStudents(studentsRes.data.students);
      setEditingStudent(null); // Reset editing state
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
      submissionDate: student?.submissionDate || "",
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
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="studentName"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentEmail"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentPassword"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="studentPassword"
              name="studentPassword"
              value={formData.studentPassword}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mt-1 text-sm text-blue-600"
            >
              {showPassword ? "Hide" : "Show"} Password
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentId"
              className="text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentIdCardNumber"
              className="text-sm font-medium text-gray-700"
            >
              Student ID Card Number
            </label>
            <input
              type="text"
              id="studentIdCardNumber"
              name="studentIdCardNumber"
              value={formData.studentIdCardNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentAvatar"
              className="text-sm font-medium text-gray-700"
            >
              Avatar (optional)
            </label>
            <input
              type="file"
              id="studentAvatar"
              name="studentAvatar"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentIdCardCopy"
              className="text-sm font-medium text-gray-700"
            >
              ID Card Copy (optional)
            </label>
            <input
              type="file"
              id="studentIdCardCopy"
              name="studentIdCardCopy"
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="studentFee"
              className="text-sm font-medium text-gray-700"
            >
              Fee Amount
            </label>
            <input
              type="number"
              id="studentFee"
              name="studentFee"
              value={formData.studentFee}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="amountPaid"
              className="text-sm font-medium text-gray-700"
            >
              Amount Paid
            </label>
            <input
              type="number"
              id="amountPaid"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="submissionDate"
              className="text-sm font-medium text-gray-700"
            >
              Submission Date
            </label>
            <input
              type="date"
              id="submissionDate"
              name="submissionDate"
              value={formData.submissionDate}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="grades"
              className="text-sm font-medium text-gray-700"
            >
              Select Grades
            </label>
            <select
              id="grades"
              name="grades"
              onChange={handleSelectChange}
              className="mt-1 p-2 border border-gray-300 rounded"
              multiple
            >
              {grades.map((grade) => (
                <option key={grade.gradeId} value={JSON.stringify(grade)}>
                  {grade.gradeCategory}
                </option>
              ))}
            </select>
            <div className="mt-2 flex flex-wrap">
              {selectedGrades.map((gradeId) => {
                const grade = grades.find((g) => g.gradeId === gradeId);
                return (
                  <span
                    key={gradeId}
                    className="inline-block bg-white text-black rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {grade.gradeCategory}
                    <button
                      type="button"
                      onClick={() => removeSelection(gradeId, "grades")}
                      className="ml-2 text-red-500"
                    >
                      Remove
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

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
                // Find the selected course
                const course = courses.find((c) => c._id === courseId);

                // If the course is not found, return a fallback message
                if (!course) {
                  return (
                    <span
                      key={courseId}
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      Course not found{" "}
                      <button
                        type="button"
                        onClick={() => removeSelection(courseId, "courses")}
                        className="text-red-500 ml-2"
                      >
                        x
                      </button>
                    </span>
                  );
                }

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

          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-600 px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Student"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
