import React from "react";
import Bilal from "./Pics/team/Bilal.jpg";
import Nazia from "./Pics/team/Nazia.png.jpg";
import Mehek from "./Pics/team/Mehak.jpg";
import Minahil from "./Pics/team/Minahil.jpg";
import Faheem from "./Pics/team/Faheem.jpg";
import Gms from "./Pics/team/GMS.jpg";
import Usman from "./Pics/team/Usman.jpg"; // Usman (Product Manager)
import Ahmad from "./Pics/team/Ahmad.jpg";
import sheikh from "./Pics/team/blankPic.jpg";
// Array of team members
const teamMembers = [
  {
    name: "M.Bilal Meher",
    role: "Ceo & Founder",
    image: Bilal, // Local image reference
  },
  {
    name: "Nazia Yasir Mehmood",
    role: "Managing Director",
    image: Nazia,

  },
  // {
  //   name: "",
  //   role: "COO",
  //   image: Mehek,
  // },
  {
    name: "Minahil",
    role: "Project Director",
    image: Minahil,
  },
  {
    name: "M.Usman",
    role: "E-commerce Executive",
    image: Usman,
  },
  {
    name: "Faheem Shaikh",
    role: "Legal Advisor",
    image: Faheem,
  },
  {
    name: "Advocate Samiya Tahir",
    role: "Legal Advisor",
    image: sheikh,
  },
  {
    name: "Ahmad Usman",
    role: "County project director",
    image: Ahmad,
  },
  {
    name: "Sheikh Abubakar Kareem",
    role: "Software Engineer",
    image: sheikh,
    
  },
];

// Team component
const TeamSection = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-100 py-16">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full mb-16">
          <h1 className="text-4xl font-bold title-font mb-4 text-gray-900">
            Our Team
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Meet the amazing people who make everything possible.
          </p>
        </div>
        <div className="flex flex-wrap -m-2 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div
                className={`h-full flex items-center bg-white hover:shadow-xl hover:bg-red-700 hover:text-white p-4 rounded-lg transform transition duration-300 hover:scale-105 ${
                  index % 2 === 0 ? "delay-200" : "delay-400"
                }`}
              >
                <img
                  alt="team"
                  src={member.image}
                  className="w-[120px] h-[120px] rounded-full object-cover object-center border-4 border-white shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <div className="flex-grow ml-4">
                  <h2 className="text-lg font-medium title-font">
                    {member.name}
                  </h2>
                  <p className="text-gray-500 group-hover:text-white">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
