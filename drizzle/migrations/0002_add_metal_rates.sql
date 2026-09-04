ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS gold_rate numeric NOT NULL DEFAULT 85,
  ADD COLUMN IF NOT EXISTS silver_rate numeric NOT NULL DEFAULT 1.5,
  ADD COLUMN IF NOT EXISTS eur_rate numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rates_updated_at timestamptz NOT NULL DEFAULT now();