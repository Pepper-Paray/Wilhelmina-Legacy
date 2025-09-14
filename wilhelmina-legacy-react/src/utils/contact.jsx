import React from 'react';

const Contact = () => {
  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border mb-4 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border mb-4 rounded"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-2 border mb-4 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;

