pragma solidity >=0.7.0 <0.9.10;


contract main {

    event NewOrganization(address user, string name);

    struct Organization{
        address admin;
        string name;
        uint8 flag;
    }

    struct Area{
        Organization organization;
        string name;
    }

    struct Person{
        address wallet;
        string name;
    }

    Organization[] public organizations;
    Area[] public areas;
    mapping(address => Organization) private addressToOrganization;
    mapping(address => Area) personToArea;


    function getUser(address user) public pure returns (address) {
        return user;
    }

    /* function getOrganizationInt(address admin) public returns (uint){
        for ( uint i=0; i < organizations.len; i++) {
            if (organizations[i].admin == admin){
                return i; 
            }

        }
    }
 */
    function _createOrganization(string memory name) public {
        organizations.push(Organization(msg.sender, name, 1)); 
        addressToOrganization[msg.sender] = Organization(msg.sender, name, 1);
        emit NewOrganization(msg.sender, name);
    }

    function _createArea(address admin, string memory orgName, string memory name) public {
        require ((addressToOrganization[msg.sender].flag) > 0);
        //require ((string) addressToOrganization[msg.sender].name ==  orgName);
        //uint orgInt = getOrganizationInt(msg.sender);
        uint orgInt = 0;
        areas.push(organizations[orgInt], name); 
        emit NewOrganization(admin, name);
    }
}