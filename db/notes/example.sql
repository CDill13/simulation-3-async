DROP TABLE IF EXISTS demo_payments;
DROP TABLE IF EXISTS demo_accounts;
DROP TABLE IF EXISTS demo_users;

-- USERS

CREATE TABLE demo_users (
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO demo_users
(name)
VALUES
('tommy'),
('carter'),
('cody'),
('bailey');

-- ACCOUNTS

CREATE TABLE demo_accounts (
    id SERIAL PRIMARY KEY,
    type TEXT,
    amount MONEY DEFAULT 1000,
    owner_id INTEGER REFERENCES demo_users(id)
);

INSERT INTO demo_accounts
(type, owner_id)
VALUES
('checking', 1),
('checking', 2),
('checking', 3),
('checking', 4),
('savings', 2);

-- PAYMENTS

CREATE TABLE demo_payments (
    id SERIAL PRIMARY KEY,
    amount MONEY,
    from_id INT REFERENCES demo_accounts(id),
    to_id INT REFERENCES demo_accounts(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO demo_payments
(amount, from_id, to_id)
VALUES
(100, 1, 3),
(200, 2, 4),
(300, 4, 1);

SELECT * FROM demo_users
JOIN demo_accounts ON demo_accounts.owner_id = demo_users.id
LEFT JOIN demo_payments ON demo_payments.from_id = demo_accounts.id OR demo_payments.to_id = demo_accounts.id
WHERE demo_users.id = 1;

