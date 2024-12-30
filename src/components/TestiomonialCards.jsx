"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const CareerTrackTestimonials = [
  {
    quote:
      "The career development program helped me transition smoothly into my new role. The personalized coaching and resume workshops were invaluable!",
    name: "Alex Johnson",
    title: "Software Engineer",
  },
  {
    quote:
      "The job placement services connected me with opportunities that matched my skills and career goals perfectly. The support was outstanding!",
    name: "Samantha Lee",
    title: "Data Analyst",
  },
  {
    quote:
      "The mentorship I received through this program gave me the confidence to pursue leadership roles. I am now thriving in a management position.",
    name: "Michael Chen",
    title: "Project Manager",
  },
  {
    quote:
      "Thanks to the career tracker’s networking events and workshops, I landed my dream job. The connections and insights provided were top-notch.",
    name: "Emily Taylor",
    title: "UI/UX Designer",
  },
  {
    quote:
      "The skill enhancement courses were a game-changer for my career. I learned new tools and techniques that have greatly boosted my job performance.",
    name: "Chris Morales",
    title: "Marketing Specialist",
  },
];


function Testimonials() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">
        Hear Our Success Stories: Careers in Tech
      </h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={CareerTrackTestimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
