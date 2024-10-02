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
import Asap from "../../../Assets/asaassp.jpeg"

const services = {
  "Our Partners": [
    { name: "All Schools and Academies Collaborations", img: Logo },



  ],
  "All Schools and Academies Assosiation Punjabs" : [
    { name: "All Schools and Academies Assosiation Punjabs", img: Asap },
  ],
};

const DrillingSchool = () => {
  

  return (
    <div className=" mt-10 p-28 bg-gradient-to-r from-blue-400 to-green-500 h-screen">
     

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

    
    </div>
  );
};

export default DrillingSchool;
