import Link from "next/link";
import React from "react";

export default function notfound() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-svh w-svw bg-main-blue">
      <h1 className={`text-8xl font-bold text-dark-orange text-white`}>404</h1>
      <Link
        href="/"
        className={`px-6 py-2 bg-white text-main-blue font-semibold rounded transition-all active:scale-95`}
      >
        Go Home
      </Link>
    </div>
  );
}
