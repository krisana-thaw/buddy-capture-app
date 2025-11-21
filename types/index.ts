export interface BuddyAssignment {
  [giver: string]: string;
}

export interface AppState {
  participants: string[];
  assignments: BuddyAssignment;
}
