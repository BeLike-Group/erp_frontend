import React from "react";
import Bilal from "./Pics/team/Bilal.jpg";
import Nazia from "./Pics/team/Nazia.jpg";
import Mehek from "./Pics/team/Mehak.jpg";
import Minahil from "./Pics/team/Minahil.jpg";
import Faheem from "./Pics/team/Faheem.jpg";
import Gms from "./Pics/team/GMS.jpg";
import Usman from "./Pics/team/Usman.jpg";
import Ahmad from "./Pics/team/Ahmad.jpg";
import Abrar from "./Pics/team/Abrar.jpg";
import DefaultImage from "./Pics/team/default.jpg"; // Placeholder image

// Array of team members
const teamMembers = [
  {
    name: "M.Bilal Meher",
    role: "Ceo & Founder",
    image: Bilal,
  },
  {
    name: "Nazia Yasir Mehmood",
    role: "Managing Director",
    image: Nazia,
  },
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
    image: DefaultImage,
  },
  {
    name: "Wajid Saleem",
    role: "BDM",
    image: DefaultImage,
  },
  {
    name: "Abrar Amjad",
    role: "Web Developer",
    image: Abrar,
  },
];

// Team component
const Team = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-black body-font p-4">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-black hover:text-white">
              Our Dedicated Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Meet the professionals driving our vision forward with expertise and passion.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {teamMembers.map((member, index) => (
              <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <article
                  className={`h-full flex items-center hover:shadow-lg hover:shadow-slate-950 hover:bg-red-700 hover:text-white p-4 rounded-lg transform transition duration-300 hover:cursor-pointer hover:scale-105 fade-in-up ${
                    index % 2 === 0 ? "delay-200" : "delay-400"
                  }`}
                >
                  <img
                    alt={`Photo of ${member.name}`}
                    className="w-16 h-16 bg-gray-100 object-center object-cover flex-shrink-0 rounded-full mr-4"
                    src={member.image || DefaultImage}
                  />
                  <div className="flex-grow">
                    <h2 className="title-font font-medium text-lg">
                      {member.name}
                    </h2>
                    <p>{member.role}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
