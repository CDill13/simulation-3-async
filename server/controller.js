const chalk = require("chalk");
let cChalk = chalk.cyan;

module.exports = {
    updateProfile: (req, res) => {
        const dbInstance = req.app.get("db");
        const {id, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year} = req.body;
        console.log(cChalk(`updating profile${id} with the following:`, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year));
        dbInstance.updateProfile(id, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => console.log(`updateProfile:`, err))
    },
    getAllMembers: (req, res) => {
        const dbInstance = req.app.get("db");
        dbInstance.getAllMembers().then(response => {
            res.status(200).send(response);
        })
    },
    addFriend: (req, res) => {
        const dbInstance = req.app.get("db");
        const {activeUser, newFriend} = req.body;
        dbInstance.addFriend(activeUser, newFriend)
        .then(response =>{
            // console.log(`addFriend: ${response.data}`)
            console.log(cChalk(`members with id of ${activeUser} and ${newFriend} are now friends!`))
            res.status(200).send(response);
        })
    },
    getFriends: (req, res) => {
        const dbInstance = req.app.get("db");
        const {activeUser} = req.body;
        console.log(cChalk(`getFriends`, activeUser));
        dbInstance.getFriends(activeUser)
        .then(response => {
            res.status(200).send(response);
        })
    },
    removeFriend: (req, res) => {
        const dbInstance = req.app.get("db");
        // const {activeUser, notFriend} = req.body;
        const user = req.params.user;
        const loser = req.params.loser;
        dbInstance.removeFriend(user, loser)
        .then(response => {
            console.log(cChalk(`members with id of ${user} and ${loser} are no longer friends!`))
            res.status(200).send(response);
        })
    },

    getUsers: (req, res) => {
        const db = req.app.get("db");
        const id = req.user.id;
        db.get_users([id]).then(users => {
          db.get_friendship([id]).then(friends => {
            for (let i = 0; i < users.length; i++) {
              for (let j = 0; j < friends.length; j++) {
                  console.log(users[i].m_id)
                if (users[i].id === friends[j].friend_id) {
                  users[i].friend_status = true;
                }
                else {
                  users[i].friend_status = false;
                  
                }
              } 
            }
            res.status(200).send(users);
          });
        
        })
        .catch(err => {
          res.status(500).send()
          console.log(err)
        } )
    },

    getAllMembersFriendsExempt: (req, res) => {
        const dbInstance = req.app.get("db");
        const id = req.params.id;
        console.log(cChalk(`this is the user id: ${id}`))
        dbInstance.getAllMembersFriendsExempt(id)
        .then(users =>{
            dbInstance.getUserFriends(id)
            .then(friends =>{
                for(let i = 0; i < users.length; i++){
                    for(let x = 0; x < friends.length; x++){
                        if(
                            users[i].m_id === friends[x].memberid2
                        ){
                            users[i].friendStatus = true;
                        }
                    }
                }
                res.status(200).send(users);
            })
            .catch(err => console.log("getAllMembersFriendsExempt: ",err))
        })
    },
    getFilteredMembersAndFriendships: (req, res) => {
        const dbInstance = req.app.get("db");
        const id = req.params.userid;
        const value = req.params.value;
        const attribute = req.params.attribute;
        console.log(cChalk(
            `id: ${id} | typeof: ${typeof id}
            value: ${value} | typeof: ${typeof value}
            attribute: ${attribute} | typeof: ${typeof attribute}`));

        switch (attribute){
            case "first_name":
                dbInstance.firstNameFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "last_name":
                dbInstance.lastNameFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "gender":
                dbInstance.genderFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "hair_color":
                dbInstance.hairColorFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "eye_color":
                dbInstance.eyeColorFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "hobby":
                dbInstance.hobbyFilteredMembersAndFriendships(id, value)
                .then(users =>{
                    dbInstance.getUserFriends(id)
                    .then(friends =>{
                        for(let i = 0; i < users.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    users[i].m_id === friends[x].memberid2
                                ){
                                    users[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(users);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            default:
                console.log("ctlr.getFilteredMembersAndFriendships switch statement: FIX THAT SHIT!!!")
        }

    },
    getUserFriends: (req, res) => {
        const dbInstance = req.app.get("db");
        const id = req.params.id;
        
        dbInstance.getUserFriends(id)
        .then(response => {
            console.log(response);
            res.status(200).send(response)
        })
    },
    getSearchStuff: (req, res) => {
        const dbInstance = req.app.get("db");
        const userId = req.params.userId;
        const searchBy = req.params.searchBy;
        const searchValue = req.params.searchValue;
        console.log(cChalk(
            `userId: ${userId} >>> typeof: ${typeof userId}
            searchBy: ${searchBy} >>> typeof: ${typeof searchBy}
            searchValue: ${searchValue} >>> typeof: ${typeof searchBy}`
        ))
        switch (searchBy){
            case "first_name":
                dbInstance.searchByFirstName(userId, searchValue)
                .then(searchedFriends => {
                    dbInstance.getUserFriends(userId)
                    .then(friends =>{
                        for(let i = 0; i < searchedFriends.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    searchedFriends[i].m_id === friends[x].memberid2
                                ){
                                    searchedFriends[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(searchedFriends);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            case "last_name":
                dbInstance.searchByLastName(userId, searchValue)
                .then(searchedFriends => {
                    dbInstance.getUserFriends(userId)
                    .then(friends =>{
                        for(let i = 0; i < searchedFriends.length; i++){
                            for(let x = 0; x < friends.length; x++){
                                if(
                                    searchedFriends[i].m_id === friends[x].memberid2
                                ){
                                    searchedFriends[i].friendStatus = true;
                                }
                            }
                        }
                        res.status(200).send(searchedFriends);
                    })
                    .catch(err => console.log("getAllMembersFriendsExempt: ",err))
                })
                break;
            default:
                console.log("ctrlr.getSearchStuff switch statement defaulted")
        }
    }
}