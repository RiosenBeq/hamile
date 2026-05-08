-- Marigold tools schema. RLS-on by default, all rows scoped to auth.uid().

create table if not exists public.kicks (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  session_id  text not null,
  at          timestamptz not null default now()
);
create index if not exists kicks_user_session_idx on public.kicks(user_id, session_id, at);

create table if not exists public.contractions (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  started_at  timestamptz not null,
  ended_at    timestamptz not null,
  intensity   smallint check (intensity between 1 and 5)
);
create index if not exists contractions_user_idx on public.contractions(user_id, started_at desc);

create table if not exists public.weights (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  week        smallint not null check (week between 1 and 45),
  kg          numeric(5,2) not null check (kg > 0 and kg < 250),
  at          timestamptz not null default now(),
  note        text
);
create index if not exists weights_user_week_idx on public.weights(user_id, week);

create table if not exists public.symptoms (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  at          timestamptz not null default now(),
  week        smallint not null,
  mood        smallint check (mood between 1 and 5),
  nausea      smallint check (nausea between 0 and 3),
  sleep       smallint check (sleep between 1 and 5),
  cramps      smallint check (cramps between 0 and 3),
  energy      smallint check (energy between 1 and 5),
  note        text
);
create index if not exists symptoms_user_at_idx on public.symptoms(user_id, at desc);

create table if not exists public.bag_items (
  id          text primary key,
  user_id     uuid references auth.users on delete cascade,
  group_key   text check (group_key in ('labour','postBirth','baby','docs')),
  label       text not null,
  checked     boolean default false,
  position    smallint default 0,
  custom      boolean default false,
  updated_at  timestamptz default now()
);
create index if not exists bag_items_user_idx on public.bag_items(user_id, group_key, position);

create table if not exists public.birth_plan (
  user_id     uuid primary key references auth.users on delete cascade,
  fields      jsonb not null default '{}'::jsonb,
  updated_at  timestamptz default now()
);

-- RLS ------------------------------------------------------------------------
alter table public.kicks         enable row level security;
alter table public.contractions  enable row level security;
alter table public.weights       enable row level security;
alter table public.symptoms      enable row level security;
alter table public.bag_items     enable row level security;
alter table public.birth_plan    enable row level security;

create policy "kicks owner"        on public.kicks         for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "contractions owner" on public.contractions  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "weights owner"      on public.weights       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "symptoms owner"     on public.symptoms      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bag owner"          on public.bag_items     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "birthplan owner"    on public.birth_plan    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
