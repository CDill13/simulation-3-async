select m.id , m.picture , m.first_name , m.last_name 
from members m
-- where m.id != $1
order by m.id asc