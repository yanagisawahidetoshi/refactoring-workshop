# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational Next.js application for a refactoring workshop focused on "Library Abstraction and Dependency Inversion Principle". The application demonstrates common anti-patterns for learning purposes.

## Project Purpose

This Next.js application is designed to demonstrate:
- Direct usage of external libraries (axios, date-fns, MUI)
- Tightly coupled components
- Opportunities for applying dependency inversion principle
- Library abstraction patterns

## Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## File Structure

The Next.js App Router structure:
- `app/types/` - Type definitions for User and Post
- `app/api/` - API route handlers with mock data
- `app/components/` - React components (UserProfile, PostList)
- `app/page.tsx` - Dashboard page component
- `app/layout.tsx` - Root layout with MUI theme provider
- `app/theme.ts` - MUI theme configuration

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios (directly used)
- **Date Library**: date-fns (directly used)

## Educational Context

This code intentionally demonstrates anti-patterns for teaching purposes:
1. Direct library dependencies in components
2. Business logic mixed with presentation logic
3. Duplicated error handling and loading states
4. No abstraction layers for external dependencies

When working with this code, consider it as a starting point for refactoring exercises rather than production code.