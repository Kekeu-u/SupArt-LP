# Supabase Integration Plan for SupArt Blog

## Overview
This document outlines the database schema and integration steps required to move the SupArt Blog from static mock data to a dynamic Supabase backend.

## 1. Database Schema

### Tables

#### `authors`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `name` | `text` | Full name |
| `role` | `text` | Job title (e.g., "CEO", "Editor") |
| `avatar_url` | `text` | URL to image in Storage |
| `bio` | `text` | Short biography |
| `created_at` | `timestamptz` | Default: `now()` |

#### `categories`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `name` | `text` | Display name (e.g., "Design", "AI") |
| `slug` | `text` | URL-friendly slug (unique) |
| `created_at` | `timestamptz` | Default: `now()` |

#### `posts`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `title` | `text` | Blog post title |
| `slug` | `text` | URL-friendly slug (unique) |
| `excerpt` | `text` | Short summary for cards |
| `content` | `text` | HTML or Markdown content |
| `cover_image_url` | `text` | URL to image in Storage |
| `published_at` | `timestamptz` | Publication date |
| `author_id` | `uuid` | FK to `authors.id` |
| `category_id` | `uuid` | FK to `categories.id` |
| `read_time` | `text` | Estimated read time (e.g., "5 min") |
| `is_featured` | `boolean` | Default: `false` |

## 2. Storage Buckets
- **`blog-assets`**: Public bucket for storing post cover images and author avatars.

## 3. Next.js Integration Steps

1.  **Install Client**: `npm install @supabase/supabase-js`
2.  **Environment Variables**:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```
3.  **Data Fetching**:
    - Replace `data/blog.ts` with Supabase queries.
    - Use `getStaticProps` (or `generateStaticParams` in App Router) for SSG, revalidating every hour (`revalidate: 3600`).

## 4. Migration Strategy
1.  Create tables in Supabase Dashboard or via SQL Editor.
2.  Upload current mock images to `blog-assets` bucket.
3.  Insert mock data from `data/blog.ts` into the tables as initial content.
4.  Update `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` to fetch data from Supabase.
