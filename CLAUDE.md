Next.js Frontend Architecture and Coding Standards

This document defines the architectural patterns, coding standards, and conventions for our Next.js applications. Use these guidelines to ensure consistency, maintainability, and performance across the codebase.
1. Project Structure & Organization
We use the Next.js App Router within a src/ directory structure.
* src/app/: Contains routing logic, pages, and layouts.
    * Use folder-based routing.
    * Keep pages thin; delegate logic to components and server actions.
    * Use providers.tsx at the root to wrap the application in necessary React Contexts.
    * API routes live in src/app/api/.
* src/components/: Contains all React components, strictly organized by domain/feature.
    * Domain Folders: Group components by feature (e.g., feature-a/, feature-b/).
    * ui/ Folder: Reserved exclusively for generic, reusable, stateless UI primitives (e.g., buttons, inputs, cards).
* src/actions/: Dedicated directory for Next.js Server Actions. Grouped by domain.
* src/lib/: Infrastructure initialization, third-party clients, and pure utility functions.
* src/types/: Global TypeScript interfaces and type definitions.
* src/test/: Test configuration and setup files.
2. Component Architecture
* Server vs. Client Components:
    * Default to Server Components for performance and SEO.
    * Use the "use client" directive strictly at the top of the file only when interactivity, hooks (e.g., useState, useEffect), or browser APIs are required.
    * Push Client Components as far down the component tree as possible (leaf nodes).
* Naming Conventions:
    * Use PascalCase for component file names (e.g., UserProfile.tsx) and component function names.
    * Use camelCase for utility files and server actions (e.g., utils.ts, auth.ts).
* Props & Interfaces:
    * Always define a TypeScript interface or type for component props.
    * Place the interface directly above the component definition.
    * Destructure props in the function signature.
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  isActive?: boolean;
}

export function Card({ title, children, isActive = false }: CardProps) {
  return (
    <div className={isActive ? 'active-class' : 'default-class'}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
3. Data Fetching & Server Actions
* Server Actions:
    * Place all server mutations in actions.
    * Include the "use server" directive at the top of the file.
    * Keep actions focused on a single domain entity.
* Revalidation & Loading States:
    * Use revalidatePath or revalidateTag inside Server Actions to update cached data after mutations.
    * Use dedicated Skeleton components (e.g., FeatureSkeleton.tsx) combined with React Suspense for loading states.
* Mutations:
    * Server actions should return a standardized response object, typically containing either the data or an error message.
"use server"

import { revalidatePath } from 'next/cache';

export async function updateEntity(id: string, data: any) {
  try {
    // DB mutation logic here
    revalidatePath('/relevant-path');
    return { success: true, data: updatedData };
  } catch (error) {
    return { success: false, error: 'Failed to update entity' };
  }
}
4. Infrastructure & Lib
* Initialization:
    * Initialize database clients, AI SDKs, and external services inside lib (e.g., db.ts).
    * Use the singleton pattern for database connections to prevent connection exhaustion during hot-reloading in development.
* Utilities:
    * Keep utility functions pure and side-effect free.
    * Use a utils.ts file for common helpers (e.g., classname merging for Tailwind).
5. Styling & UI
* Tailwind CSS & shadcn/ui:
    * Use Tailwind CSS via shadcn/ui for all styling.
    * Avoid custom CSS files unless absolutely necessary (e.g., globals.css for base layer resets and CSS variables).
* UI Library Pattern:
    * Follow a copy-paste UI component pattern (like shadcn/ui).
    * Keep base UI components in the ui folder. These should be highly reusable and agnostic to business logic.
* Responsive Design:
    * Always use Tailwind's mobile-first responsive prefixes (sm:, md:, lg:).
6. State Management
* Server State: Rely on Next.js Server Components and caching mechanisms as the primary source of truth.
* Global Client State: Use React Context (initialized in providers.tsx) for global client state (e.g., theme, user session).
* Local Client State: Use standard React hooks (useState, useReducer) for component-level state. Avoid heavy third-party state management libraries unless the application requires complex, high-frequency client-side updates.
7. Error Handling
* Server Actions:
    * Always wrap database calls and external API requests in try/catch blocks.
    * Never leak raw database errors to the client. Return generic, user-friendly error messages.
* UI Error Handling:
    * Use Next.js error.tsx boundaries for route-level errors.
    * For form submissions and server actions, handle the returned error object in the Client Component and display it using toast notifications or inline error text.
