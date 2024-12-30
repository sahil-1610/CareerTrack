"use client";
import React, { useState } from 'react';

export default function UserProfileForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    username: initialData.username || '',
    githubUrl: initialData.githubUrl || '',
    linkedinUrl: initialData.linkedinUrl || '',
    skills: Array.isArray(initialData.skills) ? initialData.skills.join(', ') : '',
    projects: initialData.projects || [{ name: '', url: '', description: '' }],
    certificates: initialData.certificates || [''],
    languages: initialData.languages || [{ name: '', proficiency: '' }],
    targetRole: initialData.targetRole || '',
    preferredLocation: initialData.preferredLocation || '',
  });

  const addField = (field) => {
    if (field === 'projects') {
      setFormData({
        ...formData,
        projects: [...formData.projects, { name: '', url: '', description: '' }]
      });
    } else if (field === 'languages') {
      setFormData({
        ...formData,
        languages: [...formData.languages, { name: '', proficiency: '' }]
      });
    } else if (field === 'certificates') {
      setFormData({
        ...formData,
        certificates: [...formData.certificates, '']
      });
    }
  };

  const handleCertificateChange = (index, value) => {
    const newCertificates = [...formData.certificates];
    newCertificates[index] = value;
    setFormData({
      ...formData,
      certificates: newCertificates
    });
  };

  const removeCertificate = (index) => {
    const newCertificates = formData.certificates.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      certificates: newCertificates
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatted = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      projects: formData.projects.map(project => ({
        name: project.name || project.title,
        url: project.url,
        description: project.description
      })),
      languages: formData.languages.map(lang => ({
        name: lang.name || lang.language,
        proficiency: lang.proficiency
      })),
      certificates: formData.certificates.filter(Boolean)
    };
    await onSubmit(formatted);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-white text-center">User Profile Form</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg text-white mt-16"
      >
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Name*</label>
            <input
              required
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block mb-2">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) =>
                setFormData({ ...formData, linkedinUrl: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700"
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700"
            placeholder="React, Node.js, Python"
          />
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <label className="block mb-2">Projects</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="space-y-2 p-4 bg-gray-700 rounded">
              <input
                type="text"
                placeholder="Project Title"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].name = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className="w-full p-2 rounded bg-gray-600"
              />
              <input
                type="url"
                placeholder="Project URL"
                value={project.url}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[index].url = e.target.value;
                  setFormData({ ...formData, projects: newProjects });
                }}
                className="w-full p-2 rounded bg-gray-600"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("projects")}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Add Project
          </button>
        </div>

        {/* Certificates Section */}
        <div className="space-y-4">
          <label className="block mb-2">Certificates</label>
          {formData.certificates.map((certificate, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={certificate}
                onChange={(e) => handleCertificateChange(index, e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700"
                placeholder="Certificate name or description"
              />
              {formData.certificates.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="px-3 py-2 bg-red-600 rounded hover:bg-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("certificates")}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Add Certificate
          </button>
        </div>

        {/* Languages */}
        <div className="space-y-4">
          <label className="block mb-2">Languages</label>
          {formData.languages.map((lang, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="Language"
                value={lang.name}
                onChange={(e) => {
                  const newLangs = [...formData.languages];
                  newLangs[index].name = e.target.value;
                  setFormData({ ...formData, languages: newLangs });
                }}
                className="flex-1 p-2 rounded bg-gray-700"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => {
                  const newLangs = [...formData.languages];
                  newLangs[index].proficiency = e.target.value;
                  setFormData({ ...formData, languages: newLangs });
                }}
                className="p-2 rounded bg-gray-700"
              >
                <option value="">Select Proficiency</option>
                <option value="Native">Native</option>
                <option value="Professional">Professional</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("languages")}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            + Add Language
          </button>
        </div>

        {/* Target Role */}
        <div>
          <label className="block mb-2">Target Role</label>
          <input
            type="text"
            value={formData.targetRole}
            onChange={(e) =>
              setFormData({ ...formData, targetRole: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700"
          />
        </div>

        {/* Preferred Location */}
        <div>
          <label className="block mb-2">Preferred Location</label>
          <input
            type="text"
            value={formData.preferredLocation}
            onChange={(e) =>
              setFormData({ ...formData, preferredLocation: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </>
  );
}
