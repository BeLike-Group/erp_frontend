import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";

const TeacherAddResult = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [grade, setGrade] = useState("");
  const [courseId, setCourseId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch grades and courses
  useEffect(() => {
    const fetchGradesAndCourses = async () => {
      try {
        const [gradesResponse, coursesResponse] = await Promise.all([
          axios.get("/api/v1/admin/load-all-grades"),
          axios.get("/api/v1/admin/load-all-courses"),
        ]);
        setGrades(gradesResponse.data.grades);
        setCourses(coursesResponse.data.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingCourses(false); // End loading courses
      }
    };

    fetchGradesAndCourses();
  }, []);

  // Load students based on grade and course selection
  useEffect(() => {
    const loadStudents = async () => {
      if (grade && courseId) {
        setLoadingStudents(true); // Start loading students
        try {
          const response = await axios.get(
            `/api/v1/teacher/load-students-with-grade/${grade}/${courseId}`
          );
          setStudents(response.data.students);
          setFilteredStudents(response.data.students);
        } catch (error) {
          console.log(error.response.data.message);
        } finally {
          setLoadingStudents(false); // End loading students
        }
      } else {
        setStudents([]);
        setFilteredStudents([]);
      }
    };

    loadStudents();
  }, [grade, courseId]);

  const filterStudents = () => {
    const filtered = students.filter((student) => {
      const matchesGrade = !grade || student.studentGrade._id === grade;
      const matchesCourse =
        !courseId ||
        student.studentCourses.some((c) => c.courseId._id === courseId);
      const matchesStudentId =
        !studentId || student.studentId.toString().includes(studentId);
      return matchesGrade && matchesCourse && matchesStudentId;
    });
    setFilteredStudents(filtered);
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalIsOpen(true);
    if (student.studentCourses && student.studentCourses.length > 0) {
      setCourseId(student.studentCourses[0].courseId._id);
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
    setGrade(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center text-black py-4">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center text-white py-4">
        ADD RESULT
      </h1>

      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:flex-wrap sm:gap-4 mb-4">
        <select
          value={grade}
          onChange={handleGradeChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        >
          <option value="">Select Grade</option>
          {grades.map((grade) => (
            <option key={grade._id} value={grade._id}>
              {grade.gradeCategory}
            </option>
          ))}
        </select>

        <select
          value={courseId}
          onChange={handleCourseChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        >
          <option value="">Select Course</option>

          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />
        <button
          onClick={filterStudents}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>

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

      <div className="w-full lg:w-[90%]">
        {filteredStudents.length > 0 ? (
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
              {filteredStudents.map((student) => (
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 text-black"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Add Test Result</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
