create table public.profiles (
  id uuid not null default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone
  not null
  default NOW(),
  updated_at timestamp with time zone
  not null
  default NOW()
);

create table public.urls (
  id uuid not null default gen_random_uuid(),
  long_url text not null,
  short_url text not null,
  clicks int not null default 0,
  profile_id uuid,
  created_at timestamp with time zone
  not null
  default NOW(),
  updated_at timestamp with time zone
  not null
  default NOW(),
  deleted_at timestamp with time zone
);

create index "idx_urls_profile_id" on public.urls using btree (profile_id);

create index "idx_urls_short_url" on public.urls using btree (short_url);

create unique index "profiles_pkey" on public.profiles using btree (id);

create unique index "urls_pkey" on public.urls using btree (id);

create unique index "urls_short_url_key" on public.urls using btree (short_url);

alter table public.profiles
  enable row level security,
  add constraint "profiles_pkey" primary key using index "profiles_pkey",
  add constraint "profiles_id_fkey"
  foreign key
  (id)
  references auth.users (id)
  on DELETE cascade
  not valid,
  validate constraint profiles_id_fkey;

alter table public.urls
  enable row level security,
  add constraint "urls_pkey" primary key using index "urls_pkey",
  add constraint "fk_urls_profile_id"
  foreign key
  (profile_id)
  references public.profiles (id)
  on DELETE cascade
  not valid,
  validate constraint fk_urls_profile_id,
  add constraint "urls_short_url_key" unique using index "urls_short_url_key";

grant DELETE on table public.profiles to anon;

grant INSERT on table public.profiles to anon;

grant REFERENCES on table public.profiles to anon;

grant SELECT on table public.profiles to anon;

grant TRIGGER on table public.profiles to anon;

grant TRUNCATE on table public.profiles to anon;

grant UPDATE on table public.profiles to anon;

grant DELETE on table public.profiles to authenticated;

grant INSERT on table public.profiles to authenticated;

grant REFERENCES on table public.profiles to authenticated;

grant SELECT on table public.profiles to authenticated;

grant TRIGGER on table public.profiles to authenticated;

grant TRUNCATE on table public.profiles to authenticated;

grant UPDATE on table public.profiles to authenticated;

grant DELETE on table public.profiles to service_role;

grant INSERT on table public.profiles to service_role;

grant REFERENCES on table public.profiles to service_role;

grant SELECT on table public.profiles to service_role;

grant TRIGGER on table public.profiles to service_role;

grant TRUNCATE on table public.profiles to service_role;

grant UPDATE on table public.profiles to service_role;

grant DELETE on table public.urls to anon;

grant INSERT on table public.urls to anon;

grant REFERENCES on table public.urls to anon;

grant SELECT on table public.urls to anon;

grant TRIGGER on table public.urls to anon;

grant TRUNCATE on table public.urls to anon;

grant UPDATE on table public.urls to anon;

grant DELETE on table public.urls to authenticated;

grant INSERT on table public.urls to authenticated;

grant REFERENCES on table public.urls to authenticated;

grant SELECT on table public.urls to authenticated;

grant TRIGGER on table public.urls to authenticated;

grant TRUNCATE on table public.urls to authenticated;

grant UPDATE on table public.urls to authenticated;

grant DELETE on table public.urls to service_role;

grant INSERT on table public.urls to service_role;

grant REFERENCES on table public.urls to service_role;

grant SELECT on table public.urls to service_role;

grant TRIGGER on table public.urls to service_role;

grant TRUNCATE on table public.urls to service_role;

grant UPDATE on table public.urls to service_role;
