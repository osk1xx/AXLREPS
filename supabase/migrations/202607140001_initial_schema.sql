create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  link text not null,
  price_cny numeric,
  image_url text,
  category text,
  brand_id uuid,
  category_id uuid,
  badge text,
  is_draft boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sellers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  photo_url text,
  best_for_brand text,
  rating numeric not null default 1 check (rating >= 1 and rating <= 10),
  bio jsonb not null default '{}'::jsonb,
  product_photos jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.tutorials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  cover_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.tutorial_steps (
  id uuid primary key default gen_random_uuid(),
  tutorial_id uuid not null references public.tutorials(id) on delete cascade,
  step_index integer not null,
  title jsonb not null default '{}'::jsonb,
  body jsonb not null default '{}'::jsonb,
  image_urls jsonb not null default '[]'::jsonb,
  buttons jsonb not null default '[]'::jsonb,
  unique (tutorial_id, step_index)
);

create table if not exists public.site_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_sessions (
  token text primary key,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

grant select on public.products, public.sellers, public.tutorials,
  public.tutorial_steps, public.site_config to anon, authenticated;
grant all on public.products, public.sellers, public.tutorials,
  public.tutorial_steps, public.site_config, public.admin_sessions to service_role;

alter table public.products enable row level security;
alter table public.sellers enable row level security;
alter table public.tutorials enable row level security;
alter table public.tutorial_steps enable row level security;
alter table public.site_config enable row level security;
alter table public.admin_sessions enable row level security;

drop policy if exists "Public products" on public.products;
create policy "Public products" on public.products
  for select to anon, authenticated using (is_draft = false);

drop policy if exists "Public sellers" on public.sellers;
create policy "Public sellers" on public.sellers
  for select to anon, authenticated using (true);

drop policy if exists "Public tutorials" on public.tutorials;
create policy "Public tutorials" on public.tutorials
  for select to anon, authenticated using (is_published = true);

drop policy if exists "Public tutorial steps" on public.tutorial_steps;
create policy "Public tutorial steps" on public.tutorial_steps
  for select to anon, authenticated using (
    exists (
      select 1 from public.tutorials
      where tutorials.id = tutorial_steps.tutorial_id
        and tutorials.is_published = true
    )
  );

drop policy if exists "Public site config" on public.site_config;
create policy "Public site config" on public.site_config
  for select to anon, authenticated using (true);

create index if not exists products_created_at_idx on public.products(created_at desc);
create index if not exists sellers_rating_idx on public.sellers(rating desc);
create index if not exists tutorials_created_at_idx on public.tutorials(created_at desc);
create index if not exists tutorial_steps_tutorial_idx
  on public.tutorial_steps(tutorial_id, step_index);
