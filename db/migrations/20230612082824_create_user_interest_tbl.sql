-- migrate:up
CREATE TABLE user_interest (
    interest_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_fk INT NOT NULL,
    user_fk INT NOT NULL,
    FOREIGN KEY (topic_fk) REFERENCES topic_category(topic_id),
    FOREIGN KEY (user_fk) REFERENCES users(user_id)
);

-- migrate:down
DROP TABLE user_interest;
