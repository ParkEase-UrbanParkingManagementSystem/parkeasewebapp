-- Download exteention

CREATE TABLE warden(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);


-- Insert fake users

INSERT INTO warden (name,email) VALUES ('NipulY','bbgb@gmail.com');