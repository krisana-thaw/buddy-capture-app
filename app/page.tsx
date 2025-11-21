"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              🎁 Buddy Capture
            </h1>
            <p className="text-lg text-gray-600">
              New Year&apos;s Gift Exchange Made Easy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/manage-participants"
              className="group block p-8 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-white">
                <div className="text-4xl mb-4">👥</div>
                <h2 className="text-2xl font-bold mb-2">
                  Manage Participants
                </h2>
                <p className="text-purple-100">
                  Add or remove names from your gift exchange list
                </p>
              </div>
            </Link>

            <Link
              href="/buddy-selection"
              className="group block p-8 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <div className="text-white">
                <div className="text-4xl mb-4">🎲</div>
                <h2 className="text-2xl font-bold mb-2">
                  Select Your Buddy
                </h2>
                <p className="text-pink-100">
                  Reveal your Secret Santa buddy assignment
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
