-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kakao_client VARCHAR(30) NOT NULL,
    nickname VARCHAR(30) NULL UNIQUE,
    email VARCHAR(40) NULL UNIQUE
);

-- migrate:down
DROP TABLE users;
