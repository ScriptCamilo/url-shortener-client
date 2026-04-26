set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_short_code(var_long_url text, var_profile_id uuid)
 RETURNS public.urls
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare
  var_short_code text;
  var_row public.urls;
  var_len int;
  i int := 0;
begin
  if var_long_url is null or length(trim(var_long_url)) = 0 then
    raise exception 'long_url is required';
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


