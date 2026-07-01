-- Migration 002: Goals and Tasks

create table public.goals (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  life_area   text,
  target_date date,
  status      text not null default 'active' check (status in ('active','completed','abandoned')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create table public.tasks (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users(id) on delete cascade,
  goal_id   uuid references public.goals(id) on delete set null,
  title     text not null,
  due_date  date,
  priority  text not null default 'medium' check (priority in ('low','medium','high')),
  status    text not null default 'todo' check (status in ('todo','done')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Indexes
create index goals_user_id_idx on public.goals(user_id) where deleted_at is null;
create index goals_status_idx  on public.goals(user_id, status) where deleted_at is null;
create index tasks_user_id_idx on public.tasks(user_id) where deleted_at is null;
create index tasks_due_date_idx on public.tasks(user_id, due_date) where deleted_at is null and status = 'todo';
create index tasks_goal_id_idx on public.tasks(goal_id) where deleted_at is null;

-- RLS
alter table public.goals enable row level security;
alter table public.tasks enable row level security;

create policy "goals: own rows" on public.goals using (auth.uid() = user_id);
create policy "goals: insert"   on public.goals for insert with check (auth.uid() = user_id);
create policy "goals: update"   on public.goals for update using (auth.uid() = user_id);
create policy "goals: delete"   on public.goals for delete using (auth.uid() = user_id);

create policy "tasks: own rows" on public.tasks using (auth.uid() = user_id);
create policy "tasks: insert"   on public.tasks for insert with check (auth.uid() = user_id);
create policy "tasks: update"   on public.tasks for update using (auth.uid() = user_id);
create policy "tasks: delete"   on public.tasks for delete using (auth.uid() = user_id);

create trigger goals_updated_at before update on public.goals
  for each row execute function public.handle_updated_at();

create trigger tasks_updated_at before update on public.tasks
  for each row execute function public.handle_updated_at();
