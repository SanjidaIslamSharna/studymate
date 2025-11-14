import React from "react";

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center uppercase">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-2xl">
            <p className="text-lg text-gray-600">
              "I was struggling to find the right study partner until I found StudyMate. It's been a game-changer for me!"
            </p>
            <p className="text-sm text-gray-500">
              - John Doe
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-2xl">
            <p className="text-lg text-gray-600">
              "I was skeptical at first, but StudyMate really delivered. I found the perfect study partner for my needs."
            </p>
            <p className="text-sm text-gray-500">
              - Jane Doe
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-2xl">
            <p className="text-lg text-gray-600">
              "StudyMate is the best thing that's happened to my studying routine. I highly recommend it to anyone looking for a study partner."
            </p>
            <p className="text-sm text-gray-500">
              - Bob Smith
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;