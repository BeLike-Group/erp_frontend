import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SchoolData.css"; // Import custom styles
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loadCurrentAdminAction from "../../Redux/Admin/Actions/loadCurrentAdminAction.Admin";
import loadCurrentTeacherAction from "../../Redux/Teacher/Actions/loadCurrentTeacherAction.Teacher";
import loadCurrentStudentAction from "../../Redux/Student/Actions/loadCurrentStudentAction.Student";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import { Oval } from "react-loader-spinner"; // Import loader

import Logo from "../../../Assets/school.png";

const services = {
  "Our Partners": [
    { name: "Our Partner Schools", img: Logo },
    { name: "Admission For All", img: Logo },
    { name: "Board Papers", img: Logo },
    { name: "Syllabus Grade 1-10", img: Logo },
  ],
  Portal: [
    { name: "Administration", img: Logo },
    { name: "Teachers", img: Logo },
    { name: "Students", img: Logo },
  ],
  "School Store": [
    { name: "Uniform", img: Logo },
    { name: "Books", img: Logo },
    { name: "Stationary", img: Logo },
  ],
};

const SchoolData = () => {
  const [admins, setAdmins] = useState([]);
  const [displayAdmin, setDisplayAdmin] = useState(null);
  const [announcement, setAnnouncement] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentAdminData } = useSelector((state) => state.currentAdminData);
  const { currentTeacherData } = useSelector((state) => state.currentTeacherData);
  const { currentStudentData } = useSelector((state) => state.currentStudentData);

  useEffect(() => {
    dispatch(loadCurrentAdminAction());
    dispatch(loadCurrentTeacherAction());
    dispatch(loadCurrentStudentAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/v1/admin/load-all-admins");
        setAdmins(response.data.data);
      } catch (error) {
        toast.error("Failed to load admins");
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    const userRoleData = currentAdminData?.admin || currentTeacherData?.teacher || currentStudentData?.currentStudent;

    if (userRoleData && (currentTeacherData || currentStudentData)) {
      const matchedAdmin = admins.find(admin => admin._id === userRoleData.adminId);
      if (matchedAdmin) {
        setDisplayAdmin(matchedAdmin);
        setAnnouncement(matchedAdmin.announcement);
      }
    } else if (currentAdminData) {
      setDisplayAdmin(currentAdminData.admin);
      setAnnouncement(currentAdminData.admin.announcement);
    }
  }, [admins, currentAdminData, currentTeacherData, currentStudentData]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/v1/admin/logout");
      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (announcement) {
      toast.info(announcement, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [announcement]);

  return (
    <div className="p-28 bg-gradient-to-r from-blue-400 to-green-500">
      <ToastContainer /> {/* Add ToastContainer here */}
      {displayAdmin ? (
        <div className="d-flex justify-content-between align-items-center mb-4 bg-white">
          <img
            alt="Admin Avatar"
            className="admin-avatar p-8 ms-lg-2"
            src={displayAdmin.adminAvatar || "/default-avatar.png"}
            style={{ height: "200px", width: "200px" }} // Adjust as needed
          />
          <div className="d-flex items-center justify-center flex-col p-8">
            <h1 className="admin-heading font-bold text-5xl text-black">{displayAdmin.adminName}</h1>
            <a
              className="admin-heading font-semibold text-xl text-green-300"
              href={displayAdmin.locationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to School
            </a>
            <p className="text-md text-black font-semibold">Address: {displayAdmin.address}</p>
          </div>

          <div className="flex flex-col items-start gap-4 p-8">
            <NavLink
              to="/all-schools-and-academies-collaborations"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
            >
              Go to Profile
            </NavLink>
            <p className="text-gray-700 font-semibold text-lg">
              Contact: {displayAdmin.contactNumber}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="login-section text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-black">Welcome to Belike Group</h1>
          <p className="text-lg mb-6 text-black">Please log in to access the school portal</p>
          <NavLink
            to="/admin-login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Login as Admin
          </NavLink>
        </div>
      )}

      {Object.entries(services).map(([heading, blocks]) => (
        <div key={heading} className="service-section">
          <h3 className="text-center fw-bold service-heading">{heading}</h3>
          <div className="services-grid">
            {blocks.map((service) => (
              <div key={service.name} className="service-card">
                <NavLink
                  className="text-reset text-decoration-none text-center"
                  to={`/${service.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="medical-img-container mb-3">
                    <img
                      src={service.img}
                      alt={`${service.name} Logo`}
                      className="service-img" // Adjust size here
                    />
                  </div>
                  <h1 className="service-name">{service.name}</h1>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!displayAdmin && (
        <section>
          <div
            className="ccw_plugin chatbot"
            style={{
              bottom: "20px",
              right: "20px",
            }}
          >
            <div className="style4 animated no-animation ccw-no-hover-an">
              <a
                className="nofocus"
                href="https://api.whatsapp.com/send?phone=+923475800705&text=Hi, I’m reaching out through Belike!"
                style={{
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                <div
                  className="chip style-4 ccw-analytics"
                  data-ccw="style-4"
                  id="style-4"
                  style={{
                    backgroundColor: "#25D366",
                    borderRadius: "100%",
                    color: "white !important",
                    fontSize: "20px",
                    padding: "18px 20px 15px 20px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  <i
                    aria-hidden="true"
                    className="fa fa-whatsapp"
                    style={{
                      fontSize: "36px",
                    }}
                  />
                </div>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SchoolData;
