-- Migration 001: Foundation tables
-- profiles, user_settings, and new user trigger

create table public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  display_name text not null default '',
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.user_settings (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null unique references auth.users(id) on delete cascade,
  timezone              text not null default 'Europe/Warsaw',
  theme                 text not null default 'dark' check (theme in ('light','dark')),
  active_modules        text[] not null default array['goals','habits','calendar','wellness','reading','finance'],
  onboarding_completed  boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;

create policy "profiles: own row" on public.profiles
  using (auth.uid() = user_id);

create policy "profiles: insert own" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = user_id);

create policy "user_settings: own row" on public.user_settings
  using (auth.uid() = user_id);

create policy "user_settings: insert own" on public.user_settings
  for insert with check (auth.uid() = user_id);

create policy "user_settings: update own" on public.user_settings
  for update using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger user_settings_updated_at before update on public.user_settings
  for each row execute function public.handle_updated_at();

-- Auto-create profile + settings on new user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  insert into public.user_settings (user_id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
