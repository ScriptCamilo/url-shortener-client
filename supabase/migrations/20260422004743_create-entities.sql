-- Create users table (linked to auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create urls table
CREATE TABLE urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  long_url TEXT NOT NULL,
  short_url TEXT NOT NULL UNIQUE,
  clicks INTEGER NOT NULL DEFAULT 0,
  user_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  CONSTRAINT fk_urls_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_urls_user_id ON urls (user_id);
CREATE INDEX idx_urls_short_url ON urls (short_url);
