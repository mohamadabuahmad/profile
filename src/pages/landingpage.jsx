import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: "chatbot",
    title: "AI Chatbot",
    short: "Automated 24/7 WhatsApp support with custom responses.",
  },
  {
    id: "appointments",
    title: "Appointment Booking",
    short: "Let clients schedule appointments directly from WhatsApp.",
  },
  {
    id: "reports",
    title: "Monthly Reports",
    short: "Get detailed performance insights and analytics.",
  },
];

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <p className="mb-4">{product.short}</p>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;