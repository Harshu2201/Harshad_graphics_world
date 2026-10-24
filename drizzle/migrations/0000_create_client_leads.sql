CREATE TABLE public.client_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  want_ugc boolean NOT NULL DEFAULT false,
  source text NOT NULL DEFAULT 'client-reels-page',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.client_leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.client_leads TO service_role;

ALTER TABLE public.client_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a client reel lead"
  ON public.client_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (char_length(btrim(name)) > 0 AND char_length(phone) <= 20);