import React from "react";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center uppercase">
          How It Works
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 text-lg">
          <li className="flex items-start">
            <strong className="mr-2">Create a Profile:</strong>
            Sign up and create your study partner profile with your subjects, availability, and preferences.
          </li>
          <li className="flex items-start">
            <strong className="mr-2">Find Partners:</strong>
            Browse through profiles to find study partners that match your criteria.
          </li>
          <li className="flex items-start">
            <strong className="mr-2">Connect and Collaborate:</strong>
            Send connection requests and start studying together!
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;