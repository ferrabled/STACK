// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;
import './Main.sol';



contract DataStructs {
    //Create a struct for each type with its own data

    struct Software {
        string version;
        string provider;
        uint256 expirationDate;
        string stype;
    }

    //Try to enumerate

    struct Hardware {
        string model;
        string provider;
        string serialNumber;
        string htype;
    }

    struct Data {
        string location;
        bool local;
    }

    struct Network {
        string cidrblock;
        bool nat;
    }


    struct Document {
        string description;
    }

    struct Other {
        string description;

    }

    Software[] private softwareList;
    Hardware[] private hardwareList;
    Data[] private dataList;
    Network[] private networkList;
    Document[] private documentList;
    Other[] private otherList;
    
    mapping(uint => uint256) assetSoftware;
    mapping(uint => uint256) assetHardware;
    mapping(uint => uint256) assetData;
    mapping(uint => uint256) assetNetwork;
    mapping(uint => uint256) assetDocument;
    mapping(uint => uint256) assetOther;


    function insertSoftware(string memory version, string memory provider, uint256 expirationDate, string memory stype, uint assetId) public {
        softwareList.push(Software(version, provider, expirationDate, stype));
        assetSoftware[assetId] = (softwareList.length-1);
    }

    function insertHardware(string memory model, string memory provider, string memory serialNumber, string memory htype, uint assetId) public {
        hardwareList.push(Hardware(model, provider, serialNumber, htype));
        assetHardware[assetId] = (hardwareList.length-1);

    }

    function insertData(string memory location, bool local, uint assetId) public {
            dataList.push(Data(location, local));
            assetData[assetId] = (dataList.length-1);

        }

    function insertNetwork(string memory cidrblock, bool nat, uint assetId) public {
        networkList.push(Network(cidrblock, nat));
        assetNetwork[assetId] = (networkList.length-1);
    }

    function insertDocument(string memory description, uint assetId) public {
        documentList.push(Document(description));
        assetDocument[assetId] = (documentList.length-1);

    }

    function insertOther(string memory description, uint assetId) public {
        otherList.push(Other(description));
        assetOther[assetId] = (otherList.length-1);

    }


    function getSoftwareAsset(uint assetId) public view returns(Software memory){
        uint softId = assetSoftware[assetId];
        return softwareList[softId];
    }
}