set check_function_bodies = off;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
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
$function$;

create function public.handle_update_user()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
begin
    update public.profiles
    set name = coalesce(new.raw_user_meta_data ->> 'name', 'Anonymous')
    where id = new.id;
    return new;
  end;
$function$;

create function public.purge_old_anonymous_auth_users()
returns void
language plpgsql
security definer
set search_path to ''
as $function$
begin
    delete from auth.users
    where is_anonymous = true
    and created_at < now() - interval '7 days';
  end;
$function$;
