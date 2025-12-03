import { BuddyAssignment } from "@/types";

/**
 * Fisher-Yates shuffle algorithm
 * Randomly shuffles an array in-place
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate ALL buddy assignments using a single-cycle derangement algorithm.
 *
 * How it works:
 * 1. Shuffle all participants randomly
 * 2. Create a single cycle: person[0] → person[1] → person[2] → ... → person[n-1] → person[0]
 *
 * This guarantees:
 * - No one gets themselves as their buddy
 * - Everyone is assigned exactly one buddy
 * - Everyone receives exactly one gift
 * - All participants are in ONE cycle (no small vortexes)
 */
export function generateAllBuddyAssignments(
  participants: string[]
): BuddyAssignment {
  if (participants.length < 2) {
    return {};
  }

  const shuffled = shuffleArray(participants);
  const assignments: BuddyAssignment = {};

  // Create single cycle: each person gives to the next person in the shuffled array
  // Last person gives to first person (completing the cycle)
  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i];
    const receiver = shuffled[(i + 1) % shuffled.length];
    assignments[giver] = receiver;
  }

  return assignments;
}

/**
 * Get the buddy assigned to a specific person
 */
export function getBuddyForPerson(
  person: string,
  assignments: BuddyAssignment
): string | null {
  return assignments[person] || null;
}
