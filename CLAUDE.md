# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Buddy Capture** - A Next.js web application for managing Secret Santa / buddy gift exchanges for New Year celebrations. The app allows users to add participants, generate random buddy assignments, and reveal assignments one at a time while maintaining consistency.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **State Management**: React hooks + localStorage
- **Node Version**: 18.17.1 (or higher)

## Architecture

### Project Structure

```
app/
├── page.tsx                    # Landing page with menu options
├── layout.tsx                  # Root layout with Inter font
├── globals.css                 # Global styles and Tailwind directives
├── manage-participants/
│   └── page.tsx               # Add/remove participant names
└── buddy-selection/
    └── page.tsx               # Select person and reveal buddy

lib/
├── buddy-algorithm.ts         # Cycle-based derangement algorithm
└── storage.ts                 # localStorage utilities (SSR-safe)

hooks/
└── useLocalStorage.ts         # Custom hook for persisting state

types/
└── index.ts                   # TypeScript type definitions

components/ui/                  # Reusable UI components (currently empty)
```

### Key Features

1. **Participant Management** (`/manage-participants`)
   - Add names one at a time to a temporary list
   - Remove individual names from the list
   - Save all names at once (clears previous assignments)
   - Clear all participants with confirmation

2. **Buddy Selection** (`/buddy-selection`)
   - Select a person from a dropdown
   - Reveal their assigned buddy (generates assignments on first reveal)
   - Consistent results - same person always sees the same buddy
   - Clear selection to allow next person to check
   - Reset all assignments to generate new matching

3. **Data Persistence**
   - All data stored in localStorage under key `buddy-capture-data`
   - SSR-safe implementation (checks for `window` object)
   - State structure: `{ participants: string[], assignments: { [giver: string]: string } }`

### Algorithm Implementation

The buddy matching uses a **cycle-based derangement algorithm** (`lib/buddy-algorithm.ts`):

1. Shuffle the participants array using Fisher-Yates shuffle
2. Create a cycle where each person → next person in shuffled array
3. Last person → first person (completes the cycle)
4. Guarantees:
   - No one gets themselves as their buddy
   - Everyone is assigned exactly one buddy
   - Everyone receives exactly one gift
   - Deterministic once generated (persisted in localStorage)

### Best Practices Applied

- **SSR Safety**: All localStorage access wrapped in `typeof window !== "undefined"` checks
- **Type Safety**: Full TypeScript coverage with explicit types
- **Component Structure**: Client components marked with `"use client"` directive
- **State Management**: Local state with localStorage persistence (no external state library needed)
- **User Experience**: Confirmation dialogs for destructive actions, visual feedback for state changes
- **Responsive Design**: Tailwind utility classes for mobile-first responsive layouts
- **Code Organization**: Clear separation of concerns (algorithm, storage, UI, types)

## Development Notes

- The app requires at least 2 participants to generate buddy assignments
- Saving participants from the management page clears all previous assignments
- Assignments are generated lazily on first reveal, not when participants are saved
- The cycle algorithm ensures valid matching even with 2 participants
- All pages are statically generated at build time (no API routes needed)
