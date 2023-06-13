-- migrate:up
CREATE TABLE small_talks (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    talk VARCHAR(100) NOT NULL,
    emoji VARCHAR(60) NULL
);

-- migrate:down
DROP TABLE small_talks;