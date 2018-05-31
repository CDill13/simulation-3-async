select * 
from friendships
where memberid1 = $1 or memberid2 = $1
group by id;