-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Authors Table
create table public.authors (
  id uuid not null default uuid_generate_v4(),
  name text not null,
  role text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now(),
  constraint authors_pkey primary key (id)
);

-- 2. Categories Table
create table public.categories (
  id uuid not null default uuid_generate_v4(),
  name text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_slug_key unique (slug)
);

-- 3. Posts Table
create table public.posts (
  id uuid not null default uuid_generate_v4(),
  title text not null,
  slug text not null,
  excerpt text,
  content text,
  cover_image_url text,
  published_at timestamptz,
  author_id uuid references public.authors(id),
  category_id uuid references public.categories(id),
  read_time text,
  is_featured boolean default false,
  created_at timestamptz not null default now(),
  constraint posts_pkey primary key (id),
  constraint posts_slug_key unique (slug)
);

-- Enable Row Level Security (RLS)
alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;

-- RLS Policies (Public Read, Admin Write)
-- Authors
create policy "Public authors are viewable by everyone." on public.authors for select using (true);
create policy "Users can insert their own authors." on public.authors for insert with check (auth.role() = 'authenticated');
create policy "Users can update their own authors." on public.authors for update using (auth.role() = 'authenticated');

-- Categories
create policy "Public categories are viewable by everyone." on public.categories for select using (true);
create policy "Authenticated users can insert categories." on public.categories for insert with check (auth.role() = 'authenticated');

-- Posts
create policy "Public posts are viewable by everyone." on public.posts for select using (true);
create policy "Authenticated users can insert posts." on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Authenticated users can update posts." on public.posts for update using (auth.role() = 'authenticated');

-- Storage Bucket (You need to create 'blog-assets' in the dashboard, but here is the policy idea)
-- insert into storage.buckets (id, name, public) values ('blog-assets', 'blog-assets', true);
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'blog-assets' );
-- create policy "Authenticated Insert" on storage.objects for insert with check ( bucket_id = 'blog-assets' and auth.role() = 'authenticated' );
