// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;

contract Main {
    //EVENTS
    event NewOrganization(address user, string name);
    event LogNewUser(
        address indexed userAddress,
        uint256 index,
        bytes32 userEmail,
        uint256 userAge
    );

    //STRUCTS
    struct Organization {
        address admin;
        string name;
        string addressO;
        uint32 telephone;
        uint256 index;
    }

    struct Admin {
        address admin;
        string name;
        string lastname;
        string email;
        uint32 telephone;
        uint256 index;
    }

    //DATA
    Organization[] private organizations;
    uint256 orgCount;

    Admin[] private admins;
    uint256 adminsCount;

    //List of users with a org created (administrators)
    address[] private administrators;

    mapping(address => uint) public addressToOrganizationIndex;

    //FUNCTIONS

    //data created with organization
    function insertOrgAndAdmin(
        address admin,
        string memory name,
        string memory lastname,
        string memory email,
        uint32 adTelephone,
        string memory orgName,
        string memory orgAddress,
        uint32 orgTelephone
    ) public {
        if (isAdministrator(admin)) revert();
        insertAdmin(admin, name, lastname, email, adTelephone);
        insertOrganization(admin, orgName, orgAddress, orgTelephone);
        administrators.push(admin);
    }

    function insertAdmin(
        address admin,
        string memory name,
        string memory lastname,
        string memory email,
        uint32 telephone
    ) private {
        admins.push(
            (Admin(admin, name, lastname, email, telephone, admins.length))
        );
        adminsCount++;
    }

    function insertOrganization(
        address userAddress,
        string memory name,
        string memory addressO,
        uint32 telephone
    ) private {
        organizations.push(
            Organization(
                userAddress,
                name,
                addressO,
                telephone,
                organizations.length
            )
        );
        orgCount++;
        addressToOrganizationIndex[userAddress] = organizations.length -1;
    }

    // Check if the address has created a org, == is an administrator.
    function isAdministrator(address userAddress) public view returns (bool isIndeed) {
        if (administrators.length == 0) return false;
        return (administrators[addressToOrganizationIndex[userAddress]] ==
            userAddress);
    }

    function getOrg(uint256 _orgId)
        public
        view
        returns (Organization memory)
    {
        return organizations[_orgId];
    }

    function getAdminToOrg(address userAddress)
        public
        view
        returns (uint userid)
    {
        return addressToOrganizationIndex[userAddress];
    }

    //Get the organization if there is an address that created it
    function getOrgFromAddress(address userAddress) public view returns (Organization memory org) {
        if (isAdministrator(userAddress)) revert();
        uint orgId = getAdminToOrg(userAddress);
        Organization memory organ = getOrg(orgId);
        return organ;
    }


    //ASSETS TYPE AND FUNCTIONS
    struct Asset {
        string name;
        uint256 organziationId;
        uint256 adquireDate;
        uint256 creationDate;
        string assetType;
        uint256 index;

    }


    Asset[] private assetsList;
    //uint256 orgCount;
    


    //INNECESARY MAPPING
    mapping(uint256 => uint256) private assetToOrg;

    
    //CREAR UNA LISTA DE ID (ORG) A ASSETS?
    mapping(uint256 => uint256[]) private assetsFromOrg;
  

    function insertAsset(
        string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        string memory assetType
        ) public{
            assetsList.push(
                (Asset(name,
                    organizationId,
                    adquireDate,
                    creationDate,
                    assetType,
                    assetsList.length))
        );
        //adminsCount++;
        assetsFromOrg[organizationId].push(assetsList.length-1);
    }

    function getAsset (uint id) public view returns(Asset memory){
        return assetsList[id];
    }


    function getAllAssetsFromOrg (uint _orgId) public view returns(Asset[] memory) {
        uint cont = assetsFromOrg[_orgId].length;
        Asset[] memory listOrgAssets = new Asset[](cont);  
        for(uint i=0; i<cont; i++){
            uint assetId = assetsFromOrg[_orgId][i];
            listOrgAssets[i] = assetsList[assetId];
        }
        return listOrgAssets;
    }


    struct AssetEdited {
        string name;
        uint256 organziationId;
        uint256 adquireDate;
        uint256 creationDate;
        string assetType;
        bool deleted;
        uint256 index;
    
    }

    AssetEdited[] private assetsEditedList;
    //uint256 orgCount;
    mapping(uint256 => uint256) private assetEditedToAsset;


    uint256[] private assetsDeleted;


    //ASSETS ORIGINAL TO LIST OF ASSETS EDITED
    mapping(uint256 => uint256[]) private originalAssetsToEditedList;


    //CREAMOS UNA LISTA QUE RECOGE LOS id de los ASSETS ORIGINALES QUE TIENEN ALGUNA EDICIÓN
    uint256[] private assetsOriginalEdited;

    //CREAR MAPPING DE ID ORIGINAL A BOOLEAN QUE DICE SI EL ID ESTÁ EDITADO O NO
    mapping(uint256 => bool) private assetBoolEdited;
    //DE ESTA MANERA PODEMOS VER EN CADA CASO EL ID SI ESTÁ EDITADO O COMO


    function insertEditedAsset(
        uint256 originalAssetId,
        string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        bool deleted,
        string memory assetType
    ) public {
        //CHECK IF THE ASSET IS ALREADY IN ASSETS EDITED LIST
        if(!assetBoolEdited[originalAssetId]){
            assetsOriginalEdited.push(originalAssetId);
        }
        assetsEditedList.push(
                (AssetEdited(name,
                    organizationId,
                    adquireDate,
                    creationDate,
                    assetType,
                    deleted,
                    assetsList.length)));



    }
/* 
    //asset
    [1,2,3]
    //editados
    [1,2]

    //lista de assets eliminados []
    //

    /* /editado {
nombre, tipo, skjdalksjd, booldeleted
    listaborrados.push() cuando se elimine
    } */

    //mapping(editado=>asset)
    //mapping(asset=> []editado) para sacar el ultimo que se ha editado


    //assets editados (asset 1)
    //[]

    //boolean editar
    //marca eliminar 
}
