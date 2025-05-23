import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import axios from "axios";

const StudentViewAtttendance = () => {
  const dispatch = useDispatch();
  const [studentAttendance, setStudentAttendance] = useState(null);
  const [attendance, setAttendance] = useState(null);
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, []);
  const { currentStudentData } = useSelector(
    (state) => state.currentStudentData
  );
  useEffect(() => {
    const loadCurrentStudentAttendance = async () => {
      try {
        const response = await axios.get("/api/v1/student/view-attendance");
        setAttendance(response.data.attendanceData);
        setStudentAttendance(response.data.studentAttendance);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    loadCurrentStudentAttendance();
  },);
  console.log(attendance);
  return (
    <>
      <div className="view-attendance-container bg-[rgb(240,239,239)] h-screen w-screen overflow-auto">
        <div className="attendance-container w-full h-full">
          <div className="flex w-full justify-center py-5">
            <h1 className="text-3xl font-bold">Student Attendance Report</h1>
          </div>
          <div className="student-details ml-10 mb-10">
            <img
              src={
                currentStudentData &&
                currentStudentData?.currentStudent?.studentAvatar
              }
              alt=""
              className="w-40 h-40"
            />
            <div>
              <div className="flex items-center gap-5  mt-4">
                <h1 className="text-xl font-semibold">Student Name:</h1>
                <h1>
                  {currentStudentData &&
                    currentStudentData?.currentStudent?.studentName}
                </h1>
              </div>
              <div className="flex gap-5 mt-4 items-center">
                <h1 className="text-xl font-semibold ">Student Id:</h1>
                <h1>
                  {currentStudentData &&
                    currentStudentData?.currentStudent?.studentId}
                </h1>
              </div>
              <div>
                <div className="flex gap-5 mt-4 items-center">
                  <h1 className="text-xl font-semibold">Student Grade:</h1>
                  <h1>
                    {currentStudentData &&
                      currentStudentData?.currentStudent?.studentGrade
                        ?.gradeCategory}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="table w-full">
            <div class="relative overflow-x-auto w-full">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs  uppercase bg-black text-white">
                  <tr>
                    {studentAttendance &&
                      studentAttendance.length > 0 &&
                      Array.isArray(studentAttendance)
                      ? studentAttendance.map((lecture) => (
                        <th scope="col" class="px-6 py-3">
                          L#{lecture.attendanceLecture}
                        </th>
                      ))
                      : ""}
                  </tr>
                </thead>
                <tbody>
                  <tr class=" bg-[#d5d5d5] text-white">
                    {attendance && Array.isArray(attendance)
                      ? attendance.map((item) => (
                        <td className="px-6 py-4">
                          {item.present ? "P" : "A"}
                        </td>
                      ))
                      : ""}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentViewAtttendance;
