select m.id "m_id", m.picture "pic", m.first_name "Fname", m.last_name "Lname"
from members m
-- left outer join friendships f
-- on f.memberid2 = m.id 
where m.id !=$1 and eye_color like  $2 
order by m.id asc
;