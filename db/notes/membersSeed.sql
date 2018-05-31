CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    auth_id TEXT,
    picture TEXT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    hair_color TEXT,
    eye_color TEXT,
    hobby TEXT,
    birth_day INT,
    birth_month TEXT,
    birth_year INT
);