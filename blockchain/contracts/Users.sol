// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import "./Main.sol";

contract Users {

    address public mainAddr;

    constructor (address _mainAddr){
        mainAddr = _mainAddr;
        departList.push(Department('0','0',0,0,0));
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


    function insertDepartment(string memory name,
        string memory description,
        uint32 telephone,
        uint orgId
        ) public {
            uint departId = departList.length;
            departList.push(Department(name, description, telephone, orgId, departId));
            orgIdToDepartList[orgId].push(departId);
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
        uint cont = userIds.length;
        for (uint i = 0; i < cont; i++) {
            if(departToUserBool[departId][userIds[i]] == true) {
                revert("User already in department");
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
                revert("Asset already in department");
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


    function insertNewSAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory version, 
        string memory provider, 
        uint8 stype) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewSoftAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, version, provider, stype);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }

    
    function insertNewHAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory model, 
        string memory provider, 
        string memory serialNumber, 
        uint8 htype) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewHardAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, model, provider, serialNumber, htype);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }

    function insertNewDocAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory description,
        string memory location,
        uint8 doctype) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewDocAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, description, location, doctype);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }

    function insertNewDataAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory location, 
        bool local) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewDataAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, location, local);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }


    function insertNewNAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory cidrblock, 
        bool nat) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewNetworkAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, cidrblock, nat);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }


    function insertNewCAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory url, 
        string memory domain) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewCloudAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, url, domain);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }

    function insertNewOAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory description) public {
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewOtherAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, description);
            departIdToAssetList[assetDepart].push(id);
            departToAssetBool[assetDepart][id] = true;
        }

        


}