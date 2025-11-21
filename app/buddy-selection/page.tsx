"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppState } from "@/types";
import { generateSingleBuddyAssignment } from "@/lib/buddy-algorithm";

export default function BuddySelection() {
  const [appState, setAppState] = useLocalStorage<AppState>("buddy-capture-data", {
    participants: [],
    assignments: {},
  });
  const [selectedPerson, setSelectedPerson] = useState("");
  const [revealedBuddy, setRevealedBuddy] = useState<string | null>(null);
  const [showBuddy, setShowBuddy] = useState(false);

  const handleSelectPerson = (person: string) => {
    setSelectedPerson(person);
    setRevealedBuddy(null);
    setShowBuddy(false);
  };

  const handleRevealBuddy = () => {
    if (!selectedPerson) return;

    if (appState.assignments[selectedPerson]) {
      setRevealedBuddy(appState.assignments[selectedPerson]);
      setShowBuddy(true);
    } else {
      const buddy = generateSingleBuddyAssignment(
        selectedPerson,
        appState.participants,
        appState.assignments
      );
      
      if (buddy) {
        const updatedState = {
          ...appState,
          assignments: {
            ...appState.assignments,
            [selectedPerson]: buddy,
          },
        };
        setAppState(updatedState);
        setRevealedBuddy(buddy);
        setShowBuddy(true);
      }
    }
  };

  const handleClearSelection = () => {
    setSelectedPerson("");
    setRevealedBuddy(null);
    setShowBuddy(false);
  };

  const handleResetAll = () => {
    if (confirm("Are you sure you want to reset all buddy assignments? This will generate new assignments.")) {
      setAppState({
        ...appState,
        assignments: {},
      });
      setSelectedPerson("");
      setRevealedBuddy(null);
      setShowBuddy(false);
    }
  };

  if (appState.participants.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                🎲 Select Your Buddy
              </h1>
              <Link
                href="/"
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                ← Back
              </Link>
            </div>
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">
                You need at least 2 participants to start the buddy selection.
              </p>
              <Link
                href="/manage-participants"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Add Participants
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              🎲 Select Your Buddy
            </h1>
            <Link
              href="/"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Back
            </Link>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Who are you?
            </label>
            <select
              value={selectedPerson}
              onChange={(e) => handleSelectPerson(e.target.value)}
              disabled={showBuddy}
              className="w-full text-gray-600 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none text-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">-- Select your name --</option>
              {appState.participants.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
          </div>

          {selectedPerson && !showBuddy && (
            <button
              onClick={handleRevealBuddy}
              className="w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 transition-all font-bold text-lg shadow-lg transform hover:scale-105"
            >
              🎁 Reveal Your Buddy
            </button>
          )}

          {showBuddy && revealedBuddy && (
            <div className="mt-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-8 text-center">
                <p className="text-lg text-gray-700 mb-3">
                  Your Secret Santa buddy is:
                </p>
                <p className="text-4xl font-bold text-green-700 mb-4">
                  {revealedBuddy}
                </p>
                <p className="text-sm text-gray-600">
                  🤫 Remember to keep it secret!
                </p>
              </div>

              <button
                onClick={handleClearSelection}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Selection
              </button>
            </div>
          )}

          {Object.keys(appState.assignments).length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleResetAll}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reset All Assignments
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                This will generate new buddy assignments for everyone
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
