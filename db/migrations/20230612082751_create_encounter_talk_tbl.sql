-- migrate:up
CREATE TABLE encounter_talk (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    encounter_id INT NOT NULL REFERENCES encounter_category(id),
    talk_id INT NOT NULL REFERENCES small_talks(id)
)

-- migrate:down
DROP TABLE encounter_talk;