"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export function ResumeUpload({ onFileUpload }) {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles);
    // Pass the first file to parent component since we only need one resume
    if (uploadedFiles && uploadedFiles.length > 0) {
      onFileUpload(uploadedFiles[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload 
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx"
        maxFiles={1}
      />
    </div>
  );
}
