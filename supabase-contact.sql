create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

grant usage on schema public to anon;
grant insert on public.contact_messages to anon;

drop policy if exists "Allow public contact inserts" on public.contact_messages;

create policy "Allow public contact inserts"
on public.contact_messages
for insert
to anon
with check (
  length(trim(name)) between 2 and 120
  and length(trim(email)) between 5 and 254
  and position('@' in email) > 1
  and position('.' in split_part(email, '@', 2)) > 1
  and length(trim(message)) between 10 and 4000
);
