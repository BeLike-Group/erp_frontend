import React from 'react';
import Slider from 'react-slick';

const Feedback = () => {
  // Example data for each step
  const feedbackData = [
    {
      name: 'John Doe',
      rating: 4,
      comment: 'The hospital provided excellent care and attention. The facilities were modern and clean.',
      image: 'https://avatars.mds.yandex.net/i?id=eac2f61310833f6d245f94228771c963feb54a20-5252657-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Jane Smith',
      rating: 5,
      comment: 'Outstanding service! The staff was very friendly and the treatment was top-notch.',
      image: 'https://avatars.mds.yandex.net/i?id=e58ac89bdca6d80dd4059235d7885f3746bebc80-5888857-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Sam Wilson',
      rating: 3,
      comment: 'Decent experience overall. Some improvements could be made in the waiting time.',
      image: 'https://avatars.mds.yandex.net/i?id=774b8c982d398c6fd5b6eb4a5f55fe06b0f03c6a-6220307-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'John Doe',
      rating: 4,
      comment: 'The hospital provided excellent care and attention. The facilities were modern and clean.',
      image: 'https://avatars.mds.yandex.net/i?id=eac2f61310833f6d245f94228771c963feb54a20-5252657-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Jane Smith',
      rating: 5,
      comment: 'Outstanding service! The staff was very friendly and the treatment was top-notch.',
      image: 'https://avatars.mds.yandex.net/i?id=e58ac89bdca6d80dd4059235d7885f3746bebc80-5888857-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Sam Wilson',
      rating: 3,
      comment: 'Decent experience overall. Some improvements could be made in the waiting time.',
      image: 'https://avatars.mds.yandex.net/i?id=774b8c982d398c6fd5b6eb4a5f55fe06b0f03c6a-6220307-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'John Doe',
      rating: 4,
      comment: 'The hospital provided excellent care and attention. The facilities were modern and clean.',
      image: 'https://avatars.mds.yandex.net/i?id=eac2f61310833f6d245f94228771c963feb54a20-5252657-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Jane Smith',
      rating: 5,
      comment: 'Outstanding service! The staff was very friendly and the treatment was top-notch.',
      image: 'https://avatars.mds.yandex.net/i?id=e58ac89bdca6d80dd4059235d7885f3746bebc80-5888857-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Sam Wilson',
      rating: 3,
      comment: 'Decent experience overall. Some improvements could be made in the waiting time.',
      image: 'https://avatars.mds.yandex.net/i?id=774b8c982d398c6fd5b6eb4a5f55fe06b0f03c6a-6220307-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'John Doe',
      rating: 4,
      comment: 'The hospital provided excellent care and attention. The facilities were modern and clean.',
      image: 'https://avatars.mds.yandex.net/i?id=eac2f61310833f6d245f94228771c963feb54a20-5252657-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Jane Smith',
      rating: 5,
      comment: 'Outstanding service! The staff was very friendly and the treatment was top-notch.',
      image: 'https://avatars.mds.yandex.net/i?id=e58ac89bdca6d80dd4059235d7885f3746bebc80-5888857-images-thumbs&n=13', // Replace with your image path
    },
    {
      name: 'Sam Wilson',
      rating: 3,
      comment: 'Decent experience overall. Some improvements could be made in the waiting time.',
      image: 'https://avatars.mds.yandex.net/i?id=774b8c982d398c6fd5b6eb4a5f55fe06b0f03c6a-6220307-images-thumbs&n=13', // Replace with your image path
    },
    // Add more feedback items here if needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-center font-headline sm:text-3xl">
        What Our Patients Say
      </h2>

      <Slider {...settings} className="mt-16 sm:mt-24">
        {feedbackData.map((feedback, index) => (
          <div key={index} className="px-2 text-center">
            <div className="relative w-20 h-20 mx-auto sm:w-28 sm:h-28 lg:w-32 lg:h-32">
              <div className="relative z-10 flex items-center justify-center w-full h-full bg-white border border-gray-300 rounded-full shadow">
                <img
                  src={feedback.image}
                  alt={`Feedback ${index + 1}`}
                  className="w-32 h-32 rounded-full"
                />
              </div>
              <div className="absolute inset-0 -translate-x-2 -translate-y-2 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="mt-6 text-xl font-headline sm:text-2xl sm:mt-10">{feedback.name}</h3>
            <p className="mt-2 text-yellow-500">
              {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
            </p>
            <p className="mt-4 leading-relaxed">{feedback.comment}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Feedback;
