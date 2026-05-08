-- Marigold initial schema. RLS-on by default, all rows scoped to the user.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  name        text,
  stage       text check (stage in ('ttc','pregnant','postpartum')) default 'pregnant',
  week        smallint default 1 check (week between 1 and 45),
  conditions  text[] default '{}',
  country     text default 'United Kingdom',
  partner_email text,
  created_at  timestamptz default now()
);

create table if not exists public.journal_entries (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  week        smallint not null,
  name        text not null,
  label       text,
  hue         text,
  verdict     text check (verdict in ('safe','caution','avoid')) not null,
  when_text   text,
  body        text,
  source      jsonb default '{}',
  created_at  timestamptz default now()
);
create index if not exists journal_entries_user_idx on public.journal_entries(user_id, week desc, created_at desc);

create table if not exists public.partner_links (
  id          uuid primary key default gen_random_uuid(),
  inviter_id  uuid references auth.users on delete cascade,
  invitee_email text,
  token       text unique,
  status      text check (status in ('pending','accepted','revoked')) default 'pending',
  created_at  timestamptz default now()
);

create table if not exists public.reminders (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users on delete cascade,
  kind        text not null,
  title       text not null,
  sub         text,
  due_at      timestamptz,
  done        boolean default false
);

-- Row-level security ----------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.journal_entries enable row level security;
alter table public.partner_links enable row level security;
alter table public.reminders enable row level security;

create policy "profile owner" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "journal owner" on public.journal_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "partner owner" on public.partner_links
  for all using (auth.uid() = inviter_id) with check (auth.uid() = inviter_id);
create policy "reminders owner" on public.reminders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a profile on signup --------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Friend'));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
