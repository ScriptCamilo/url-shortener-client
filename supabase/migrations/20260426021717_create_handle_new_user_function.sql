set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
    insert into public.profiles
      (
        id ,
        name
      )
    values
      (
        new.id ,
        coalesce (new.raw_user_meta_data ->> 'name', 'Anonymous')
      )
    ;
    return new;
  end;
$function$
;

create trigger on_auth_user_created
after insert
on auth.users
for each row
execute function public.handle_new_user();
