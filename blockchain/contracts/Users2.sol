// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import "./Users.sol";
import "./Main.sol";

contract Users2 {

    address public usersAddr;
    address public mainAddr;

    constructor (address _usersAddr, address _mainAddr){
        usersAddr = _usersAddr;
        mainAddr = _mainAddr;
    }

    function insertNewSAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory version, 
        string memory provider, 
        uint8 stype,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewSoftAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, version, provider, stype);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
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
        uint8 htype,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewHardAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, model, provider, serialNumber, htype);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }

    function insertNewDocAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory description,
        string memory location,
        uint8 doctype,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewDocAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, description, location, doctype);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }

    function insertNewDataAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory location, 
        bool local,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewDataAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, location, local);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }

    function insertNewNAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory cidrblock, 
        bool nat,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewNetworkAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, cidrblock, nat);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }

    function insertNewCAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory url, 
        string memory domain,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewCloudAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, url, domain);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }

    function insertNewOAssetWithDepartment(string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        uint8 assetType,
        uint256 assetDepart,
        string memory description,
        address addr) public {
            Users userInstance = Users(usersAddr);
            if(!(userInstance.isAdminFromOrg(addr, organizationId) || userInstance.isUserFromDepart(addr, organizationId))) revert();
            Main mainInstance = Main(mainAddr);
            uint id = mainInstance.getIdAsset();
            mainInstance.insertNewOtherAsset(name, organizationId, adquireDate, creationDate, assetType, assetDepart, description);
            userInstance.insertNewAssetWithDepartment(assetDepart,id);
        }
}
