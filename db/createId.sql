INSERT INTO members 
(auth_id, picture, first_name, last_name)
VALUES 
($1, CONCAT('https://robohash.org/', $1), '', '');