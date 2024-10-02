import React from 'react';

const VideoTextComponent = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-white shadow-2xl md:flex-row">
      {/* Video Section */}
      <div className="mb-8 md:mb-0 md:w-1/2">
        <div className="relative w-full h-80 md:h-[600px]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/f2gTfPutb3c?autoplay=1&mute=1"
            title="Sample Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      {/* Description Section */}
      <div className="md:w-1/2 md:pl-8">
        <h2 className="mb-4 text-4xl font-bold text-gray-900">Hospital: The Preferred Healthcare Provider in Pakistan</h2>
        <p className="mb-6 text-xl text-gray-700">
          At <strong>Hospital</strong>, we redefine the hospital experience by prioritizing comfort and trust. Our environment is thoughtfully designed to minimize stress, while our dedicated team goes above and beyond to cater to each patient's needs. Grounded in compassion, our care creates lasting bonds with patients and their families, fostering a community of trust and wellbeing. Trust us with your care—your wellbeing is our highest priority.
        </p>
        <ul className="pl-6 mb-6 text-lg text-gray-700 list-disc">
          <li>Modern Facility: Equipped with the latest medical technology and advanced equipment.</li>
          <li>Experienced Team: Skilled doctors, nurses, and support staff dedicated to your health.</li>
          <li>Comprehensive Services: From routine check-ups to complex surgeries, we offer a wide range of medical services.</li>
          <li>Patient-Centered Care: Personalized treatment plans tailored to individual needs.</li>
          <li>Comfortable Environment: A welcoming space designed to make patients and families feel at ease.</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoTextComponent;
