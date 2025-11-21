import { BuddyAssignment } from "@/types";

export function generateSingleBuddyAssignment(
  giver: string,
  participants: string[],
  existingAssignments: BuddyAssignment
): string | null {
  if (participants.length < 2) {
    return null;
  }

  const alreadyAssignedBuddies = Object.values(existingAssignments);
  
  const availableBuddies = participants.filter(
    (person) => person !== giver && !alreadyAssignedBuddies.includes(person)
  );

  if (availableBuddies.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableBuddies.length);
  return availableBuddies[randomIndex];
}

export function getBuddyForPerson(
  person: string,
  assignments: BuddyAssignment
): string | null {
  return assignments[person] || null;
}
