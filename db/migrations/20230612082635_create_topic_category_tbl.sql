-- migrate:up
CREATE TABLE topic_category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(40) NOT NULL,
    emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE topic_category;
