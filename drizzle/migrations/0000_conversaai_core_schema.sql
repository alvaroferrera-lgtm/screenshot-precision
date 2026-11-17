
-- ========== ENUMS ==========
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.workspace_role AS ENUM ('owner', 'admin', 'member');
CREATE TYPE public.assistant_channel AS ENUM ('web', 'whatsapp', 'voice');
CREATE TYPE public.assistant_status AS ENUM ('draft', 'active', 'paused');

-- ========== UPDATED_AT helper ==========
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ========== PROFILES ==========
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ========== USER ROLES ==========
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- ========== PLANS ==========
CREATE TABLE public.plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  price_monthly numeric(10,2),            -- NULL = precio personalizado
  price_yearly numeric(10,2),
  currency text NOT NULL DEFAULT 'EUR',
  is_custom boolean NOT NULL DEFAULT false,
  is_highlighted boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  max_assistants int NOT NULL DEFAULT 1,
  max_ai_messages_month int NOT NULL DEFAULT 100,
  max_knowledge_chars int NOT NULL DEFAULT 50000,
  max_members int NOT NULL DEFAULT 1,
  web_enabled boolean NOT NULL DEFAULT true,
  whatsapp_enabled boolean NOT NULL DEFAULT false,
  whatsapp_numbers int NOT NULL DEFAULT 0,
  voice_enabled boolean NOT NULL DEFAULT false,
  voice_minutes_month int NOT NULL DEFAULT 0,
  remove_branding boolean NOT NULL DEFAULT false,
  advanced_customization boolean NOT NULL DEFAULT false,
  analytics_days int NOT NULL DEFAULT 7,
  overage_per_1000_messages numeric(10,2),
  overage_per_voice_minute numeric(10,4),
  ai_model text NOT NULL DEFAULT 'openai/gpt-6-luna',
  context_chunks int NOT NULL DEFAULT 3,
  features text[] NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.plans TO anon, authenticated;
GRANT UPDATE ON public.plans TO authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans are public" ON public.plans FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update plans" ON public.plans FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER plans_updated BEFORE UPDATE ON public.plans FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.plans (id, name, tagline, price_monthly, price_yearly, is_custom, is_highlighted, sort_order,
  max_assistants, max_ai_messages_month, max_knowledge_chars, max_members,
  web_enabled, whatsapp_enabled, whatsapp_numbers, voice_enabled, voice_minutes_month,
  remove_branding, advanced_customization, analytics_days, overage_per_1000_messages, overage_per_voice_minute,
  context_chunks, features) VALUES
('free', 'Free', 'Para probar tu primer chatbot web.', 0, 0, false, false, 1,
  1, 100, 30000, 1, true, false, 0, false, 0, false, false, 7, NULL, NULL, 3,
  ARRAY['1 chatbot web','100 mensajes de IA al mes','Base de conocimiento de 30.000 caracteres','Widget con marca CONVERSAAI','Estadísticas de 7 días']),
('starter', 'Starter', 'Chatbot web avanzado para pequeños negocios.', 9.99, 99.90, false, false, 2,
  3, 2000, 300000, 2, true, false, 0, false, 0, true, true, 30, 4.00, NULL, 5,
  ARRAY['3 chatbots web','2.000 mensajes de IA al mes','Base de conocimiento de 300.000 caracteres','Sin marca CONVERSAAI','Personalización avanzada del widget','2 miembros de equipo','Estadísticas de 30 días']),
('pro', 'Pro', 'Web y WhatsApp para equipos en crecimiento.', 24.99, 249.90, false, true, 3,
  10, 6000, 1000000, 5, true, true, 1, false, 0, true, true, 90, 3.50, NULL, 6,
  ARRAY['10 asistentes','6.000 mensajes de IA al mes','Asistentes de WhatsApp (1 número)','Base de conocimiento de 1.000.000 caracteres','5 miembros de equipo','Estadísticas de 90 días']),
('business', 'Business', 'Web, WhatsApp y llamadas telefónicas con IA.', 59.99, 599.90, false, false, 4,
  25, 15000, 3000000, 15, true, true, 3, true, 150, true, true, 365, 3.00, 0.18, 8,
  ARRAY['25 asistentes','15.000 mensajes de IA al mes','WhatsApp (3 números)','Asistentes telefónicos: 150 min/mes incluidos','Base de conocimiento de 3.000.000 caracteres','15 miembros de equipo','Estadísticas de 12 meses']),
('enterprise', 'Enterprise', 'Volumen, seguridad y soluciones a medida.', NULL, NULL, true, false, 5,
  1000, 1000000, 50000000, 1000, true, true, 50, true, 100000, true, true, 730, NULL, NULL, 10,
  ARRAY['Asistentes y volumen a medida','Números de WhatsApp y líneas dedicadas','Minutos de voz negociados','Integraciones personalizadas','Acuerdo de nivel de servicio (SLA)','Gestor de cuenta dedicado']);

-- ========== WORKSPACES ==========
CREATE TABLE public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  plan_id text NOT NULL DEFAULT 'free' REFERENCES public.plans(id),
  billing_status text NOT NULL DEFAULT 'active',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.workspaces TO authenticated;
GRANT UPDATE (name) ON public.workspaces TO authenticated;
GRANT ALL ON public.workspaces TO service_role;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER workspaces_updated BEFORE UPDATE ON public.workspaces FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.workspace_members (
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.workspace_role NOT NULL DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);
GRANT SELECT, UPDATE, DELETE ON public.workspace_members TO authenticated;
GRANT ALL ON public.workspace_members TO service_role;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
CREATE INDEX workspace_members_user_idx ON public.workspace_members(user_id);

CREATE OR REPLACE FUNCTION public.is_workspace_member(_ws uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = _ws AND user_id = auth.uid())
$$;

CREATE OR REPLACE FUNCTION public.is_workspace_manager(_ws uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.workspace_members WHERE workspace_id = _ws AND user_id = auth.uid() AND role IN ('owner','admin'))
$$;

CREATE OR REPLACE FUNCTION public.shares_workspace(_other uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members a
    JOIN public.workspace_members b ON a.workspace_id = b.workspace_id
    WHERE a.user_id = auth.uid() AND b.user_id = _other)
$$;

CREATE POLICY "Members see workspace" ON public.workspaces FOR SELECT TO authenticated
  USING (public.is_workspace_member(id) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Managers rename workspace" ON public.workspaces FOR UPDATE TO authenticated
  USING (public.is_workspace_manager(id)) WITH CHECK (public.is_workspace_manager(id));

CREATE POLICY "Members see members" ON public.workspace_members FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id));
CREATE POLICY "Managers update members" ON public.workspace_members FOR UPDATE TO authenticated
  USING (public.is_workspace_manager(workspace_id) AND role <> 'owner')
  WITH CHECK (public.is_workspace_manager(workspace_id) AND role <> 'owner');
CREATE POLICY "Managers remove members or self leave" ON public.workspace_members FOR DELETE TO authenticated
  USING (role <> 'owner' AND (public.is_workspace_manager(workspace_id) OR user_id = auth.uid()));

CREATE POLICY "Profiles visible to self and teammates" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.shares_workspace(id));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- ========== INVITATIONS ==========
CREATE TABLE public.workspace_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  email text NOT NULL,
  role public.workspace_role NOT NULL DEFAULT 'member',
  invited_by uuid NOT NULL,
  accepted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT invitation_not_owner CHECK (role <> 'owner')
);
CREATE UNIQUE INDEX workspace_invitations_pending_uq ON public.workspace_invitations (workspace_id, lower(email)) WHERE accepted_at IS NULL;
GRANT SELECT, INSERT, DELETE ON public.workspace_invitations TO authenticated;
GRANT ALL ON public.workspace_invitations TO service_role;
ALTER TABLE public.workspace_invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Managers and invitee see invitations" ON public.workspace_invitations FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id) OR lower(email) = lower(auth.jwt() ->> 'email'));
CREATE POLICY "Managers create invitations" ON public.workspace_invitations FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_manager(workspace_id) AND invited_by = auth.uid());
CREATE POLICY "Managers or invitee delete invitations" ON public.workspace_invitations FOR DELETE TO authenticated
  USING (public.is_workspace_manager(workspace_id) OR lower(email) = lower(auth.jwt() ->> 'email'));

-- ========== ASSISTANTS ==========
CREATE TABLE public.assistants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  channel public.assistant_channel NOT NULL DEFAULT 'web',
  status public.assistant_status NOT NULL DEFAULT 'draft',
  description text NOT NULL DEFAULT '',
  instructions text NOT NULL DEFAULT '',
  welcome_message text NOT NULL DEFAULT 'Hola, ¿en qué puedo ayudarte?',
  tone text NOT NULL DEFAULT 'profesional',
  language text NOT NULL DEFAULT 'es',
  primary_color text NOT NULL DEFAULT '#11A39A',
  fallback_message text NOT NULL DEFAULT 'No tengo esa información. ¿Quieres que un miembro del equipo te contacte?',
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX assistants_ws_idx ON public.assistants(workspace_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assistants TO authenticated;
GRANT ALL ON public.assistants TO service_role;
ALTER TABLE public.assistants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read assistants" ON public.assistants FOR SELECT TO authenticated USING (public.is_workspace_member(workspace_id));
CREATE POLICY "Members create assistants" ON public.assistants FOR INSERT TO authenticated WITH CHECK (public.is_workspace_member(workspace_id) AND created_by = auth.uid());
CREATE POLICY "Members update assistants" ON public.assistants FOR UPDATE TO authenticated USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "Managers delete assistants" ON public.assistants FOR DELETE TO authenticated USING (public.is_workspace_manager(workspace_id));
CREATE TRIGGER assistants_updated BEFORE UPDATE ON public.assistants FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ========== KNOWLEDGE ==========
CREATE TABLE public.knowledge_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  source_type text NOT NULL DEFAULT 'text' CHECK (source_type IN ('text','url','file')),
  source_url text,
  content text NOT NULL DEFAULT '',
  char_count int GENERATED ALWAYS AS (char_length(content)) STORED,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX knowledge_ws_idx ON public.knowledge_sources(workspace_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_sources TO authenticated;
GRANT ALL ON public.knowledge_sources TO service_role;
ALTER TABLE public.knowledge_sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read knowledge" ON public.knowledge_sources FOR SELECT TO authenticated USING (public.is_workspace_member(workspace_id));
CREATE POLICY "Members create knowledge" ON public.knowledge_sources FOR INSERT TO authenticated WITH CHECK (public.is_workspace_member(workspace_id) AND created_by = auth.uid());
CREATE POLICY "Members update knowledge" ON public.knowledge_sources FOR UPDATE TO authenticated USING (public.is_workspace_member(workspace_id)) WITH CHECK (public.is_workspace_member(workspace_id));
CREATE POLICY "Members delete knowledge" ON public.knowledge_sources FOR DELETE TO authenticated USING (public.is_workspace_member(workspace_id));
CREATE TRIGGER knowledge_updated BEFORE UPDATE ON public.knowledge_sources FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.assistant_knowledge (
  assistant_id uuid NOT NULL REFERENCES public.assistants(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES public.knowledge_sources(id) ON DELETE CASCADE,
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  PRIMARY KEY (assistant_id, source_id)
);
GRANT SELECT, INSERT, DELETE ON public.assistant_knowledge TO authenticated;
GRANT ALL ON public.assistant_knowledge TO service_role;
ALTER TABLE public.assistant_knowledge ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read links" ON public.assistant_knowledge FOR SELECT TO authenticated USING (public.is_workspace_member(workspace_id));
CREATE POLICY "Members create links" ON public.assistant_knowledge FOR INSERT TO authenticated WITH CHECK (
  public.is_workspace_member(workspace_id)
  AND EXISTS (SELECT 1 FROM public.assistants a WHERE a.id = assistant_id AND a.workspace_id = assistant_knowledge.workspace_id)
  AND EXISTS (SELECT 1 FROM public.knowledge_sources k WHERE k.id = source_id AND k.workspace_id = assistant_knowledge.workspace_id));
CREATE POLICY "Members delete links" ON public.assistant_knowledge FOR DELETE TO authenticated USING (public.is_workspace_member(workspace_id));

-- ========== CONVERSATIONS & MESSAGES ==========
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  assistant_id uuid NOT NULL REFERENCES public.assistants(id) ON DELETE CASCADE,
  channel public.assistant_channel NOT NULL DEFAULT 'web',
  source text NOT NULL DEFAULT 'widget' CHECK (source IN ('widget','playground','whatsapp','voice')),
  visitor_id text NOT NULL,
  title text NOT NULL DEFAULT 'Nueva conversación',
  message_count int NOT NULL DEFAULT 0,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX conversations_ws_idx ON public.conversations(workspace_id, last_message_at DESC);
CREATE INDEX conversations_assistant_idx ON public.conversations(assistant_id);
GRANT SELECT, DELETE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read conversations" ON public.conversations FOR SELECT TO authenticated USING (public.is_workspace_member(workspace_id));
CREATE POLICY "Managers delete conversations" ON public.conversations FOR DELETE TO authenticated USING (public.is_workspace_manager(workspace_id));

CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant')),
  content text NOT NULL,
  input_tokens int,
  output_tokens int,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_conv_idx ON public.messages(conversation_id, created_at);
CREATE INDEX messages_ws_usage_idx ON public.messages(workspace_id, created_at) WHERE role = 'assistant';
GRANT SELECT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read messages" ON public.messages FOR SELECT TO authenticated USING (public.is_workspace_member(workspace_id));

-- ========== CONTACT ==========
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  topic text NOT NULL DEFAULT 'general' CHECK (topic IN ('general','ventas','enterprise','soporte')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone sends contact" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read contact" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ========== PLAN LIMIT ENFORCEMENT ==========
CREATE OR REPLACE FUNCTION public.workspace_plan(_ws uuid)
RETURNS public.plans LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.* FROM public.plans p JOIN public.workspaces w ON w.plan_id = p.id WHERE w.id = _ws
$$;

CREATE OR REPLACE FUNCTION public.enforce_assistant_limits()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE p public.plans; n int;
BEGIN
  p := public.workspace_plan(NEW.workspace_id);
  IF TG_OP = 'INSERT' THEN
    SELECT count(*) INTO n FROM public.assistants WHERE workspace_id = NEW.workspace_id;
    IF n >= p.max_assistants THEN
      RAISE EXCEPTION 'PLAN_LIMIT: Tu plan % permite % asistente(s).', p.name, p.max_assistants;
    END IF;
  END IF;
  IF TG_OP = 'INSERT' OR NEW.channel IS DISTINCT FROM OLD.channel THEN
    IF NEW.channel = 'whatsapp' AND NOT p.whatsapp_enabled THEN
      RAISE EXCEPTION 'PLAN_LIMIT: Los asistentes de WhatsApp están disponibles desde el plan Pro.';
    END IF;
    IF NEW.channel = 'voice' AND NOT p.voice_enabled THEN
      RAISE EXCEPTION 'PLAN_LIMIT: Los asistentes telefónicos están disponibles desde el plan Business.';
    END IF;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER assistants_limits BEFORE INSERT OR UPDATE ON public.assistants FOR EACH ROW EXECUTE FUNCTION public.enforce_assistant_limits();

CREATE OR REPLACE FUNCTION public.enforce_knowledge_limits()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE p public.plans; total int;
BEGIN
  p := public.workspace_plan(NEW.workspace_id);
  SELECT COALESCE(sum(char_length(content)),0) INTO total FROM public.knowledge_sources
    WHERE workspace_id = NEW.workspace_id AND id <> NEW.id;
  IF total + char_length(NEW.content) > p.max_knowledge_chars THEN
    RAISE EXCEPTION 'PLAN_LIMIT: Superas el límite de % caracteres de conocimiento de tu plan %.', p.max_knowledge_chars, p.name;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER knowledge_limits BEFORE INSERT OR UPDATE ON public.knowledge_sources FOR EACH ROW EXECUTE FUNCTION public.enforce_knowledge_limits();

CREATE OR REPLACE FUNCTION public.enforce_member_limits()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE p public.plans; n int;
BEGIN
  p := public.workspace_plan(NEW.workspace_id);
  SELECT (SELECT count(*) FROM public.workspace_members WHERE workspace_id = NEW.workspace_id)
       + (SELECT count(*) FROM public.workspace_invitations WHERE workspace_id = NEW.workspace_id AND accepted_at IS NULL
            AND (TG_TABLE_NAME <> 'workspace_members'))
    INTO n;
  IF n >= p.max_members THEN
    RAISE EXCEPTION 'PLAN_LIMIT: Tu plan % permite % miembro(s) en el equipo.', p.name, p.max_members;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER invitations_limits BEFORE INSERT ON public.workspace_invitations FOR EACH ROW EXECUTE FUNCTION public.enforce_member_limits();

-- Monthly AI usage for a workspace
CREATE OR REPLACE FUNCTION public.workspace_ai_usage(_ws uuid)
RETURNS int LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*)::int FROM public.messages
  WHERE workspace_id = _ws AND role = 'assistant' AND created_at >= date_trunc('month', now())
$$;

-- ========== INVITATION ACCEPTANCE ==========
CREATE OR REPLACE FUNCTION public.accept_invitation(_invitation uuid)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inv public.workspace_invitations;
BEGIN
  SELECT * INTO inv FROM public.workspace_invitations
   WHERE id = _invitation AND accepted_at IS NULL AND lower(email) = lower(auth.jwt() ->> 'email');
  IF NOT FOUND THEN RAISE EXCEPTION 'Invitación no válida'; END IF;
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (inv.workspace_id, auth.uid(), inv.role) ON CONFLICT DO NOTHING;
  UPDATE public.workspace_invitations SET accepted_at = now() WHERE id = inv.id;
  RETURN inv.workspace_id;
END; $$;
REVOKE EXECUTE ON FUNCTION public.accept_invitation(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.accept_invitation(uuid) TO authenticated;

-- ========== SIGNUP BOOTSTRAP ==========
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE ws_id uuid; display_name text; company text;
BEGIN
  display_name := COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'full_name', ''), split_part(NEW.email, '@', 1));
  company := NULLIF(NEW.raw_user_meta_data ->> 'company', '');
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, display_name);

  INSERT INTO public.workspaces (name, created_by)
    VALUES (COALESCE(company, 'Equipo de ' || display_name), NEW.id) RETURNING id INTO ws_id;
  INSERT INTO public.workspace_members (workspace_id, user_id, role) VALUES (ws_id, NEW.id, 'owner');

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
