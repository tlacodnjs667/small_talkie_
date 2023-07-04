-- migrate:up
ALTER TABLE encounter_category 
ADD FOREIGN KEY(situation_id) REFERENCES situation_category(id) ON DELETE CASCADE;

-- migrate:down
ALTER TABLE encounter_category DROP situation_id;
