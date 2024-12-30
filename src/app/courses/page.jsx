"use client";
import { useState, useEffect } from "react";
import { CourseCard } from "@/components/CourseCard";
import Footer from "@/components/Footer";

function Courses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      courseName: "Complete React Developer Course",
      courseUrl:
        "https://www.udemy.com/course/complete-react-developer-zero-to-mastery/",
      description:
        "Learn React from scratch. Includes Hooks, Redux, GraphQL and more.",
    },
    {
      id: 2,
      courseName: "The Complete Web Development Bootcamp",
      courseUrl:
        "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      description:
        "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
    },
    {
      id: 3,
      courseName: "JavaScript Algorithms and Data Structures",
      courseUrl:
        "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      description:
        "Master coding interviews by learning essential computer science concepts in JavaScript.",
    },
    {
      id: 4,
      courseName: "Python for Everybody",
      courseUrl: "https://www.coursera.org/specializations/python",
      description:
        "A comprehensive course to learn Python programming, covering data structures, web scraping, and databases.",
    },
    {
      id: 5,
      courseName: "Introduction to Computer Science",
      courseUrl: "https://cs50.harvard.edu/x/",
      description:
        "Harvard's legendary CS50 course introduces the basics of computer science and programming.",
    },
    {
      id: 6,
      courseName: "Full Stack Open",
      courseUrl: "https://fullstackopen.com/en/",
      description:
        "Learn modern web development with React, Redux, Node.js, MongoDB, GraphQL, and TypeScript.",
    },
    {
      id: 7,
      courseName: "Android App Development Masterclass",
      courseUrl:
        "https://www.udemy.com/course/android-oreo-kotlin-app-masterclass/",
      description:
        "Build fully functional Android apps using Kotlin, the modern programming language for Android development.",
    },
    {
      id: 8,
      courseName: "AWS Certified Solutions Architect - Associate",
      courseUrl:
        "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
      description:
        "Prepare for the AWS Solutions Architect certification with hands-on AWS cloud training.",
    },
    {
      id: 9,
      courseName: "Data Science and Machine Learning Bootcamp",
      courseUrl:
        "https://www.udemy.com/course/data-science-and-machine-learning-bootcamp-with-r/",
      description:
        "Master data science and machine learning techniques using R programming.",
    },
    {
      id: 10,
      courseName: "The Complete JavaScript Course 2024",
      courseUrl: "https://www.udemy.com/course/the-complete-javascript-course/",
      description:
        "Learn modern JavaScript from basics to advanced concepts, including ES6, OOP, and Asynchronous JavaScript.",
    },
    {
      id: 11,
      courseName: "Kubernetes for the Absolute Beginners",
      courseUrl:
        "https://www.udemy.com/course/kubernetes-for-the-absolute-beginners-hands-on/",
      description:
        "Learn Kubernetes fundamentals and start managing containerized applications.",
    },
    {
      id: 12,
      courseName: "Cybersecurity Fundamentals",
      courseUrl: "https://www.coursera.org/learn/cyber-security-fundamentals",
      description:
        "Understand the basics of cybersecurity, including network security, cryptography, and threat analysis.",
    },
    {
      id: 13,
      courseName: "Blockchain and Cryptocurrency Explained",
      courseUrl:
        "https://www.udemy.com/course/blockchain-and-cryptocurrency-explained/",
      description:
        "Gain insights into the blockchain ecosystem, cryptocurrency technology, and use cases.",
    }
  ]);

  return (
    <main>
      <div className="mt-32">
        <h1 className="text-3xl font-semibold text-center my-8">
          Suggested Courses Based on Your Resume....
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <Footer/>
      </div>
    </main>
  );
}

export default Courses;
