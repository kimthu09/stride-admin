"use client";
import "@/lib/styles/globals.css";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-[15vh] gap-16 w-full text-center py-10">
      <h1 className="text-3xl lg:text-4xl font-bold">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </h1>
    </div>
  );
};

export default NotFound;
