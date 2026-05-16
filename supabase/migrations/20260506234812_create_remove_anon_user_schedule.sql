create extension if not exists "pg_cron" with schema "pg_catalog";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.purge_old_anonymous_auth_users()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
    delete from auth.users
    where is_anonymous = true
    and created_at < now() - interval '7 days';
  end;
$function$
;

select
  cron.schedule(
    'purge_old_anonymous_auth_users',
    '0 2 * * 1',
    ' select public.purge_old_anonymous_auth_users(); '
  );
