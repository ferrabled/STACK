// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import "./Main.sol";

contract Users {

    address public mainAddr;

    constructor (address _mainAddr){
        mainAddr = _mainAddr;
    }

    event Register(
        address addr, 
        string name,
        string surname,
        uint orgId 
    );

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
    address[] private users;
    mapping(uint256 => uint256[]) orgIdToUserList;


    mapping(address => uint) addressToId;


    function isUser(address userAddress) public view returns (bool isIndeed) {
        if (users.length == 0) return false;
        return (users[addressToId[userAddress]] == userAddress);
    }

   

    function insertUser(
        address addr, 
        string memory name, 
        string memory surname, 
        string memory email, 
        uint32 telephone,
        uint orgId 
    ) public {
        //Instance main contract to see if the id of the org exists
        Main mainInstance = Main(mainAddr);

        if(isUser(addr)) revert("Address already registered");
        if((mainInstance.orgCount()) < (uint256(orgId)+1)) revert("OrgId not found");
        uint userId = userList.length;
        userList.push(User(addr, name, surname, email, telephone, orgId, userId));
        orgIdToUserList[orgId].push(userId);
        addressToId[addr] = userId;
        users.push(addr);
        emit Register(addr, name, surname, orgId);
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
    function insertUsersToAsset(uint assetId, uint[] memory userIds) public {
        uint cont = userIds.length;
        for (uint i = 0; i < cont; i++) {
            userIdToAssetList[userIds[i]].push(assetId);
            assetToListOfUsers[assetId].push(userIds[i]);
        }

        
    }

    function getUserAssets(uint userId) public view returns(uint[] memory assetIds){
        return userIdToAssetList[userId];
    }

    function getAssetUsers(uint assetId) public view returns(User[] memory){
        uint[] memory list = assetToListOfUsers[assetId];
        uint cont = list.length;
        User[] memory usersOfAsset = new User[](cont);
        for (uint i = 0; i < cont; i++) {
            usersOfAsset[i] = userList[list[i]];
        }
        return usersOfAsset;
    }


}