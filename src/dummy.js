var pageNum = 1;
var itemsPerPage = 10;
var maxItemIndex = pageNum * 10 - 1;

var visibleArray = [];

var allTheThings = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]

for (var i = maxItemIndex; i > maxItemIndex - itemsPerPage; i--) {
    if (allTheThings[i])
        visibleArray.push(allTheThings[i]);
}

// page number is Array.length Math.ceil 

//this is css for a 
// {
//     max-height: 200px; 
//     overflow-y: auto;
// }

// ::-webkit-scrollbar { 
//     display: none; 
// }
