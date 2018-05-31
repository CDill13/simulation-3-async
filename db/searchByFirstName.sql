select m.id "m_id", m.picture "pic", m.first_name "Fname", m.last_name "Lname"
from members m
where m.id !=$1 and m.first_name like concat('%', $2, '%')
order by m.id asc
;