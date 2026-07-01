-- Migration 006: Reading

create table public.books (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  author      text,
  total_pages int check (total_pages > 0),
  status      text not null default 'want-to-read'
    check (status in ('want-to-read','reading','finished','abandoned')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create table public.reading_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  book_id      uuid not null references public.books(id) on delete cascade,
  pages_read   int not null check (pages_read > 0),
  session_date date not null,
  note         text,
  created_at   timestamptz not null default now()
);

-- Indexes
create index books_user_id_idx    on public.books(user_id) where deleted_at is null;
create index books_status_idx     on public.books(user_id, status) where deleted_at is null;
create index reading_sessions_book_idx on public.reading_sessions(book_id, session_date);
create index reading_sessions_user_idx on public.reading_sessions(user_id, session_date);

-- RLS
alter table public.books           enable row level security;
alter table public.reading_sessions enable row level security;

create policy "books: own rows" on public.books using (auth.uid() = user_id);
create policy "books: insert"   on public.books for insert with check (auth.uid() = user_id);
create policy "books: update"   on public.books for update using (auth.uid() = user_id);
create policy "books: delete"   on public.books for delete using (auth.uid() = user_id);

create policy "reading_sessions: own rows" on public.reading_sessions using (auth.uid() = user_id);
create policy "reading_sessions: insert"   on public.reading_sessions for insert with check (auth.uid() = user_id);
create policy "reading_sessions: delete"   on public.reading_sessions for delete using (auth.uid() = user_id);

create trigger books_updated_at before update on public.books
  for each row execute function public.handle_updated_at();
