import React, { useEffect, useState } from "react";
import AddHospital from "./AdminAddHospital/AdminAddHospital";
import AdminAddDoctor from "./AdminAddDoctor/AdminAddDoctor";
import AdminAddPharmacy from "./AdminAddPharmacy/AdminAddPharmacy";
import AdminAddAmbulance from "./AdminAddAmbulance/AdminAddAmbulance";
import AdminAddSpecialist from "./AdminAddSpecialist/AdminAddSpecialist"; // Import the Specialist component
import { useDispatch, useSelector } from "react-redux";
import loadCurrentAdminAction from "../../components/Redux/Admin/Actions/loadCurrentAdminAction.Admin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleShowFailureToast } from "../../components/ToastMessages/ToastMessage";

function MAdmin() {
  const [activeComponent, setActiveComponent] = useState("AdminAddHospital"); // Default to hospitals
  const [Admin, setAdmin] = useState(true);
  const [Showmenu, setShowmenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowing, setShowing] = useState(false);

  useEffect(() => {
    dispatch(loadCurrentAdminAction());
  }, [dispatch]);

  const { currentAdminData } = useSelector((state) => state.currentAdminData);
  const adminLogoutHandler = async () => {
    try {
      const response = await axios.get("/api/v1/admin/logout");
      console.log(response.data.message);
      navigate("/");
    } catch (error) {
      handleShowFailureToast(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="relative h-[100vh] bg-white">
      {Admin ? (
        <div className="grid grid-cols-6 h-full">
          <div
            className={`md:block col-span-1 ${Showmenu ? "" : ""} transition-width duration-500 ease-in-out p-2 bg-[#033e71] text-white text-[0.7rem] md:text-[1rem] font-light md:font-semibold overflow-hidden`}
          >
            <ul
              className="md:p-2"
              style={{
                transform: Showmenu ? "translateX(-1000%)" : "translateX(0%)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <li>
                <h1 className="font-extrabold xl md:text-2xl">Quick Access</h1>
              </li>
              <li className="mt-4">
                <h5
                  onClick={() => setActiveComponent("AdminAddHospital")}
                  className={`cursor-pointer ${activeComponent === "AdminAddHospital"
                      ? " border-b-2 border-white"
                      : ""
                    }`}
                >
                  Add Hospital
                </h5>
              </li>
              <li className="mt-4">
                <h5
                  onClick={() => setActiveComponent("AdminAddSpecialist")}
                  className={` cursor-pointer ${activeComponent === "AdminAddSpecialist"
                      ? " border-b-2 border-white"
                      : ""
                    }`}
                >
                  Add Specialist
                </h5>
              </li>
              <li className="mt-4">
                <h5
                  onClick={() => setActiveComponent("AdminAddDoctor")}
                  className={`cursor-pointer ${activeComponent === "AdminAddDoctor"
                      ? " border-b-2 border-white"
                      : ""
                    }`}
                >
                  Add Doctor
                </h5>
              </li>
              <li className="mt-4">
                <h5
                  onClick={() => setActiveComponent("AdminAddPharmacy")}
                  className={` cursor-pointer ${activeComponent === "AdminAddPharmacy"
                      ? " border-b-2 border-white"
                      : ""
                    }`}
                >
                  Add Pharmacy
                </h5>
              </li>
              <li className="mt-4">
                <h5
                  onClick={() => setActiveComponent("AdminAddAmbulance")}
                  className={` cursor-pointer ${activeComponent === "AdminAddAmbulance"
                      ? " border-b-2 border-white"
                      : ""
                    }`}
                >
                  Add Ambulance
                </h5>
              </li>
            </ul>
          </div>

          <div className="p-4 col-span-5 overflow-y-auto">
            <div className="text-center relative bg-gray-200 text-black font-bold h-20 flex justify-between items-center p-4">
              <div className="flex justify-between items-center flex-wrap xl:w-[60%]">
                <h1>{"Hello " + currentAdminData?.admin?.adminName + "!"}</h1>
                <h1 className="mr-20 font-bold">Medical Dashboard</h1>
              </div>
              <img
                src={currentAdminData?.admin?.adminAvatar}
                alt=""
                className="w-10 h-10 rounded-full shadow-lg cursor-pointer"
                onClick={() => setShowing(!isShowing)}
              />
              {isShowing ? (
                <div className="w-40 h-[6rem] z-10 bg-slate-400 absolute right-0 bottom-[-6rem] flex justify-center items-center">
                  <div
                    onClick={adminLogoutHandler}
                    className="w-20 h-10 bg-white flex justify-center items-center text-xs rounded-lg cursor-pointer"
                  >
                    SignOut
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="overflow-y-auto h-[calc(100vh-6rem)]">
              {activeComponent === "AdminAddHospital" && <AddHospital />}
              {activeComponent === "AdminAddSpecialist" && <AdminAddSpecialist />}
              {activeComponent === "AdminAddDoctor" && <AdminAddDoctor />}
              {activeComponent === "AdminAddPharmacy" && <AdminAddPharmacy />}
              {activeComponent === "AdminAddAmbulance" && <AdminAddAmbulance />}
            </div>
          </div>
        </div>
      ) : (
        <h1>Not logged in to any account</h1>
      )}
    </div>
  );
}

export default MAdmin;
