"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React from "react";
import "../app/globals.css";
import { WobbleCard } from "./ui/wobble-card";
import { PencilIcon } from "@heroicons/react/24/outline";
import UserProfileForm from "./UserProfileForm";
import { IconBrandGithub, IconBrandGoogle, IconBrandLinkedin } from "@tabler/icons-react";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/avatar.png");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/user/profile');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }

        setUser(data.user);
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError(error.message);
        if (error.message.includes('Unauthorized') || error.message.includes('Authentication failed')) {
          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);



  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setUser(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally show error to user
    }
  };

  const fetchGitHubProfileImage = async (githubUrl) => {
    if (!githubUrl) return;
    
    try {
      const username = githubUrl.split('/').pop();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`https://api.github.com/users/${username}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CareerTrack-App'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch GitHub profile');
      }

      const data = await response.json();
      if (data.avatar_url) {
        setProfileImage(data.avatar_url);
      }
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      setProfileImage("/avatar.png"); // Fallback to default avatar
    }
  };

  useEffect(() => {
    if (user?.githubUrl) {
      fetchGitHubProfileImage(user.githubUrl);
    }
  }, [user?.githubUrl]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  if (!user) return <div className="flex justify-center items-center min-h-screen">No user data found</div>;

  if (isEditing) {
    return <UserProfileForm onSubmit={handleProfileUpdate} initialData={user} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(true)}
        className="fixed top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 z-50"
      >
        <PencilIcon className="h-5 w-5 text-white" />
      </button>

      {/* Profile Info */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-pink-800 min-h-[300px]">
        <div className="flex p-6">
          <div className="relative w-32 h-32">
            <Image
              src={profileImage}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full border border-gray-300"
              onError={() => setProfileImage("/avatar.png")}
              unoptimized={true} // Add this for external images
            />
          </div>
          <div className="ml-6">
            <h1 className="text-white text-2xl font-bold mb-2">
              {user.username || user.name}
            </h1>
            <div className="space-y-2">
              {user.githubUrl && (
                <p className="text-neutral-200">
                  <a
                    href={user.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-400 focus:text-blue-400 active:text-blue-500 cursor-pointer"
                  >
                    <span>GitHub Profile</span>
                    <IconBrandGithub className="h-4 w-4" />
                  </a>
                </p>
              )}
              {user.linkedinUrl && (
                <p className="text-neutral-200">
                  <a
                    href={user.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-400 focus:text-blue-400 active:text-blue-500 cursor-pointer"
                  >
                    <span>LinkedIn Profile</span>
                    <IconBrandLinkedin className="h-4 w-4" />
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </WobbleCard>

      {/* Skills */}
      <WobbleCard containerClassName="col-span-1 bg-gray-800 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
        <ul className="text-neutral-200 space-y-2">
          {user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </WobbleCard>

      {/* Projects */}
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-blue-900 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>
        <div className="space-y-4">
          {user.projects?.map((project, index) => (
            <div key={index} className="text-neutral-200 p-3 rounded-lg hover:bg-blue-800/50 transition-colors duration-200">
              <h3 className="font-semibold">{project.title || project.name}</h3>
              <p className="text-sm text-gray-300 mb-2">
                {project.description}
              </p>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 focus:text-blue-300 active:text-blue-500 transition-colors duration-200"
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </WobbleCard>

      {/* Certificates */}
      <WobbleCard containerClassName="col-span-1 bg-gray-800 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">Certificates</h2>
        <ul className="text-neutral-200 space-y-2">
          {user.certificates.map((certificate, index) => (
            <li key={index}>{certificate}</li>
          ))}
        </ul>
      </WobbleCard>

      {/* Languages Known */}
      <WobbleCard containerClassName="col-span-1 bg-gray-800 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">Languages</h2>
        <ul className="text-neutral-200 space-y-2">
          {user.languages?.map((lang, index) => (
            <li key={index}>
              <span className="font-semibold">
                {lang.language || lang.name}
              </span>
              {lang.proficiency && (
                <span className="text-gray-300"> - {lang.proficiency}</span>
              )}
            </li>
          ))}
        </ul>
      </WobbleCard>

      {/* Current Role */}
      <WobbleCard containerClassName="col-span-1 bg-purple-900 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">Looking For</h2>
        <div className="text-neutral-200 space-y-2">
          <p className="font-semibold">Current Target Role:</p>
          <p>{user.targetRole}</p>
          <p className="mt-2 font-semibold">Preferred Location:</p>
          <p>{user.preferredLocation}</p>
        </div>
      </WobbleCard>

      {/* Suggested Courses */}
      <WobbleCard containerClassName="col-span-1 bg-indigo-900 p-5">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recommended Learning Path
        </h2>
        <ul className="text-neutral-200 space-y-3">
          {user.recommendedCourses.map((course, index) => (
            <li key={index}>
              <p className="font-semibold">{course.name}</p>
              <a href={course.url} className="text-sm underline">
                View Course →
              </a>
            </li>
          ))}
        </ul>
      </WobbleCard>
    </div>
  );
}
