"use client";
import { useState } from "react";
import { ResumeUpload } from "./ResumeUpload";
import { Analyzer } from "./Analyzer";
import { CourseCard } from "./CourseCard";
import { useRouter } from "next/navigation";

export function ResumeAnalyzer() {
  const [roleSearch, setRoleSearch] = useState("");
  const [file, setFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const router = useRouter();

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
    validateInputs(uploadedFile, roleSearch);
  };

  const validateInputs = (currentFile, currentRole) => {
    if (currentFile && currentRole.trim()) {
      setIsValid(true);
      setValidationMessage("Ready to analyze! Click the button below.");
    } else {
      setIsValid(false);
      setValidationMessage(
        !currentFile 
          ? "Please upload your resume" 
          : "Please specify the role you're interested in"
      );
    }
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoleSearch(value);
    validateInputs(file, value);
  };

  const handleAnalyze = async () => {
    if (!isValid) {
      setValidationMessage("Please provide both a role and upload a resume");
      return;
    }

    setLoading(true);
    setShowCourses(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 8400));

      // Simulate API response with analysis results
      const analysisResponse = {
        skills: ["JavaScript", "React", "Node.js"],
        experienceLevel: "Intermediate",
        recommendedCourses: [
          {
            id: 1,
            courseName: `${roleSearch} Foundation Course`,
            courseUrl: "https://www.coursera.org/specializations/sample",
            description: `Essential ${roleSearch} concepts and practices.`
          },
          {
            id: 2,
            courseName: "Advanced Career Skills",
            courseUrl: "https://www.udemy.com/course/advanced-dev",
            description: "Advanced concepts for career growth."
          },
          {
            id: 3,
            courseName: "Industry Best Practices",
            courseUrl: "https://www.pluralsight.com/best-practices",
            description: "Modern development methodologies and practices."
          }
        ]
      };

      setAnalysisResults(JSON.stringify(analysisResponse, null, 2));
      setRecommendedCourses(analysisResponse.recommendedCourses);
      setShowCourses(true);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setValidationMessage("Error analyzing resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showCourses ? (
        <>
          <div className="max-w-md mx-auto mb-6">
            <input
              type="text"
              value={roleSearch}
              onChange={handleRoleChange}
              placeholder="Which role are you searching for?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-800 text-gray-800"
            />
          </div>
          <ResumeUpload onFileUpload={handleFileUpload} />

          {/* Validation Message */}
          {validationMessage && (
            <div
              className={`text-center mt-4 ${
                isValid ? "text-green-600" : "text-red-600"
              }`}
            >
              {validationMessage}
            </div>
          )}

          <div className="flex justify-center mt-4 mb-6">
            <button
              onClick={handleAnalyze}
              disabled={!isValid}
              className={`shadow-[inset_0_0_0_2px_#616467] px-12 py-4 rounded-full tracking-widest uppercase font-bold transition duration-200
                ${
                  isValid
                    ? "text-black hover:bg-[#616467] hover:text-white dark:text-neutral-200 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
            >
              Analyze Resume
            </button>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <div className="max-w-3xl mx-auto mb-8 p-4">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Analysis Results:
            </h3>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
              {analysisResults}
            </pre>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-8 dark:text-white">
            Recommended Courses for {roleSearch}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowCourses(false)}
              className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20"> Analyze Another Resume</span>
            </button>
          </div>
        </div>
      )}

      {loading && <Analyzer loading={loading} setLoading={setLoading} />}
    </div>
  );
}
