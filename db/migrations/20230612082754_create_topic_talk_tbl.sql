-- migrate:up
CREATE TABLE topic_talk (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL REFERENCES topic_category (id),
    talk_id INT NOT NULL REFERENCES small_talks (id)
)

-- migrate:down
DROP TABLE topic_talk;