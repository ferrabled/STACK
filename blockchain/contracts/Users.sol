// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;


contract Users {

    struct User {
        address addr;
        string name;
        string surname;
        string email;
        uint32 telephone;
        uint orgId;
        uint256 index;
    }

    User[] private userList;
    mapping(uint256 => uint256[]) orgIdToUserList;


    function insertUser(
        address addr, 
        string memory name, 
        string memory surname, 
        string memory email, 
        uint32 telephone,
        uint orgId 
    ) public {
        uint userId = userList.length;
        userList.push(User(addr, name, surname, email, telephone, orgId, userId));
        orgIdToUserList[orgId].push(userId);
    }



    function getAllUsersFromOrg(uint orgId) public view returns(User[] memory){
        uint[] memory idList = orgIdToUserList[orgId];
        uint cont = idList.length;
        User[] memory usersFromOrg = new User[](cont);

        for (uint i = 0; i < cont; i++) {
            usersFromOrg[i] = userList[idList[i]];
        }
        return usersFromOrg;
    }



    function getUserData(uint userId) public view returns(User memory){
        return userList[userId];
    }

    //RELATION BETWEEN ASSET AND USER

    mapping(uint => uint[]) public userIdToAssetList;
    mapping(uint => uint[]) public assetToListOfUsers;


    //TODO INSERT VARIOUS USERS AT THE SAME TIME
    function insertUserToAsset(uint assetId, uint userId) public {
        userIdToAssetList[userId].push(assetId);
        assetToListOfUsers[assetId].push(userId);
    }


}