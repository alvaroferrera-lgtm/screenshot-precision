
CREATE OR REPLACE FUNCTION public.workspace_daily_stats(_ws uuid, _days int)
RETURNS TABLE (day date, conversations int, user_messages int, ai_messages int)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_workspace_member(_ws) THEN
    RAISE EXCEPTION 'No autorizado';
  END IF;
  RETURN QUERY
  WITH days AS (
    SELECT generate_series((current_date - (GREATEST(LEAST(_days, 365), 1) - 1)), current_date, interval '1 day')::date AS d
  )
  SELECT d.d,
    (SELECT count(*)::int FROM public.conversations c WHERE c.workspace_id = _ws AND c.created_at::date = d.d),
    (SELECT count(*)::int FROM public.messages m WHERE m.workspace_id = _ws AND m.role = 'user' AND m.created_at::date = d.d),
    (SELECT count(*)::int FROM public.messages m WHERE m.workspace_id = _ws AND m.role = 'assistant' AND m.created_at::date = d.d)
  FROM days d ORDER BY d.d;
END; $$;

CREATE OR REPLACE FUNCTION public.my_workspace_usage(_ws uuid)
RETURNS int LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_workspace_member(_ws) THEN RAISE EXCEPTION 'No autorizado'; END IF;
  RETURN public.workspace_ai_usage(_ws);
END; $$;

REVOKE EXECUTE ON FUNCTION public.workspace_ai_usage(uuid) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.workspace_plan(uuid) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.workspace_daily_stats(uuid, int) FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.my_workspace_usage(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.workspace_daily_stats(uuid, int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.my_workspace_usage(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.workspace_ai_usage(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.workspace_plan(uuid) TO service_role;
