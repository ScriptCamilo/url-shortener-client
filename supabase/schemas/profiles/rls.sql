drop policy if exists profiles_select_own on public.profiles;

drop policy if exists profiles_update_own on public.profiles;

drop policy if exists profiles_delete_own on public.profiles;

create policy profiles_select_own
on public.profiles
as permissive
for select
to authenticated
using (id = auth.uid());

create policy profiles_update_own
on public.profiles
as permissive
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy profiles_delete_own
on public.profiles
as permissive
for delete
to authenticated
using (id = auth.uid());
