// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.10;


contract Main {

    event NewOrganization(address user, string name);
    event LogNewUser(address indexed userAddress, uint index, bytes32 userEmail, uint userAge);

    struct Organization{
        address admin;
        string name;
        string addressO;
        uint32 telephone;
        uint index;
    }

    Organization[] private organizations;
    address[] private userIndex;
    
    mapping(address => Organization) private addressToOrganization;
    uint orgCount;

    function isUser(address userAddress)
        public 
        view
        returns(bool isIndeed) 
    {
        if(userIndex.length == 0) return false;
        return (userIndex[addressToOrganization[userAddress].index] == userAddress);
    }

    function insertUser(
        address userAddress, 
        string memory name,
        string memory addressO,
        uint32 telephone) 
        public
        returns(uint index)
    {
        if(isUser(userAddress)) revert(); 
        addressToOrganization[userAddress].name = name;
        addressToOrganization[userAddress].addressO   = addressO;
        addressToOrganization[userAddress].telephone   = telephone;
        userIndex.push(userAddress);
        organizations.push(Organization(userAddress, name, addressO, telephone, organizations.length));
        addressToOrganization[userAddress].index = userIndex.length - 1;
        return userIndex.length-1;
    }

    function getOrg(uint _memberId) public view returns(Organization memory) {
        return organizations[_memberId];
  }


}
