-- migrate:up
ALTER TABLE users
  ADD COLUMN profile_image_url VARCHAR(255) NULL;

-- migrate:down
ALTER TABLE users
  DROP COLUMN profile_image_url;


