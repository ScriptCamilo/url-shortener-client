set check_function_bodies = off;

create or replace function public.create_short_code(var_long_url text, var_profile_id uuid)
returns public.urls
language plpgsql
security invoker
set search_path to public
as $function$
declare
  anonymous_user_url_limit constant int := 2;
  authenticated_user_url_limit constant int := 5;
  var_count int;
  var_is_anonymous boolean;
  var_limit int;
  var_short_code text;
  var_row public.urls;
  var_len int;
  i int := 0;
begin
  if var_long_url is null or length(trim(var_long_url)) = 0 then
    raise exception 'long_url is required';
  end if;

  if var_profile_id is null then
    raise exception 'profile_id is required';
  end if;

  if var_profile_id <> auth.uid() then
    raise exception 'profile_id must match the authenticated user';
  end if;

  var_is_anonymous := coalesce((auth.jwt()->>'is_anonymous')::boolean, false);

  if var_is_anonymous then
    var_limit := anonymous_user_url_limit;
  else
    var_limit := authenticated_user_url_limit;
  end if;

  select count(*)::int into var_count
  from public.urls
  where profile_id = var_profile_id
    and deleted_at is null;

  if var_count >= var_limit then
    raise exception '%',
      format(
        'You have reached the maximum of %s URL(s) for %s accounts.',
        var_limit,
        case when var_is_anonymous then 'anonymous' else 'registered' end
      );
  end if;

  loop
    i := i + 1;
    if i > 10 then
      raise exception 'Could not generate unique short_code';
    end if;

    var_len := floor(random() * 6 + 3)::int;

    -- 8-char base62-ish slug from md5(random + clock)
    var_short_code := substr(md5(gen_random_uuid()::text || clock_timestamp()::text), 1, var_len);

    begin
      insert into public.urls (long_url, profile_id, short_code)
      values (var_long_url, var_profile_id, var_short_code)
      returning * into var_row;

      return var_row;
    exception
      when unique_violation then
        -- collision, retry
        null;
    end;
  end loop;
end;
$function$
;
