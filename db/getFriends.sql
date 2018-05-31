SELECT * FROM friendships
WHERE memberid1 = $1 OR memberid2 = $1;