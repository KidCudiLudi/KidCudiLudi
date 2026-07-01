-- Migration 007: Finance

create table public.expense_categories (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  emoji      text not null default '📦',
  color      text not null default '#94a3b8',
  created_at timestamptz not null default now()
);

create table public.transactions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  category_id      uuid references public.expense_categories(id) on delete set null,
  amount           numeric(12,2) not null check (amount > 0),
  type             text not null check (type in ('income','expense')),
  description      text,
  transaction_date date not null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz
);

-- Indexes
create index expense_categories_user_idx on public.expense_categories(user_id);
create index transactions_user_date_idx  on public.transactions(user_id, transaction_date) where deleted_at is null;
create index transactions_category_idx   on public.transactions(category_id) where deleted_at is null;

-- RLS
alter table public.expense_categories enable row level security;
alter table public.transactions        enable row level security;

create policy "expense_categories: own rows" on public.expense_categories using (auth.uid() = user_id);
create policy "expense_categories: insert"   on public.expense_categories for insert with check (auth.uid() = user_id);
create policy "expense_categories: update"   on public.expense_categories for update using (auth.uid() = user_id);
create policy "expense_categories: delete"   on public.expense_categories for delete using (auth.uid() = user_id);

create policy "transactions: own rows" on public.transactions using (auth.uid() = user_id);
create policy "transactions: insert"   on public.transactions for insert with check (auth.uid() = user_id);
create policy "transactions: update"   on public.transactions for update using (auth.uid() = user_id);
create policy "transactions: delete"   on public.transactions for delete using (auth.uid() = user_id);

create trigger transactions_updated_at before update on public.transactions
  for each row execute function public.handle_updated_at();

-- Seed default categories for new users
create or replace function public.seed_expense_categories(p_user_id uuid)
returns void language plpgsql security definer as $$
begin
  insert into public.expense_categories (user_id, name, emoji, color) values
    (p_user_id, 'Jedzenie',    '🍕', '#fb923c'),
    (p_user_id, 'Transport',   '🚗', '#60a5fa'),
    (p_user_id, 'Zdrowie',     '💊', '#4ade80'),
    (p_user_id, 'Rozrywka',    '🎬', '#a78bfa'),
    (p_user_id, 'Rachunki',    '📄', '#f87171'),
    (p_user_id, 'Zakupy',      '🛍️', '#facc15'),
    (p_user_id, 'Inne',        '📦', '#94a3b8');
end;
$$;

-- Call seed on new user creation (update existing trigger)
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
  perform public.seed_expense_categories(new.id);
  return new;
end;
$$;
