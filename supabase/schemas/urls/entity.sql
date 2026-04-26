create table if not exists public.urls (
  id uuid primary key default gen_random_uuid(),
  long_url text not null,
  clicks int default 0 not null,
  profile_id uuid,
  created_at timestamp with time zone
  default NOW()
  not null,
  updated_at timestamp with time zone
  default NOW()
  not null,
  deleted_at timestamp with time zone,
  short_code text not null unique
);

alter table public.urls
  owner to postgres,
  add constraint "fk_urls_profile_id"
  foreign key
  (profile_id)
  references public.profiles (id)
  on DELETE cascade
  not valid,
  validate constraint fk_urls_profile_id,
  enable row level security;

create index "idx_urls_short_code" on public.urls using btree (short_code);

create index "idx_urls_profile_id" on public.urls using btree (profile_id);
