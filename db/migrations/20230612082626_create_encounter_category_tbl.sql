-- migrate:up
CREATE TABLE encounter_category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    encounter VARCHAR(50) NOT NULL,
    emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE encounter_category;
