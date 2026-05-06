set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_update_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
    update public.profiles
    set name = coalesce(new.raw_user_meta_data ->> 'name', 'Anonymous')
    where id = new.id;
    return new;
  end;
$function$
;

CREATE TRIGGER on_auth_user_updated AFTER UPDATE ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_update_user();


