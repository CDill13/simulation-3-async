DELETE FROM friendships
-- WHERE memberid1 = $1 OR memberid2 =$1 AND memberid1 = $2 OR memberid2 = $2;
WHERE (memberid1 = $1 OR memberid2 =$1) AND (memberid1 = $2 OR memberid2 = $2);