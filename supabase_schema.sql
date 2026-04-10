-- ─────────────────────────────────────────────────────────────────────────────
-- VirtusReport — Supabase Database Schema
-- Run this in your Supabase project: Dashboard → SQL Editor → New Query
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension (usually already enabled)
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────────────────────
-- Extends Supabase Auth users with display name
create table if not exists public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text,
  created_at    timestamptz default now()
);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Comments ─────────────────────────────────────────────────────────────────
create table if not exists public.comments (
  id            uuid default uuid_generate_v4() primary key,
  article_slug  text        not null,
  user_id       uuid references auth.users(id) on delete cascade not null,
  content       text        not null check (char_length(content) between 1 and 1000),
  created_at    timestamptz default now()
);

create index if not exists idx_comments_article on public.comments (article_slug);
create index if not exists idx_comments_user    on public.comments (user_id);

-- RLS
alter table public.comments enable row level security;

create policy "Comments are publicly readable"
  on public.comments for select using (true);

create policy "Authenticated users can insert comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- ─── Article Likes ────────────────────────────────────────────────────────────
create table if not exists public.article_likes (
  id            uuid default uuid_generate_v4() primary key,
  article_slug  text not null,
  user_id       uuid references auth.users(id) on delete cascade not null,
  created_at    timestamptz default now(),
  unique (article_slug, user_id)   -- one like per user per article
);

create index if not exists idx_likes_article on public.article_likes (article_slug);

alter table public.article_likes enable row level security;

create policy "Likes are publicly readable"
  on public.article_likes for select using (true);

create policy "Authenticated users can like"
  on public.article_likes for insert
  with check (auth.uid() = user_id);

create policy "Users can unlike"
  on public.article_likes for delete
  using (auth.uid() = user_id);

-- ─── Newsletter subscribers ───────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id         uuid default uuid_generate_v4() primary key,
  email      text not null unique,
  locale     text not null default 'en',
  subscribed_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Only service role can read subscribers"
  on public.newsletter_subscribers for select
  using (auth.role() = 'service_role');

create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  with check (true);

-- ─── Verification ─────────────────────────────────────────────────────────────
select 'VirtusReport schema created successfully ✓' as result;
