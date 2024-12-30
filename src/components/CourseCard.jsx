import { CardSpotlight } from "@/components/ui/card-spotlight";

export function CourseCard({ course }) {
  return (
    <CardSpotlight className="h-96 w-96">
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        {course.courseName}
      </p>
      <div className="text-neutral-200 mt-4 relative z-20">
        {course.description}
      </div>
      <div className="mt-4 relative z-20">
        <a
          href={course.courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
           Go to Course →
        </a>
      </div>
    </CardSpotlight>
  );
}
