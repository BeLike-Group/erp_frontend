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
  const [inputGrade, setInputGrade] = useState("");
  const [inputCourse, setInputCourse] = useState(""); // State for input course
  const [studentId, setStudentId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(loadCurrentTeacherAction());

    const loadSameGradeAndCourseStudents = async () => {
      if (grade && courseId) {
        try {
          const response = await axios.get(
            `/api/v1/teacher/load-students-with-grade/${grade}/${courseId}`
          );
          setStudents(response.data.students);
        } catch (error) {
          console.log(error.response.data.message);
        }
      } else {
        setStudents([]);
      }
    };

    loadSameGradeAndCourseStudents();
  }, [grade, courseId, dispatch]);

  useEffect(() => {
    if (students.length > 0) {
      const filtered = students.filter((student) => {
        return (
          student.studentId &&
          (!grade || student.studentGrade._id === grade) &&
          (!courseId ||
            student.studentCourses.some((c) => c.courseId._id === courseId)) &&
          (!studentId || student.studentId.toString().includes(studentId))
        );
      });
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [grade, courseId, studentId, students]);

  const { currentTeacherData } = useSelector(
    (state) => state.currentTeacherData
  );

  const openModal = async (student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);

    if (student.studentCourses) {
      setCourses(student.studentCourses);
      if (student.studentCourses.length > 0) {
        setCourseId(student.studentCourses[0].courseId._id);
      }
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudent(null);
    reset();
  };

  const onSubmit = async (data) => {
    const obtainedMarks = Number(data.obtainedMarks);
    const totalMarksValue = Number(data.totalMarks || totalMarks);

    if (obtainedMarks > totalMarksValue) {
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
          resultTotalMarks: totalMarksValue,
          resultStatus: data.result,
          testName: data.testName || testName,
          testType: data.testType || testType,
        }
      );
      handleShowSuccessToast(response.data.message);
      closeModal();
    } catch (error) {
      console.log(error.response.data.message);
      handleShowFailureToast(error.response.data.message);
    }
  };

  const handleGradeChange = (e) => {
    const value = e.target.value;
    setInputGrade(value);
    const selectedGrade = currentTeacherData?.teacher?.teacherGrades.find(
      (g) => g.gradeId.gradeCategory === value
    );
    if (selectedGrade) {
      setGrade(selectedGrade.gradeId._id);
    } else {
      setGrade(null);
    }
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setInputCourse(value);
    // Optionally validate and set course based on available options
    const selectedCourse = currentTeacherData?.teacher?.teacherCourses.find(
      (c) => c.courseId.courseTitle === value
    );
    if (selectedCourse) {
      setCourseId(selectedCourse.courseId._id);
    } else {
      setCourseId(null);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center text-black py-4">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center text-white py-4">
        ADD RESULT
      </h1>

      {/* Grade, Course, and Search Fields */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Enter or Select Grade"
          value={inputGrade}
          onChange={handleGradeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />
        <input
          type="text"
          placeholder="Enter or Select Course"
          value={inputCourse}
          onChange={handleCourseChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />

        <input
          type="text"
          placeholder="Search by Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />

        <input
          type="text"
          placeholder="Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />

        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        >
          <option value="">Select Test Type</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <input
          type="number"
          placeholder="Total Marks"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
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
          <p className="text-center text-red-500 font-bold">
            No Students Found
          </p>
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
            {/* Existing modal form code remains unchanged */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Obtained Marks
              </label>
              <input
                type="number"
                {...register("obtainedMarks", { required: true })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.obtainedMarks && (
                <p className="text-red-500 text-xs">
                  Obtained Marks are required
                </p>
              )}
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
              {errors.result && (
                <p className="text-red-500 text-xs">
                  Result status is required
                </p>
              )}
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
