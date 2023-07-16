-- migrate:up
CREATE TABLE encounter_talkie (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    encounter_fk INT NOT NULL,
    talkie_fk INT NOT NULL,
    FOREIGN KEY (encounter_fk) REFERENCES encounter_category(encounter_id),
    FOREIGN KEY (talkie_fk) REFERENCES small_talkies(talkie_id)
)

-- migrate:down
DROP TABLE encounter_talk;