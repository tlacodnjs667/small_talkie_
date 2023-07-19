-- migrate:up
ALTER TABLE users 
  ADD darkmode BOOLEAN NOT NULL DEFAULT FALSE;

-- migrate:down
ALTER TABLE users
  DROP darkmode;