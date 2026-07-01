-- Migration 005: Wellness (weight, mood, sleep)

create table public.weight_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  weight      numeric(5,2) not null check (weight > 0),
  logged_date date not null,
  created_at  timestamptz not null default now(),
  unique(user_id, logged_date)
);

create table public.mood_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  mood        int not null check (mood between 1 and 5),
  note        text,
  logged_date date not null,
  created_at  timestamptz not null default now(),
  unique(user_id, logged_date)
);

create table public.sleep_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  hours       numeric(4,1) not null check (hours >= 0 and hours <= 24),
  quality     int not null check (quality between 1 and 5),
  logged_date date not null,
  created_at  timestamptz not null default now(),
  unique(user_id, logged_date)
);

-- Indexes
create index weight_logs_user_date_idx on public.weight_logs(user_id, logged_date);
create index mood_logs_user_date_idx   on public.mood_logs(user_id, logged_date);
create index sleep_logs_user_date_idx  on public.sleep_logs(user_id, logged_date);

-- RLS
alter table public.weight_logs enable row level security;
alter table public.mood_logs   enable row level security;
alter table public.sleep_logs  enable row level security;

create policy "weight_logs: own rows" on public.weight_logs using (auth.uid() = user_id);
create policy "weight_logs: insert"   on public.weight_logs for insert with check (auth.uid() = user_id);
create policy "weight_logs: update"   on public.weight_logs for update using (auth.uid() = user_id);
create policy "weight_logs: delete"   on public.weight_logs for delete using (auth.uid() = user_id);

create policy "mood_logs: own rows" on public.mood_logs using (auth.uid() = user_id);
create policy "mood_logs: insert"   on public.mood_logs for insert with check (auth.uid() = user_id);
create policy "mood_logs: update"   on public.mood_logs for update using (auth.uid() = user_id);
create policy "mood_logs: delete"   on public.mood_logs for delete using (auth.uid() = user_id);

create policy "sleep_logs: own rows" on public.sleep_logs using (auth.uid() = user_id);
create policy "sleep_logs: insert"   on public.sleep_logs for insert with check (auth.uid() = user_id);
create policy "sleep_logs: update"   on public.sleep_logs for update using (auth.uid() = user_id);
create policy "sleep_logs: delete"   on public.sleep_logs for delete using (auth.uid() = user_id);
