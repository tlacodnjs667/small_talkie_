-- migrate:up
CREATE TABLE user_interest (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL REFERENCES topic_category (id),
    user_id INT NOT NULL REFERENCES users (id)
);

-- migrate:down
DROP TABLE user_interest;
