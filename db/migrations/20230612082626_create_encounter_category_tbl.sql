-- migrate:up
CREATE TABLE encounter_category (
    encounter_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    encounter VARCHAR(50) NOT NULL,
    encounter_emoji VARCHAR(60) NULL,
    situation_fk INT NOT NULL,
    FOREIGN KEY (situation_fk) REFERENCES situation_category(situation_id)
        ON DELETE CASCADE
);

-- migrate:down
DROP TABLE encounter_category;
