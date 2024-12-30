"use client"
import Footer from "@/components/Footer";
import { ResumeAnalyzer } from "@/components/ResumeAnalyzer";

function Resume() {
  return (
    <main>
      <div className="mt-32">
        <h1 className="text-3xl font-semibold text-center my-8">
          Upload your resume to analyze it...
        </h1>
        <ResumeAnalyzer />
        <Footer />
      </div>
    </main>
  );
}

export default Resume;
