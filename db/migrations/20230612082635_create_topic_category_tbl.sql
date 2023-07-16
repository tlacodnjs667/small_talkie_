-- migrate:up
CREATE TABLE topic_category (
    topic_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(40) NOT NULL,
    topic_emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE topic_category;
