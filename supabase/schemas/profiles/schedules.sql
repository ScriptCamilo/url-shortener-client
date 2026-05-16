create extension if not exists pg_cron with schema pg_catalog;

select
  cron.schedule(
    'purge_old_anonymous_auth_users',
    '0 2 * * 1',
    ' select public.purge_old_anonymous_auth_users(); '
  );
