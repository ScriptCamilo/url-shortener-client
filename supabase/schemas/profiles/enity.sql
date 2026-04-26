create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone
  default NOW()
  not null,
  updated_at timestamp with time zone
  default NOW()
  not null
);

alter table public.profiles
  owner to postgres,
  add constraint "profiles_id_fkey"
  foreign key
  (id)
  references auth.users (id)
  on DELETE cascade
  not valid,
  validate constraint profiles_id_fkey,
  enable row level security;
