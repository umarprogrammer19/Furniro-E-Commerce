# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Furniro is a Next.js 16 e-commerce frontend for furniture. It integrates with Sanity CMS for product management and a custom Java backend API for authentication, cart, and order management.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **CMS**: Sanity v5 with Structured Content
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Jotai (client-side), React Context (filter/search)
- **Payment**: Stripe integration (webhook structure in place)
- **Authentication**: Custom JWT backend API (separate from Next.js)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint
```

## Project Structure

### Route Groups

- **`(screens)`** - Main application pages with full layout (NavBar, Footer, SearchProvider, AuthWrapper)
  - Home (`/`), Shop (`/shop`), Blog (`/Blog`), Cart (`/cart`), Checkout (`/checkout`), Comparison (`/comparison`), Profile (`/profile`), Contact (`/contact`)
- **`(auth)`** - Authentication pages with minimal layout
  - `/login`, `/signup`
- **`studio/`** - Sanity Studio embedded at `/studio`
- **`payment/`** - Payment result pages (`/payment/success`, `/payment/cancel`)

### Key Directories

- `src/components/` - React components organized by purpose
  - `ui/` - shadcn/ui components (toaster, dialog, form, etc.)
  - `common/` - Shared components (NavBar, Hero, LoadingIndicator)
  - `sections/` - Page-specific section components
  - `cards/` - Card components (ProductCard)
  - `chatbot-ai/` - Kommunicate chatbot integration
- `src/lib/` - Utilities and service layer
  - `actions/` - Server Actions (payment, billing)
  - `api/` - API client configuration (auth, user, baseUrl)
  - `service/` - Generic API service layer (`makeApiCallService`)
  - `storage/jotai/` - Client state atoms (cart, billing)
- `src/sanity/` - Sanity CMS configuration and client
  - `schemaTypes/` - Product schema definition
  - `lib/` - Sanity client and image URL builder
- `src/context/` - React Context (FilterContext, SearchContext)
- `src/types/` - TypeScript type definitions (Cart, Product, etc.)

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (e.g., "production")
- `SECRET_API_TOKEN` - Sanity API token for write operations
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key (server-side)
- `NEXT_PUBLIC_KOMMUNICATE_APP_ID` - Kommunicate chatbot App ID

## Backend API Integration

The frontend communicates with a separate Java/Spring Boot API:

- **Base URL**: `http://localhost:8080` (dev), `https://api-uf-official-ecommerce.koyeb.app` (prod)
- **Defined in**: `src/lib/api/baseUrl.ts`

Key API modules:
- `src/lib/api/auth.ts` - Authentication (login, signup, token refresh)
- `src/lib/api/user.ts` - User profile operations

## Sanity CMS Configuration

- **Schema**: `src/sanity/schemaTypes/productSchema.ts` - Defines Product document with fields: title, description, imageUrl, price, tags, dicountPercentage, isNew, category
- **Studio Path**: `/studio` (embedded in Next.js)
- **Image URLs**: Use `urlFor()` from `src/sanity/lib/image.ts` to generate image URLs from Sanity assets

## State Management

- **Cart**: `cartAtom` in `src/lib/storage/jotai/index.ts` - persisted to localStorage
- **Billing**: `billingAtom` - persisted to localStorage
- **Filters**: `FilterContext` in `src/context/filterContext.tsx`
- **Search**: `SearchContext` in `src/context/searchContext.tsx`

## Payment Flow

- Stripe Checkout integration in `src/lib/actions/payment.ts`
- Server action `generateStripeCheckoutUrl()` creates Stripe sessions
- Webhook handling scaffolded but not fully implemented (`processStripeWehookEvent`)

## Authentication Pattern

- JWT tokens stored in HTTP-only cookies
- `AuthWrapper` component wraps `(screens)` layout and displays auth modal when needed
- Protected routes use middleware proxy (`src/proxy.ts`) for token verification
- Auth pages at `/login` and `/signup` use minimal layout

## Common Tasks

### Adding a New Sanity Schema

1. Create schema file in `src/sanity/schemaTypes/`
2. Export from `src/sanity/schemaTypes/index.ts`
3. Update structure in `src/sanity/structure.ts` if needed

### Adding a New API Endpoint

1. Add function to appropriate file in `src/lib/api/`
2. Use `makeApiCallService` from `src/lib/service/apiService.ts` for HTTP requests
3. Handle toast notifications for success/error states

### Adding a New Page

1. Determine route group: `(screens)` for main app, `(auth)` for auth pages
2. Create `page.tsx` in appropriate directory
3. For `(screens)`, layout automatically includes NavBar, Footer, providers

## Custom Colors (Tailwind)

Primary brand colors defined in `tailwind.config.ts`:
- `primary`: `#B88E2F` (gold/amber)
- `primary-light`: `#F9F1E7` (light cream)
- `customBlack`: `#333333`
- `customGray`: `#666666`
- `error`: `#E97171`
- `success`: `#2EC1AC`
- `myOrange`: `#B88E2F`
