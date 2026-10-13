CREATE TABLE public.products_backup_20261013 AS SELECT * FROM public.products;
GRANT ALL ON public.products_backup_20261013 TO service_role;
ALTER TABLE public.products_backup_20261013 ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.site_settings_backup_20261013 AS SELECT * FROM public.site_settings;
GRANT ALL ON public.site_settings_backup_20261013 TO service_role;
ALTER TABLE public.site_settings_backup_20261013 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ADD COLUMN price_bs numeric NOT NULL DEFAULT 0;
ALTER TABLE public.products ADD COLUMN price_both_manual boolean NOT NULL DEFAULT false;