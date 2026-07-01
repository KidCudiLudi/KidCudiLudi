-- Migration 003: Habits

create table public.habits (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  title      text not null,
  life_area  text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.habit_completions (
  id             uuid primary key default gen_random_uuid(),
  habit_id       uuid not null references public.habits(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  completed_date date not null,
  created_at     timestamptz not null default now(),
  unique(habit_id, completed_date)
);

-- Indexes
create index habits_user_id_idx on public.habits(user_id) where deleted_at is null;
create index habit_completions_habit_idx on public.habit_completions(habit_id, completed_date);
create index habit_completions_user_idx  on public.habit_completions(user_id, completed_date);

-- RLS
alter table public.habits enable row level security;
alter table public.habit_completions enable row level security;

create policy "habits: own rows" on public.habits using (auth.uid() = user_id);
create policy "habits: insert"   on public.habits for insert with check (auth.uid() = user_id);
create policy "habits: update"   on public.habits for update using (auth.uid() = user_id);
create policy "habits: delete"   on public.habits for delete using (auth.uid() = user_id);

create policy "habit_completions: own rows" on public.habit_completions using (auth.uid() = user_id);
create policy "habit_completions: insert"   on public.habit_completions for insert with check (auth.uid() = user_id);
create policy "habit_completions: delete"   on public.habit_completions for delete using (auth.uid() = user_id);

create trigger habits_updated_at before update on public.habits
  for each row execute function public.handle_updated_at();
