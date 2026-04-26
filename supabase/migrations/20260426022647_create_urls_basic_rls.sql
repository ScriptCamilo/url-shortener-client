create policy urls_delete_own
on public.urls
as permissive
for delete
to authenticated
using (profile_id = auth.uid());

create policy urls_insert_own
on public.urls
as permissive
for insert
to authenticated
with check (profile_id = auth.uid());

create policy urls_select_by_short_url_public
on public.urls
as permissive
for select
to anon,
authenticated
using (deleted_at is null);

create policy urls_select_own
on public.urls
as permissive
for select
to authenticated
using (profile_id = auth.uid());

create policy urls_update_own
on public.urls
as permissive
for update
to authenticated
using (profile_id = auth.uid())
with check (profile_id = auth.uid());
