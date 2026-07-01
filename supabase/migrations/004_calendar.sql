-- Migration 004: Calendar Events

create table public.calendar_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  description text,
  life_area   text,
  event_date  date not null,
  start_time  time,
  end_time    time,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

-- Indexes
create index calendar_events_user_date_idx on public.calendar_events(user_id, event_date) where deleted_at is null;

-- RLS
alter table public.calendar_events enable row level security;

create policy "calendar_events: own rows" on public.calendar_events using (auth.uid() = user_id);
create policy "calendar_events: insert"   on public.calendar_events for insert with check (auth.uid() = user_id);
create policy "calendar_events: update"   on public.calendar_events for update using (auth.uid() = user_id);
create policy "calendar_events: delete"   on public.calendar_events for delete using (auth.uid() = user_id);

create trigger calendar_events_updated_at before update on public.calendar_events
  for each row execute function public.handle_updated_at();
