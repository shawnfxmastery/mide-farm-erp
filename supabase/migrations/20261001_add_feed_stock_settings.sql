create table if not exists public.feed_stock_settings (
  id integer primary key check (id = 1),
  opening_bags numeric not null default 0 check (opening_bags >= 0),
  reconciliation_date date not null,
  updated_at timestamptz not null default now()
);
