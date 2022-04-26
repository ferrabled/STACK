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
    


    function insertSoftware(string memory version, string memory provider, uint256 expirationDate, string memory stype) public {
        softwareList.push(Software(version, provider, expirationDate, stype));
    }


    function insertHardware(string memory model, string memory provider, string memory serialNumber, string memory htype) public {
        hardwareList.push(Hardware(model, provider, serialNumber, htype));
    }

    //??
    function insertData(string memory location, bool local) public {
            dataList.push(Data(location, local));
        }

    function insertNetwork(string memory cidrblock, bool nat) public {
        networkList.push(Network(cidrblock, nat));
    }

    function insertDocument(string memory description) public {
        documentList.push(Document(description));
    }

    function insertOther(string memory description) public {
        otherList.push(Other(description));
    }
}