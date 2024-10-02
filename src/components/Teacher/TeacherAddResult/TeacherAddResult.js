import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import loadCurrentTeacherAction from "../../Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";

const TeacherAddResult = () => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [grade, setGrade] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courseId, setCourseId] = useState(null); // State to store courseId
  const [courses, setCourses] = useState([]); // State to store courses for the selected student

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch students based on grade
  useEffect(() => {
    dispatch(loadCurrentTeacherAction());

    const loadSameGradeStudents = async () => {
      if (grade) {
        try {
          const response = await axios.get(
            `/api/v1/teacher/load-students-with-grade/${grade}`
          );
          setStudents(response.data.students);
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        setStudents([]); // Clear students if no grade is selected
      }
    };

    loadSameGradeStudents();
  }, [grade, dispatch]);

  // Filter students based on grade and student ID input
  useEffect(() => {
    if (students.length > 0) {
      const filtered = students.filter((student) => {
        return (
          student.studentId &&
          (!grade || student.studentGrade._id === grade) &&
          (!studentId || student.studentId.toString().includes(studentId))
        );
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]); // Clear filtered students if no data available
    }
  }, [grade, studentId, students]);

  const { currentTeacherData } = useSelector(
    (state) => state.currentTeacherData
  );

  const openModal = async (student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
    setCourseId(null); // Reset courseId when opening the modal

    // Fetch courses for the selected student
    if (student.studentCourses) {
      setCourses(student.studentCourses);
      if (student.studentCourses.length > 0) {
        setCourseId(student.studentCourses[0].courseId._id); // Set the default courseId
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
    setCourseId(null); // Reset courseId when closing the modal
    reset();
    setCourses([]); // Clear courses when closing the modal
  };

  const onSubmit = async (data) => {
    const obtainedMarks = Number(data.obtainedMarks);
    const totalMarks = Number(data.totalMarks);

    if (obtainedMarks > totalMarks) {
      handleShowFailureToast(
        "Obtained marks must be less than or equal to total marks"
      );
      return;
    }

    try {
      const response = await axios.post(
        `/api/v1/teacher/create-result/${courseId}/${selectedStudent._id}/${grade}`,
        {
          resultObtainedNumber: obtainedMarks,
          resultTotalMarks: totalMarks,
          resultStatus: data.result, // true or false
          testName: data.testName,
        }
      );
      handleShowSuccessToast(response.data.message);
      closeModal();
    } catch (error) {
      console.log(error.response.data.message);
      handleShowFailureToast(error.response.data.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center text-black py-4">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center text-white py-4">
        ADD RESULT
      </h1>

      {/* Grade Selector */}
      <div className="flex space-x-4 mb-4">
        <select
          name="grade"
          onChange={(e) => setGrade(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        >
          <option value="">Select Grade</option>
          {currentTeacherData?.teacher?.teacherGrades?.map((grade) => (
            <option key={grade.gradeId._id} value={grade.gradeId._id}>
              {grade.gradeId.gradeCategory}
            </option>
          ))}
        </select>

        {/* Input for Student ID */}
        <input
          type="text"
          placeholder="Search by Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />
      </div>

      {/* Students Table */}
      <div className="w-full lg:w-[90%]">
        {filteredStudents?.length > 0 ? (
          <table className="min-w-full bg-white text-center lg:rounded-md">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Student Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Grade</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents?.map((student) => (
                <tr key={student?._id} className="text-center border-b">
                  <td className="py-2">{student.studentId}</td>
                  <td className="py-2">{student.studentName}</td>
                  <td className="py-2">{student.studentEmail}</td>
                  <td className="py-2">{student.studentGrade.gradeCategory}</td>
                  <td className="py-2">
                    <button
                      onClick={() => openModal(student)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Add Test Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 font-bold">No Students Found</p>
        )}
      </div>

      {/* Modal for Adding Result */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 text-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Add Test Result</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Dropdown for Course Selection */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.courseId._id} value={course.courseId._id}>
                    {course.courseId.courseTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Test Name
              </label>
              <input
                type="text"
                {...register("testName", { required: true })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.testName && <p className="text-red-500 text-xs">Test name is required</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Total Marks
              </label>
              <input
                type="number"
                {...register("totalMarks", { required: true })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.totalMarks && <p className="text-red-500 text-xs">Total Marks are required</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Obtained Marks
              </label>
              <input
                type="number"
                {...register("obtainedMarks", { required: true })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.obtainedMarks && <p className="text-red-500 text-xs">Obtained Marks are required</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Result Status
              </label>
              <select
                {...register("result", { required: true })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Result Status</option>
                <option value={true}>Pass</option>
                <option value={false}>Fail</option>
              </select>
              {errors.result && <p className="text-red-500 text-xs">Result status is required</p>}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAddResult;
