import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";

const StudentTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [response, setResponse] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentStudentData } = useSelector((state) => state.currentStudentData);

  // Fetch current student data when the component mounts
  useEffect(() => {
    dispatch(loadCurrentStudentAction());
  }, [dispatch]);

  // Set studentId and gradeId when currentStudent updates
  useEffect(() => {
    if (currentStudentData && currentStudentData.currentStudent) {
      setStudentId(currentStudentData.currentStudent._id);
      setGradeId(currentStudentData.currentStudent.studentGrade._id);
    }
  }, [currentStudentData]);

  // Fetch tasks based on the student's grade when gradeId is available
  useEffect(() => {
    const fetchTasksByGrade = async () => {
      if (!gradeId) return;
      try {
        const response = await axios.get(`/api/v1/student/getTask/${gradeId}`);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('Error loading tasks. Please try again later.');
      }
    };

    fetchTasksByGrade();
  }, [gradeId]);

  // Handle task selection and open modal
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handle response change
  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setResponse('');
  };

  // Submit task response
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask || !response) {
      alert('Please select a task and provide your response.');
      return;
    }

    try {
      const submissionData = {
        studentId,
        taskId: selectedTask._id,
        response,
      };

      await axios.post(`/api/v1/student/submitTask`, submissionData);
      alert('Task submitted successfully!');
      closeModal();
    } catch (error) {
      console.error('Error submitting task response:', error);
      alert('Failed to submit task. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => handleTaskClick(task)}
          >
            {task.taskImage && (
              <img
                src={task.taskImage}
                alt="Task Image"
                className="w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-semibold">{task.taskDescription}</h2>
            <p>Course: {task.course.name}</p>
            <p>Deadline: {new Date(task.removeTime).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Modal for task details and response submission */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <button
              className="text-gray-500 hover:text-gray-800 float-right"
              onClick={closeModal}
            >
              &times;
            </button>
            {selectedTask.taskImage && (
              <img
                src={selectedTask.taskIimage}
                alt="Task Image"
                className="w-full h-60 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">
              {selectedTask.taskDescription}
            </h2>
            <p>Course: {selectedTask.course.name}</p>
            <p>Deadline: {new Date(selectedTask.removeTime).toLocaleString()}</p>
            <form onSubmit={handleSubmit} className="mt-4">
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows="4"
                value={response}
                onChange={handleResponseChange}
                placeholder="Write your response here..."
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTask;
