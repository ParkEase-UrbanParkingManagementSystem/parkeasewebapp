-- Download exteention

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL

);

-- Insert fake users

INSERT INTO users (name,email,password) VALUES ('Nipul','bbb@gmail.com','1234');