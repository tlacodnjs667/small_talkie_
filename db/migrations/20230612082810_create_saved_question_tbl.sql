-- migrate:up
CREATE TABLE bookmarks (
    bookmark_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    talkie_fk INT NOT NULL,
    user_fk INT NOT NULL,
    FOREIGN KEY (talkie_fk) REFERENCES small_talkies(talkie_id),
    FOREIGN KEY (user_fk) REFERENCES users(user_id)
);

-- migrate:down
DROP TABLE saved_questions;