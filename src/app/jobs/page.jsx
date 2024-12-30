"use client";
import React, { useState } from "react";
import Footer from "@/components/Footer";
import JobSection from "@/components/JobSection"; // Correct import path

export default function Jobs() {
  const [filter, setFilter] = useState("recent");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] pt-16">
      <div>
        <JobSection filter={filter} />
      </div>
      <Footer />
    </main>
  );
}
