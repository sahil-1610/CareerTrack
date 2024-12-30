"use client";
import React, { useState, useEffect } from "react";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const defaultLoadingStates = [
  { text: "Scanning your resume...", completed: false },
  { text: "Identifying key skills...", completed: false },
  { text: "Analyzing experience level...", completed: false },
  { text: "Matching with course database...", completed: false },
  { text: "Generating personalized recommendations...", completed: false },
  { text: "Almost there...", completed: false },
  { text: "Finalizing your course suggestions...", completed: false }
];

export function Analyzer({ loading, setLoading, loadingStates = defaultLoadingStates }) {
  const [states, setStates] = useState(loadingStates);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setStates(currentStates => 
          currentStates.map((state, index) => ({
            ...state,
            completed: index <= currentStates.findIndex(s => !s.completed)
          }))
        );
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <MultiStepLoader 
        loadingStates={states} 
        loading={loading} 
        duration={1200} 
      />
      <button
        className="fixed top-4 right-4 text-white z-[120]"
        onClick={() => setLoading(false)}
      >
        <IconSquareRoundedX className="h-10 w-10" />
      </button>
    </div>
  );
}
