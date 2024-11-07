import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  handleShowFailureToast,
  handleShowSuccessToast,
} from "../../ToastMessages/ToastMessage";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TeacherTakeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [gradeId, setGradeId] = useState(null);
  const navigate = useNavigate();

  // Load all grades and students on component mount
  useEffect(() => {
    const loadAllGrades = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-grades");
        if (response.data && response.data.grades) {
          setGrades(response.data.grades);
          if (response.data.grades.length > 0) {
            setGradeId(response.data.grades[0]._id);
          }
        }
      } catch (error) {
        console.error("Error loading grades:", error);
      }
    };

    const loadAllStudents = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-students");
        if (response.data && response.data.students) {
          setAllStudents(response.data.students);
          console.log("All students data:", response.data.students); // Log all students
        }
      } catch (error) {
        console.error("Error loading students:", error);
      }
    };

    loadAllGrades();
    loadAllStudents();
  }, []);

  const handleGradeChange = (e) => {
    const selectedGradeCategory = e.target.value;

    // Filter students based on the grade category
    const studentsInGrade = allStudents.filter(
      (student) => student.studentGrade?.gradeCategory === selectedGradeCategory
    );

    setFilteredStudents(studentsInGrade);
    setAttendance(
      studentsInGrade.map((student) => ({
        studentId: student._id,
        present: true,
      }))
    );

    console.log("Selected Grade Category:", selectedGradeCategory);
    console.log("Filtered Students:", studentsInGrade); // Log filtered students
  };

  const sendDataToAttendanceApi = async () => {
    if (attendance.length && gradeId) {
      const data = { attendanceStudents: attendance };
      try {
        const response = await axios.post(
          `/api/v1/teacher/take-attendance/${gradeId}`,
          data
        );
        handleShowSuccessToast(response.data.message);
        // navigate(`/teacher/view-grade-attendance`);
      } catch (error) {
        console.error("Error submitting attendance:", error);
      }
    } else {
      handleShowFailureToast("Attendance data is missing.");
    }
  };

  const handleCheckBoxChange = (studentId) => {
    setAttendance((prevAttendance) =>
      prevAttendance.map((student) =>
        student.studentId === studentId
          ? { ...student, present: !student.present }
          : student
      )
    );
  };

  return (
    <div className="h-[100vh] xl:mx-8">
      <div className="grid grid-cols-6 h-full">
        <Toaster />
        <div className="col-span-5">
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="flex gap-8 m-10 items-center">
                  <h1 className="text-2xl font-bold">Grade Attendance</h1>
                  <select
                    value={gradeId || ""}
                    onChange={handleGradeChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  >
                    <option value="">Select Grade</option>
                    {grades.map((grade) => (
                      <option key={grade._id} value={grade.gradeCategory}>
                        {grade.gradeCategory || "Unnamed Grade"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm font-light text-black">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr className="text-white">
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Student Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Student Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Today's Attendance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student._id}
                          className={`border-b dark:border-neutral-500 ${
                            index % 2 === 0 ? "bg-gray-100" : ""
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {student.studentId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {student.studentName || "N/A"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              type="checkbox"
                              className="w-10 h-4"
                              onChange={() => handleCheckBoxChange(student._id)}
                              checked={
                                attendance.find(
                                  (att) => att.studentId === student._id
                                )?.present
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="bg-blue-500 px-8 py-2 rounded-md font-bold text-xl text-white hover:bg-blue-400 m-4"
              onClick={sendDataToAttendanceApi}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherTakeAttendance;
