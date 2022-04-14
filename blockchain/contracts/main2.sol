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

    mapping(address => uint256) public addressToOrganizationIndex;

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
        addressToOrganizationIndex[userAddress] = organizations.length - 1;
    }

    // Check if the address has created a org, == is an administrator.
    function isAdministrator(address userAddress)
        public
        view
        returns (bool isIndeed)
    {
        if (administrators.length == 0) return false;
        return (administrators[addressToOrganizationIndex[userAddress]] ==
            userAddress);
    }

    function getOrg(uint256 _orgId) public view returns (Organization memory) {
        return organizations[_orgId];
    }

    function getAdminToOrg(address userAddress)
        public
        view
        returns (uint256 userid)
    {
        return addressToOrganizationIndex[userAddress];
    }

    //Get the organization if there is an address that created it
    function getOrgFromAddress(address userAddress)
        public
        view
        returns (Organization memory org)
    {
        if (isAdministrator(userAddress)) revert();
        uint256 orgId = getAdminToOrg(userAddress);
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

    //UNNECESARY MAPPING
    //mapping(uint256 => uint256) private assetToOrg;

    //CREAR UN MAPPING DE ORGANIZACIÓN (ID) A LISTA DE ASSETS (ID)?
    mapping(uint256 => uint256[]) private assetsFromOrg;

    //ASSET EDITED INTRODUCES A BOOL DELETED
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

    //ASSETS ORIGINAL TO LIST OF ASSETS EDITED
    mapping(uint256 => uint256[]) private originalAssetsToEditedList;

    function insertAsset(
        string memory name,
        uint256 organizationId,
        uint256 adquireDate,
        uint256 creationDate,
        string memory assetType
    ) public {
        assetsList.push(
            (
                Asset(
                    name,
                    organizationId,
                    adquireDate,
                    creationDate,
                    assetType,
                    assetsList.length
                )
            )
        );
        //adminsCount++;
        assetsFromOrg[organizationId].push(assetsList.length - 1);
        assetBoolEditedAndDeleted[assetsList.length - 1].push(false);
        assetBoolEditedAndDeleted[assetsList.length - 1].push(false);
        originalAssetsToEditedList[assetsList.length - 1];
    }

    function getAsset(uint256 id) public view returns (Asset memory) {
        return assetsList[id];
    }

    function getAdmin(uint256 _adminId) public view returns (Admin memory) {
        return admins[_adminId];
    }

    function getAllAssetsFromOrg(uint256 _orgId)
        public
        view
        returns (Asset[] memory, AssetEdited[] memory)
    {
        uint256 cont = assetsFromOrg[_orgId].length;
        Asset[] memory listOrgAssets = new Asset[](cont);
        AssetEdited[] memory listOrgAssetsEdited = new AssetEdited[](cont);
        for (uint256 i = 0; i < cont; i++) {
            //First check if that asset has been deleted
            //so we don't retrieve it
            if (assetBoolEditedAndDeleted[i][1]) {
                continue;
            }
            //Check if asset has been edited in order
            //to retrieve last edited asset
            if (assetBoolEditedAndDeleted[i][0] == true) {
                uint256 lastItem = originalAssetsToEditedList[i].length - 1;
                uint256 assetEditedId = originalAssetsToEditedList[i][lastItem];
                listOrgAssetsEdited[i] = assetsEditedList[assetEditedId];
                //Last case the asset hasn't been edited
            } else {
                uint256 assetId = assetsFromOrg[_orgId][i];
                listOrgAssets[i] = assetsList[assetId];
            }
        }
        return (listOrgAssets, listOrgAssetsEdited);
    }

    //CREAMOS UNA LISTA QUE RECOGE LOS id de los ASSETS ORIGINALES QUE TIENEN ALGUNA EDICIÓN
    //uint256[] private assetsOriginalEdited;

    //CREAR MAPPING DE ID ORIGINAL A LIST OF BOOLEAN
    // QUE INDICA SI EL ID ESTÁ EDITADO EN EL PRIMER VALOR
    // EN EL SEGUNDO VALOR INDICA SI ESTÁ ELIMINADO
    mapping(uint256 => bool[]) private assetBoolEditedAndDeleted;
    //DE ESTA MANERA PODEMOS VER EN CADA CASO EL ID SI ESTÁ EDITADO O ELIMINADO

    //mapping que relaciona la org con los assets que tiene eliminados
    mapping(uint256 => uint256[]) private assetsFromOrgDeleted;

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
        if (!assetBoolEditedAndDeleted[originalAssetId][0]) {
            assetBoolEditedAndDeleted[originalAssetId][0] = true;
        }
        assetsEditedList.push(
            (
                AssetEdited(
                    name,
                    organizationId,
                    adquireDate,
                    creationDate,
                    assetType,
                    deleted,
                    assetsEditedList.length
                )
            )
        );
        originalAssetsToEditedList[originalAssetId].push(
            assetsEditedList.length - 1
        );

        if (deleted == true) {
            assetsFromOrgDeleted[organizationId].push(
                assetsEditedList.length - 1
            );
            assetBoolEditedAndDeleted[originalAssetId][1] = true;
        }
    }

    function getAssetsDeleted(uint256 orgId)
        public
        view
        returns (AssetEdited[] memory)
    {
        uint256 cont = assetsFromOrgDeleted[orgId].length;
        AssetEdited[] memory listAssetsDeleted = new AssetEdited[](cont);
        for (uint256 i = 0; i < cont; i++) {
            uint256 id = assetsFromOrgDeleted[orgId][i];
            listAssetsDeleted[i] = assetsEditedList[id];
        }
        return listAssetsDeleted;
    }

    function getIsAssetEdited(uint256 idAsset)
        public
        view
        returns (bool result)
    {
        return assetBoolEditedAndDeleted[idAsset][0];
    }

    function getIsAssetDeleted(uint256 idAsset)
        public
        view
        returns (bool result)
    {
        return assetBoolEditedAndDeleted[idAsset][1];
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
