-- migrate:up
CREATE TABLE topic_talk (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_fk INT NOT NULL,
    talkie_fk INT NOT NULL,
    FOREIGN KEY (topic_fk) REFERENCES topic_category(topic_id),
    FOREIGN KEY (talkie_fk) REFERENCES small_talkies(talkie_id)
)

-- migrate:down
DROP TABLE topic_talk;