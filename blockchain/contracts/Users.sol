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


    struct Department {
        string name;
        string description;
        uint32 telephone;
        uint orgId;
        uint256 index;
    }

    Department[] private departList;
    mapping(uint256 => uint256[]) orgIdToDepartList;


    
    mapping(uint => mapping(uint => bool)) departToUserBool;
    mapping(uint => uint[]) departIdToUserList;


    function insertDepartment(string memory name,
        string memory description,
        uint32 telephone,
        uint orgId
        ) public {
            uint departId = departList.length;
            departList.push(Department(name, description, telephone, orgId, departId));
            orgIdToDepartList[orgId].push(departId);
    }

    function getDepartFromOrg(uint orgId) public view returns(Department[] memory){
        uint[] memory idList = orgIdToDepartList[orgId];
        uint cont = idList.length;
        Department[] memory departFromOrg = new Department[](cont);

        for (uint i = 0; i < cont; i++) {
            departFromOrg[i] = departList[idList[i]];
        }
        return departFromOrg;
    }



    //USERS from department
    function insertUserToDepartment(uint departId, uint[] memory userIds) public {
        uint cont = userIds.length;
        for (uint i = 0; i < cont; i++) {
            if(departToUserBool[departId][userIds[i]] == true) {
                revert("user already in department");
            } else {
                departIdToUserList[departId].push(userIds[i]);
                departToUserBool[departId][i] = true;
            }
            
        }
    }

    //If admin wants to delete any user from the department
    //first we will need to find that user 
    //and then delete the index 
    function deleteUsersFromDepartment(uint departId, uint[] memory userIds) public {
        uint userCont = userIds.length;
        for (uint i = 0; i < userCont; i++) {
            departToUserBool[departId][userIds[i]] = false;
            uint departUsers = departIdToUserList[departId].length;
            for(uint o = 0; o < departUsers; o++){
                if (departIdToUserList[departId][o] == userIds[i]){
                    for (uint e = o; e<departUsers-1; e++){
                        departIdToUserList[departId][e] = departIdToUserList[departId][e+1];
                    }
                    departIdToUserList[departId].pop();
                    break;
                }
            }
        }
    }


    function getUsersIdsFromDepart(uint departId) public view returns(uint[] memory){
        return departIdToUserList[departId];
        
    }



    function getUsersFromDepart(uint departId) public view returns(User[] memory){
        uint[] memory idList = departIdToUserList[departId];
        uint cont = idList.length;
        User[] memory usersFromDepart = new User[](cont);

        for (uint i = 0; i < cont; i++) {
            usersFromDepart[i] = userList[idList[i]];
        }
        return usersFromDepart;
    }



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

    function getNumUsersFromOrg(uint orgId) public view returns(uint){
        uint usersFromOrg = orgIdToUserList[orgId].length;
        return usersFromOrg;
    }



    function getUserData(uint userId) public view returns(User memory){
        return userList[userId];
    }

    //RELATION BETWEEN ASSET AND USER

    mapping(uint => uint[]) public userIdToAssetList;
    mapping(uint => uint[]) public assetToListOfUsers;


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