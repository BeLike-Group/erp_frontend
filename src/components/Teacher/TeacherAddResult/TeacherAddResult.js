import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toaster } from "react-hot-toast";
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
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [testName, setTestName] = useState("");
  const [testType, setTestType] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const { handleSubmit, reset } = useForm();

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
        setLoadingCourses(false);
      }
    };

    fetchGradesAndCourses();
  }, []);

  useEffect(() => {
    const loadStudents = async () => {
      if (grade && courseId) {
        setLoadingStudents(true);
        try {
          const response = await axios.get(
            `/api/v1/teacher/load-students-with-grade/${grade}/${courseId}`
          );
          setStudents(response.data.students);
          setFilteredStudents(response.data.students);
        } catch (error) {
          console.log(error.response.data.message);
        } finally {
          setLoadingStudents(false);
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

  const onSubmit = async () => {
    for (const student of filteredStudents) {
      const obtainedMarks = Number(
        document.getElementById(`obtainedMarks_${student._id}`).value
      );
      const totalMarksValue = Number(totalMarks);
      const resultStatus = document.getElementById(
        `result_${student._id}`
      ).value;

      if (
        isNaN(obtainedMarks) ||
        isNaN(totalMarksValue) ||
        resultStatus === ""
      ) {
        handleShowFailureToast("All fields are required!");
        continue;
      }

      if (obtainedMarks > totalMarksValue) {
        handleShowFailureToast(
          "Obtained marks must be less than or equal to total marks"
        );
        continue;
      }

      try {
        const response = await axios.post(
          `/api/v1/teacher/create-result/${courseId}/${student._id}/${grade}`,
          {
            resultObtainedNumber: obtainedMarks,
            resultTotalMarks: totalMarksValue,
            resultStatus, // directly use Boolean value
            testName,
            testType,
            stdEmail: student.studentEmail,
          }
        );
        handleShowSuccessToast(response.data.message);
      } catch (error) {
        console.log(error.response.data.message);
        handleShowFailureToast(error.response.data.message);
      }
    }
    reset();
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourseId(e.target.value);
  };

  const sendReminder = async (student) => {
    try {
      const result = {
        stdEmail: student.studentEmail,
        obtainedMarks: document.getElementById(`obtainedMarks_${student._id}`)
          .value,
        totalMarks,
        status: document.getElementById(`result_${student._id}`).value,
        testName,
        testType,
      };
      const message = `Test Result Details:\n
        Student Email: ${result.stdEmail}\n
        Obtained Marks: ${result.obtainedMarks}\n
        Total Marks: ${result.totalMarks}\n
        Result Status: ${result.status}\n
        Test Name: ${result.testName}\n
        Test Type: ${result.testType}\n`;
      const response = await axios.post("/api/v1/reminder/send-reminder", {
        recipientType: "Email",
        recipients: [result.stdEmail],
        message: message,
      });

      handleShowSuccessToast(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
      handleShowFailureToast("Failed to send reminder.");
    }
  };

  const sendReminderToAll = async () => {
    try {
      // Execute all sendReminder calls concurrently using Promise.all
      const reminderPromises = filteredStudents.map((student) =>
        sendReminder(student)
      );
      await Promise.all(reminderPromises);
      handleShowSuccessToast("Reminders sent to all students.");
    } catch (error) {
      console.error("Failed to send some reminders:", error);
      handleShowFailureToast("Failed to send some reminders.");
    }
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
                <th className="py-2">Student ID</th>
                <th className="py-2">Student Name</th>
                <th className="py-2">Obtained Marks</th>
                <th className="py-2">Total Marks</th>
                <th className="py-2">Result Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="py-2">{student.studentId}</td>
                  <td className="py-2">{student.studentName}</td>
                  <td className="py-2">
                    <input
                      id={`obtainedMarks_${student._id}`}
                      type="number"
                      placeholder="Obtained Marks"
                      className="border border-gray-300 rounded p-1"
                    />
                  </td>
                  <td className="py-2">{totalMarks}</td>
                  <td className="py-2">
                    <select
                      id={`result_${student._id}`}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="false">Fail</option>
                      <option value="true">Pass</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No students found.</p>
        )}
      </div>

      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
      >
        Submit All Results
      </button>

      <button
        onClick={sendReminderToAll}
        className="bg-yellow-500 text-white px-4 py-2 mt-4 ml-4 rounded-lg"
      >
        Send Reminders
      </button>
    </div>
  );
};

export default TeacherAddResult;
