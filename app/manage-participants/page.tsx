"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AppState } from "@/types";

export default function ManageParticipants() {
  const [appState, setAppState] = useLocalStorage<AppState>("buddy-capture-data", {
    participants: [],
    assignments: {},
  });
  const [nameInput, setNameInput] = useState("");
  const [tempParticipants, setTempParticipants] = useState<string[]>([]);

  useEffect(() => {
    setTempParticipants(appState.participants);
  }, [appState.participants]);

  const handleAddName = () => {
    const trimmedName = nameInput.trim();
    if (trimmedName && !tempParticipants.includes(trimmedName)) {
      setTempParticipants([...tempParticipants, trimmedName]);
      setNameInput("");
    }
  };

  const handleRemoveName = (name: string) => {
    setTempParticipants(tempParticipants.filter((n) => n !== name));
  };

  const handleSaveAll = () => {
    setAppState({
      participants: tempParticipants,
      assignments: {},
    });
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all participants?")) {
      setTempParticipants([]);
      setAppState({
        participants: [],
        assignments: {},
      });
    }
  };

  const hasChanges =
    JSON.stringify(tempParticipants) !== JSON.stringify(appState.participants);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              👥 Manage Participants
            </h1>
            <Link
              href="/"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back
            </Link>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Add Participant Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddName()}
                placeholder="Enter name..."
                className="flex-1 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleAddName}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Participants ({tempParticipants.length})
            </h2>
            {tempParticipants.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No participants yet. Add some names above!
              </p>
            ) : (
              <div className="space-y-2">
                {tempParticipants.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-800">{name}</span>
                    <button
                      onClick={() => handleRemoveName(name)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveAll}
              disabled={!hasChanges || tempParticipants.length === 0}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Save All
            </button>
            <button
              onClick={handleClearAll}
              disabled={tempParticipants.length === 0}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Clear All
            </button>
          </div>

          {hasChanges && tempParticipants.length > 0 && (
            <p className="text-sm text-amber-600 mt-4 text-center">
              ⚠️ You have unsaved changes. Click &quot;Save All&quot; to save.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
