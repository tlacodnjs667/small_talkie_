-- migrate:up
CREATE TABLE small_talkies (
    talkie_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    talkie VARCHAR(100) NOT NULL
);

-- migrate:down
DROP TABLE small_talks;