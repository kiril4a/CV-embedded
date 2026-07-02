create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Allow public contact inserts" on public.contact_messages;

create policy "Allow public contact inserts"
on public.contact_messages
for insert
to anon
with check (
  length(trim(name)) between 2 and 120
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and length(trim(message)) between 10 and 4000
);
