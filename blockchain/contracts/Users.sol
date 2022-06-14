// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import "./Main.sol";

contract Users {

    address public mainAddr;

    constructor (address _mainAddr){
        mainAddr = _mainAddr;
        departList.push(Department('0','0',0,0,0));
    }

    event NewDepart(
        address addr,
        string name,
        uint telephone
    );

    event NewComment(
        address addr,
        uint date
    );

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

    function getUserFromAddr(address addr) public view returns(User memory){
        uint userId = addressToId[addr];
        return userList[userId];
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
        if(isAdminFromOrg(addr, orgId)) revert("user is admin");
        if(isUser(addr)) revert("Address registered");
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

    function deleteUsersFromAsset(uint assetId, uint[] memory userIds) public {
        uint cont = userIds.length;
        for (uint i = 0; i < cont; i++) {
            for(uint o = 0; o < cont; o++){  
                uint assetUsers = assetToListOfUsers[assetId].length;
                if (assetToListOfUsers[assetId][o] == userIds[i]){
                    for (uint e = o; e < assetUsers-1; e++){
                        assetToListOfUsers[assetId][e] = assetToListOfUsers[assetId][e+1];
                    }
                    assetToListOfUsers[assetId].pop();
                    break;
                }
            } 
            for(uint o = 0; o < cont; o++){  
                uint usersAssets = userIdToAssetList[userIds[i]].length;
                if (userIdToAssetList[userIds[i]][o] == assetId){
                    for (uint e = o; e < usersAssets-1; e++){
                        userIdToAssetList[userIds[i]][e] = userIdToAssetList[userIds[i]][e+1];
                    }
                    userIdToAssetList[userIds[i]].pop();
                    break;
                }
            }
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

    //DEPARTMENTS
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

    function isUserFromOrg(address addr, uint orgId) public view returns(bool){
        if (users.length == 0) return false;
        if (!isUser(addr)) return false;
        uint userId = addressToId[addr];
        uint userOrg = userList[userId].orgId;
        return (userOrg == orgId);
    }

    function isUserFromDepart(address addr, uint departId) public view returns(bool){
        if (users.length == 0) return false;
        if (!isUser(addr)) return false;
        uint userId = addressToId[addr];
        return (departToUserBool[departId][userId]);
    }

    function isAdminFromOrg(address addr, uint orgId) public view returns (bool){
        Main mainInstance = Main(mainAddr);
        return mainInstance.isAdminFromOrg(addr, orgId);
    }

    function insertDepartment(string memory name,
        string memory description,
        uint32 telephone,
        uint orgId,
        address addr
        ) public {
            if(!(isAdminFromOrg(addr, orgId) || isUserFromOrg(addr, orgId))) revert();         
            uint departId = departList.length;
            departList.push(Department(name, description, telephone, orgId, departId));
            orgIdToDepartList[orgId].push(departId);
            emit NewDepart(addr, name, telephone);
    }

    function getDepartment(uint departId) public view returns(Department memory){
        return departList[departId];
    }

    function getAllDepartmentsFromOrg(uint orgId) public view returns(Department[] memory){
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
        //if(!isAdminFromOrg(addr, orgId)) revert(");
        uint cont = userIds.length;
        for (uint i = 0; i < cont; i++) {
            if(departToUserBool[departId][userIds[i]] == true) {
                revert("User in dep");
            } else {
                departIdToUserList[departId].push(userIds[i]);
                departToUserBool[departId][userIds[i]] = true;
            }
            
        }
    }

    //If admin wants to delete any user from the department
    //first we will need to find that user 
    //and then delete the index 
    function deleteUsersFromDepartment(uint departId, uint[] memory userIds) public {
        uint userCont = userIds.length;
        for (uint i = 0; i < userCont; i++) {
            if(departToUserBool[departId][userIds[i]] == true) {
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

    mapping(uint => mapping(uint => bool)) departToAssetBool;
    mapping(uint => uint[]) departIdToAssetList;

    //ASSETS from department
    function insertAssetToDepartment(uint departId, uint[] memory assetsIds) public {
        uint cont = assetsIds.length;
        for (uint i = 0; i < cont; i++) {
            if(departToAssetBool[departId][assetsIds[i]] == true) {
                revert("Asset in dep");
            } else {
                departIdToAssetList[departId].push(assetsIds[i]);
                departToAssetBool[departId][assetsIds[i]] = true;
                Main mainInstance = Main(mainAddr);
                mainInstance.insertAssetToDepartment(assetsIds[i], departId);
            }
            
        }
    }

    function deleteAssetFromDepartment(uint departId, uint[] memory assetsIds) public {
        uint assetCont = assetsIds.length;
        for (uint i = 0; i < assetCont; i++) {
            if(departToAssetBool[departId][assetsIds[i]] == true) {
                departToAssetBool[departId][assetsIds[i]] = false;
                uint departAssets = departIdToAssetList[departId].length;
                for(uint o = 0; o < departAssets; o++){
                    if (departIdToAssetList[departId][o] == assetsIds[i]){
                        for (uint e = o; e < departAssets-1; e++){
                            departIdToAssetList[departId][e] = departIdToAssetList[departId][e+1];
                        }
                        departIdToAssetList[departId].pop();
                        Main mainInstance = Main(mainAddr);
                        mainInstance.insertAssetToDepartment(assetsIds[i], 0);
                        break;
                    }
                }
            }
        }
    }

    function getAssetsIdsFromDepart(uint departId) public view returns(uint[] memory){
        return departIdToAssetList[departId];
        
    }

    function insertNewAssetWithDepartment(uint assetDepart, uint id) public{
        departIdToAssetList[assetDepart].push(id);
        departToAssetBool[assetDepart][id] = true;    
    }

    //COMMENTS
    struct Comment {
        string description;
        uint userId;
        uint date;
    }

    Comment[] commentList;
    mapping(uint => uint[]) assetIdToCommentList; 

    function insertComment(string memory description, uint date, uint assetId, uint orgId, address addr) public {
        if(isAdminFromOrg(addr, orgId)) revert("is Administrator");
        if(!isUserFromOrg(addr, orgId)) revert("User isn't in org");
        uint userId = addressToId[addr];
        uint comId = commentList.length;
        commentList.push(Comment(description, userId, date));
        assetIdToCommentList[assetId].push(comId);
        emit NewComment(addr, date);
    }

    function getCommentsByAsset(uint assetId) public view returns(Comment[] memory){
        uint[] memory ids = assetIdToCommentList[assetId];
        Comment[] memory comments = new Comment[](ids.length);
        for (uint256 i = 0; i < ids.length; i++) {
            comments[i] = commentList[ids[i]];
        }
        return comments;
    }

    function getNumberOfCommentsByAsset(uint assetId) public view returns(uint){
        uint[] memory ids = assetIdToCommentList[assetId];
        return ids.length;
    }

    function getUsersById(uint[] memory usersId) public view returns(User[] memory){
        User[] memory container = new User[](usersId.length);
        for (uint256 i = 0; i < usersId.length; i++) {
            container[i] = userList[usersId[i]];
        }
        return container;
    }
}