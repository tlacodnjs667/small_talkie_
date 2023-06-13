-- migrate:up
CREATE TABLE situation_category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    situation VARCHAR(40) NOT NULL,
    emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE situation_category;
