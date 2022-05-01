// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import './Main.sol';



contract DataStructs {
    //Create a struct for each type with its own data

    struct Software {
        string version;
        string provider;
        uint8 stype;
    }
    
    /* //TODO
    struct License {
        string name;
        string key;
        uint adquireDate;
        uint expirationDate;
        uint8 licenseType;
    } */

    struct Hardware {
        string model;
        string provider;
        string serialNumber;
        uint8 htype;
    }
    
    struct Document {
        string description;
        string location;
        uint8 doctype;
    }

    struct Data {
        string location;
        bool local;
    }

    struct Network {
        string cidrblock;
        bool nat;
    }

    struct Cloud {
        string url;
        string domain;
    }

    struct Other {
        string description;
    }

    Software[] private softwareList;
    Hardware[] private hardwareList;
    Document[] private documentList;
    Data[] private dataList;
    Network[] private networkList;
    Cloud[] private cloudList;
    Other[] private otherList;
    
    mapping(uint => uint256) assetSoftware;

    //TODO
    //Mapping for software & license relation;
    //mapping(uint => uint[]) softAssetToLicense;

    mapping(uint => uint256) assetHardware;
    mapping(uint => uint256) assetDocument;
    mapping(uint => uint256) assetData;
    mapping(uint => uint256) assetNetwork;
    mapping(uint => uint256) assetCloud;
    mapping(uint => uint256) assetOther;



    function insertSoftware(string memory version, string memory provider, uint8 stype, uint assetId) public {
        softwareList.push(Software(version, provider, stype));
        assetSoftware[assetId] = (softwareList.length-1);
    }

    function insertHardware(string memory model, string memory provider, string memory serialNumber, uint8 htype, uint assetId) public {
        hardwareList.push(Hardware(model, provider, serialNumber, htype));
        assetHardware[assetId] = (hardwareList.length-1);

    }

    function insertDocument(string memory description, string memory location, uint8 doctype, uint assetId) public {
        documentList.push(Document(description, location, doctype));
        assetDocument[assetId] = (documentList.length-1);

    }

    function insertData(string memory location, bool local, uint assetId) public {
            dataList.push(Data(location, local));
            assetData[assetId] = (dataList.length-1);
    }

    function insertNetwork(string memory cidrblock, bool nat, uint assetId) public {
        networkList.push(Network(cidrblock, nat));
        assetNetwork[assetId] = (networkList.length-1);
    }

    function insertCloud(string memory url, string memory domain, uint assetId) public {
        cloudList.push(Cloud(url, domain));
        assetNetwork[assetId] = (cloudList.length-1);
    }

    function insertOther(string memory description, uint assetId) public {
        otherList.push(Other(description));
        assetOther[assetId] = (otherList.length-1);
    }

    //GETTERS
    function getSoftwareAsset(uint assetId) public view returns(Software memory){
        uint softId = assetSoftware[assetId];
        return softwareList[softId];
    }

    function getHardwareAsset(uint assetId) public view returns(Hardware memory){
        uint hardId = assetHardware[assetId];
        return hardwareList[hardId];
    }

    function getDocAsset(uint assetId) public view returns(Document memory){
        uint docId = assetDocument[assetId];
        return documentList[docId];
    }

    function getDataAsset(uint assetId) public view returns(Data memory){
        uint dataId = assetData[assetId];
        return dataList[dataId];
    }

    function getNetworkAsset(uint assetId) public view returns(Network memory){
        uint networkId = assetNetwork[assetId];
        return networkList[networkId];
    }

    function getCloudAsset(uint assetId) public view returns(Cloud memory){
        uint cloudId = assetCloud[assetId];
        return cloudList[cloudId];
    }

    function getOtherAsset(uint assetId) public view returns(Other memory){
        uint otherId = assetOther[assetId];
        return otherList[otherId];
    }


    //Function to update a specific asset
    function updateSoftwareAsset(string memory version, string memory provider, uint8 stype, uint assetId) public {
        uint softId = assetSoftware[assetId];
        Software storage _software = softwareList[softId];
        _software.version = version;
        _software.provider = provider;
        _software.stype = stype;
    }

    function updateHardwareAsset(string memory model, string memory provider, string memory serialNumber, uint8 htype, uint assetId) public {
        uint hardId = assetHardware[assetId];
        Hardware storage _hardware = hardwareList[hardId];
        _hardware.model = model;
        _hardware.provider = provider;
        _hardware.serialNumber = serialNumber;
        _hardware.htype = htype;       
    }

    function updateDocAsset(string memory description, string memory location, uint8 doctype, uint assetId) public{
        uint docId = assetDocument[assetId];
        Document storage _document = documentList[docId];
        _document.description = description;
        _document.location = location;
        _document.doctype = doctype;
    }

    function updateDataAsset(string memory location, bool local, uint assetId) public{
        uint dataId = assetData[assetId];
        Data storage _data = dataList[dataId];
        _data.location = location;
        _data.local = local;
    }

    function updateNetworkAsset(string memory cidrblock, bool nat, uint assetId) public{
        uint networkId = assetNetwork[assetId];
        Network storage _network = networkList[networkId];
        _network.cidrblock = cidrblock;
        _network.nat = nat;
    }

    function updateCloudAsset(string memory url, string memory domain , uint assetId) public{
        uint cloduId = assetCloud[assetId];
        Cloud storage _cloud = cloudList[cloduId];
        _cloud.url = url;
        _cloud.domain = domain;
    }

    function updateOtherAsset(string memory description, uint assetId) public{
        uint otherId = assetOther[assetId];
        Other storage _other = otherList[otherId];
        _other.description = description;
    }
}