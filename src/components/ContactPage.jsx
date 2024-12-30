"use client";
import React, { useState } from "react";
import { Meteors } from "@/components/ui/meteors";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 flex items-center justify-center">
      <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-2 w-2 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
      </div>
      <div className="max-w-2xl mx-auto p-4 relative z-10 text-center">
        <h1 className="text-lg md:text-7xl font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm">
          We are here to help with any questions about our courses, programs, or
          events. Reach out and let us know how we can assist you in your
          musical journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 w-full">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Your name"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            placeholder="Subject"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            required
          />
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
            rows={5}
            required
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Message sent successfully!</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <Meteors number={20} />
    </div>
  );
}

export default ContactUs;
