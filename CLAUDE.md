# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Architecture

This is a React + Vite frontend application for an integrated circuit design system.

### Core Technologies
- **React 18** with React Router v7 for routing
- **Ant Design** and Ant Design Pro Components for UI
- **Vite** as the build tool and dev server
- **ESLint** for linting (no TypeScript yet)

### Key Structure
- **Authentication**: Token-based auth stored in localStorage, with AuthProvider context
- **API Communication**: Custom request utilities in `src/service/request.jsx` handling JSON and URL-encoded requests, with automatic auth token injection
- **Routing**: Centralized route configuration in `src/module/layout/route.jsx`
- **API Proxy**: Development server proxies `/api` to `http://localhost:2526`

### Main Routes
- `/login` - Authentication page
- `/draw` - Circuit drawing canvas
- `/list` - Saved circuits list
- `/` - Redirects to `/draw`

### API Integration Pattern
- All API calls use the custom `request` wrapper
- Auth tokens are automatically added to headers
- `withMessage` wrapper provides automatic success/error notifications using Ant Design's message component
- API errors are handled with custom `ApiError` class