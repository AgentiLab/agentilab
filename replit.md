# AgentiLab.ai - AI Development Portfolio Website

## Overview

AgentiLab.ai is a full-stack React application showcasing an AI development firm's portfolio. It features a modern, dark-mode-first design, a comprehensive blog, and an admin dashboard for content management. Key capabilities include:

-   **AI-driven Project Showcase**: Highlights innovative AI tools across messaging, creative, and security domains.
-   **Admin System**: Password-protected dashboard for managing projects and blog posts, including screenshot capture for live URLs.
-   **Legal Compliance**: Integrated Terms of Use, Privacy Policy, and a GDPR-compliant, customizable cookie consent system.
-   **Enhanced AI Assistant ("Agenti")**: Powered by OpenAI GPT-4o-mini, providing real-time streaming responses with markdown, automatic project detection, and interactive project cards directly within the chat interface.
-   **User Authentication**: SQL-based user authentication with username/password, JWT-based password reset, and a client dashboard.
-   **OpenRouter Chatbot**: Integrated chatbot in the client dashboard with access to 400+ AI models via OpenRouter API, featuring conversation management, streaming responses with markdown support, persistent chat history, and usage statistics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

-   **Framework**: React 18 with TypeScript, Vite for bundling.
-   **UI/UX**: `shadcn/ui` with Radix UI, Tailwind CSS for styling, Framer Motion for animations. Dark mode-first design with a refined color palette and custom typography (Space Grotesk, Inter, JetBrains Mono).
-   **State Management**: TanStack Query for server state, React Hook Form with Zod for form validation.
-   **Routing**: Lightweight client-side routing using Wouter.
-   **Legal & Compliance**: Dedicated pages for Terms of Use and Privacy Policy, and a GDPR-compliant cookie consent system with granular controls.
-   **AI Assistant**: Agenti assistant with a sharp, responsive UI, markdown rendering, intelligent project detection with interactive `ProjectMiniCard` components, and SSE for real-time streaming.

### Backend Architecture

-   **Server**: Express.js with TypeScript, RESTful API design.
-   **Data Storage**: PostgreSQL with Drizzle ORM for projects, blog posts, contacts, user data, conversations, and messages. Serial IDs for users, conversations, and messages; slug-based routing for content.
-   **API Endpoints**: Public endpoints for content retrieval and contact forms; protected admin endpoints for CRUD operations on projects and blog posts, and screenshot capture. User authentication endpoints for signup, login, logout, profile management, and password reset. Chatbot endpoints for conversation management, message streaming, model selection, and statistics.
-   **Authentication**: `express-session` for server-side sessions, `bcryptjs` for password hashing, JWT-based password reset mechanism for users.
-   **Screenshot Capture**: Integration with Thum.io API for automatic screenshot generation of live project URLs, managed via the admin dashboard.

### Design System Implementation

-   **Color System**: CSS custom properties with HSL-based definitions, semantic color tokens, and an elevation system.
-   **Component Styling**: Class Variance Authority (CVA) for variants, Tailwind Merge for class composition, consistent spacing and `border-radius`.
-   **Responsive Design**: Mobile-first approach with custom breakpoints and adaptive navigation.

### Project Structure

-   **Monorepo**: `/client` (React frontend), `/server` (Express backend), `/shared` (common type definitions and Zod schemas).
-   **Code Organization**: Clear separation of UI components, feature components, and page-level routes.

### Development Experience

-   **Tooling**: TypeScript strict mode, ESM modules, Vite HMR, esbuild for server bundling, Replit-specific plugins.

## External Dependencies

### UI & Component Libraries

-   **Radix UI**: Accessible UI primitives.
-   **shadcn/ui**: Styled components based on Radix UI.
-   **Framer Motion**: Animation library.
-   **Embla Carousel**: Carousel component.
-   **Lucide React**, **React Icons**: Icon libraries.

### Form & Validation

-   **React Hook Form**: Form state management.
-   **Zod**: TypeScript-first schema validation.
-   **@hookform/resolvers**: Zod integration for React Hook Form.
-   **drizzle-zod**: Zod schema generation from Drizzle ORM.

### Data Fetching & State

-   **TanStack Query**: Server state management.
-   **date-fns**: Date utilities.

### Styling

-   **Tailwind CSS**: Utility-first CSS framework.
-   **tailwind-merge**, **class-variance-authority**, **clsx**: Utilities for styling.

### Database & ORM

-   **Drizzle ORM**: Type-safe database queries.
-   **@neondatabase/serverless**: Neon PostgreSQL driver.
-   **drizzle-kit**: Migrations and schema management.

### Routing

-   **Wouter**: Lightweight client-side router.

### Development Tools

-   **Vite**: Frontend build tool.
-   **esbuild**: Server-side bundler.
-   **tsx**: TypeScript execution.
-   **@replit/vite-plugin-\***: Replit-specific plugins.

### Utilities

-   **cmdk**: Command menu.
-   **nanoid**: Unique ID generator.
-   **zod-validation-error**: Improved Zod error messages.

### AI Integration

-   **OpenAI GPT-4o-mini**: For the Agenti AI assistant.