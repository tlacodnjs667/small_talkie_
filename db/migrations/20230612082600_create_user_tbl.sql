-- migrate:up
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    kakao_client VARCHAR(100) NOT NULL,
    nickname VARCHAR(30) NULL UNIQUE,
    email VARCHAR(50) NULL UNIQUE
);

-- migrate:down
DROP TABLE users;
