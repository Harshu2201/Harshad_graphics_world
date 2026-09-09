CREATE TABLE public.instagram_reels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ig_id TEXT,
  permalink TEXT NOT NULL UNIQUE,
  media_type TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  caption TEXT,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.instagram_reels TO anon;
GRANT SELECT ON public.instagram_reels TO authenticated;
GRANT ALL ON public.instagram_reels TO service_role;

ALTER TABLE public.instagram_reels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reels are publicly viewable"
ON public.instagram_reels FOR SELECT
USING (true);

CREATE INDEX instagram_reels_posted_at_idx ON public.instagram_reels (posted_at DESC NULLS LAST);

INSERT INTO public.instagram_reels (permalink, media_type, caption, posted_at)
VALUES ('https://www.instagram.com/p/DdEeyx1iboh/', 'VIDEO', 'Latest AI reel', now())
ON CONFLICT (permalink) DO NOTHING;