import React, { useState } from 'react';
import e1 from "../../../Assets/Welfares/welfare/doctor1.webp";
import e2 from "../../../Assets/Welfares/welfare/e2.jpg";
import e3 from "../../../Assets/Welfares/welfare/e3.png";
import e4 from "../../../Assets/Welfares/welfare/employment.webp";
import e5 from "../../../Assets/Welfares/welfare/ecommerce.webp";
import { FaVideo, FaCalendarAlt, FaChevronDown } from 'react-icons/fa'; // Import Font Awesome icons
import { CgProfile } from 'react-icons/cg'; // Import CgProfile icon

const doctors = [
  {
    id: 1,
    name: 'Dr. Atiq Durrani',
    specialty: 'Orthopedic Surgeon, Spinal Surgeon',
    qualifications: 'M.B.B.S, F.C.P.S (Ortho), DIPLOMATE OF AMERICAN BOARD',
    waitTime: '15 - 30 Min',
    experience: '25 Years',
    satisfiedPatients: '99% (1240)',
    imageUrl: e1,
    approved: "PMC Approved"
  },
  {
    id: 2,
    name: 'Dr. Sara Khan',
    specialty: 'Cardiologist',
    qualifications: 'M.B.B.S, F.C.P.S (Cardiology)',
    waitTime: '10 - 20 Min',
    experience: '15 Years',
    satisfiedPatients: '97% (800)',
    imageUrl: e2,
    approved: "PMC Approved"
  },
  {
    id: 3,
    name: 'Dr. Ahmed Ali',
    specialty: 'Neurologist',
    qualifications: 'M.B.B.S, F.C.P.S (Neurology)',
    waitTime: '20 - 40 Min',
    experience: '20 Years',
    satisfiedPatients: '95% (650)',
    imageUrl: e3,
    approved: "PMC Approved"
  },
  {
    id: 4,
    name: 'Dr. Fatima Noor',
    specialty: 'Pediatrician',
    qualifications: 'M.B.B.S, F.C.P.S (Pediatrics)',
    waitTime: '30 - 45 Min',
    experience: '18 Years',
    satisfiedPatients: '98% (900)',
    imageUrl: e4,
    approved: "PMC Approved"
  },
  {
    id: 5,
    name: 'Dr. Usman Tariq',
    specialty: 'Gynecologist',
    qualifications: 'M.B.B.S, F.C.P.S (Gynecology)',
    waitTime: '25 - 35 Min',
    experience: '22 Years',
    satisfiedPatients: '96% (700)',
    imageUrl: e5,
    approved: "PMC Approved"
  },
  {
    id: 6,
    name: 'Dr. Mahira Shah',
    specialty: 'Gynecologist',
    qualifications: 'M.B.B.S, F.C.P.S (Gyn)',
    waitTime: '15 - 35 Min',
    experience: '27 Years',
    satisfiedPatients: '96% (1020)',
    imageUrl: e1,
    approved: "PMC Approved"
  },
  {
    id: 7,
    name: 'Dr. Fahad Ali',
    specialty: 'Urologist',
    qualifications: 'M.B.B.S, F.C.P.S (Uro)',
    waitTime: '20 - 30 Min',
    experience: '23 Years',
    satisfiedPatients: '94% (780)',
    imageUrl: e2,
    approved: "PMC Approved"
  },
  {
    id: 8,
    name: 'Dr. Nadia Hussain',
    specialty: 'Oncologist',
    qualifications: 'M.B.B.S, F.C.P.S (Onco)',
    waitTime: '30 - 40 Min',
    experience: '21 Years',
    satisfiedPatients: '90% (650)',
    imageUrl: e3,
    approved: "PMC Approved"
  },
  {
    id: 9,
    name: 'Dr. Omar Farooq',
    specialty: 'Endocrinologist',
    qualifications: 'M.B.B.S, F.C.P.S (Endo)',
    waitTime: '25 - 35 Min',
    experience: '26 Years',
    satisfiedPatients: '93% (710)',
    imageUrl: e4,
    approved: "PMC Approved"
  },
  {
    id: 10,
    name: 'Dr. Saira Younis',
    specialty: 'Ophthalmologist',
    qualifications: 'M.B.B.S, F.C.P.S (Ophth)',
    waitTime: '15 - 25 Min',
    experience: '24 Years',
    satisfiedPatients: '97% (830)',
    imageUrl: e5,
    approved: "PMC Approved"
  },
  {
    id: 11,
    name: 'Dr. Zain Malik',
    specialty: 'Dermatologist',
    qualifications: 'M.B.B.S, F.C.P.S (Derm)',
    waitTime: '20 - 30 Min',
    experience: '28 Years',
    satisfiedPatients: '95% (920)',
    imageUrl: e1,
    approved: "PMC Approved"
  },
  {
    id: 12,
    name: 'Dr. Hina Saleem',
    specialty: 'Psychiatrist',
    qualifications: 'M.B.B.S, F.C.P.S (Psych)',
    waitTime: '35 - 50 Min',
    experience: '22 Years',
    satisfiedPatients: '92% (680)',
    imageUrl: e2,
    approved: "PMC Approved"
  },
  // Add more doctor objects as needed
];

const Doctorhd2 = () => {
  const [visibleCount, setVisibleCount] = useState(5); // Number of doctors initially visible

  // Function to handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount(visibleCount + 5); // Increase visible count by 5
  };

  return (
    <div className="p-10 pl-24 pr-24 bg-gray-50">
      <h1 className='pb-16 text-2xl font-semibold text-black'>Most Experienced Doctors in Lahore Hospital</h1>
      {doctors.slice(0, visibleCount).map((doctor) => (
        <div key={doctor.id} className="relative w-full p-6 pt-12 pb-12 mb-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* PMC Approved Badge */}
          <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full top-4 right-4">
            {doctor.approved}
          </div>
          <div className="flex items-start">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="object-cover w-32 h-32 ml-3 mr-3 border-2 border-gray-300 rounded-full"
            />
            <div className="flex flex-col justify-center flex-1 ml-6">
              <h1 className="mb-2 text-2xl font-semibold text-black">{doctor.name}</h1>
              <p className="mb-2 text-gray-600">{doctor.specialty}</p>
              <p className="mb-4 text-gray-500">{doctor.qualifications}</p>
              <div className="flex flex-col gap-10 text-black">
                <div className="flex items-center mb-2 space-x-4">
                  <div className="flex items-center">
                    <span className="ml-2">
                      <strong><p>Wait Time</p></strong> {doctor.waitTime}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2">
                      <strong><p>Experience</p></strong> {doctor.experience}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2">
                      <strong><p>Satisfied Patients</p></strong> {doctor.satisfiedPatients}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-8 mr-10 space-y-4">
              <button className="flex items-center px-20 py-3 space-x-2 text-white transition-colors duration-300 bg-blue-600 border-2 rounded hover:bg-blue-900 hover:text-white">
                <CgProfile className="text-white" />
                <span>View Profile</span>
              </button>

              <button className="flex items-center px-20 py-3 space-x-2 text-white bg-green-500 rounded hover:bg-green-600">
                <FaCalendarAlt className="text-white" />
                <span>Book Appointment</span>
                <span className="ml-2">Rs: 2300</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {visibleCount < doctors.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleShowMore}
            className="flex items-center justify-center w-full max-w-xs px-12 py-3 mx-auto space-x-2 text-black transition-colors duration-300 bg-white rounded-lg border-3 border-blue hover:bg-blue-600"
          >
            <span className="text-lg font-semibold">Loading More Doctor</span>
            <FaChevronDown className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Doctorhd2;
