-- migrate:up
CREATE TABLE saved_questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    talk_id INT NOT NULL REFERENCES small_talks (id),
    user_id INT NOT NULL REFERENCES users (id)
);

-- migrate:down
DROP TABLE saved_questions;