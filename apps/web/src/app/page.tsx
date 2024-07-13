"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="flex flex-grow flex-col items-center justify-center z-10 w-full max-w-5xl font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <Image
            src="/hiraishin.png"
            alt="Hiraishin"
            width={300}
            height={300}
          />
          <h1 className="text-3xl font-bold align-middle text-black">
            Hiraishin
          </h1>
          <p className="text-1xl font-bold text-center justify-center align-middle text-gray-500">
            Paws for points <br />
            Bringing Your Furry Friend Home
          </p>
          <Link href="/main">
            <button className="w-full p-3 text-white mt-10 bg-yellow-500 rounded-xl">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
