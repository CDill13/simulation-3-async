-- select m.id "m_id", m.picture "pic", m.first_name "Fname", m.last_name "Lname", f.memberid1 "friend1", f.memberid2 "friend2"
-- from members m
-- left outer join friendships f
-- on f.memberid2 = m.id
-- where f.memberid1 = $1
-- group by m.id, f.memberid1, f.memberid2
-- order by m.id asc
-- ;

select m.id "m_id", m.picture "pic", m.first_name "Fname", m.last_name "Lname"
from members m
order by m.id asc