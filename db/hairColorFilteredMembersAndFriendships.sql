select m.id "m_id", m.picture "pic", m.first_name "Fname", m.last_name "Lname"
-- , f.memberid1 "friend1", f.memberid2 "friend2"
from members m
-- left outer join friendships f
-- on f.memberid2 = m.id 
where m.id !=$1 and hair_color like  $2
order by m.id asc
;