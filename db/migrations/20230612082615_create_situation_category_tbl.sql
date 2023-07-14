-- migrate:up
CREATE TABLE situation_category (
    situation_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    situation VARCHAR(40) NOT NULL,
    situation_emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE situation_category;
