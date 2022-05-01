const Main = artifacts.require('Main');
const DataStructs = artifacts.require('DataStructs');
const OrgUsers = artifacts.require('Users');

const fs = require('fs')

module.exports = function(deployer) {
    const finished=false;
    deployer.deploy(DataStructs).then(() => DataStructs.deployed())
    .then(DataStructs => 
        deployer.deploy(Main, DataStructs.address))
        .then(() => 
            deployer.deploy(OrgUsers))
            .then(()=> {
                let addresses = {
                    Main: Main.address,
                    DataStructs: DataStructs.address,
                    Users: OrgUsers.address
                }

                fs.writeFile('../frontend/src/assets/addresses.json', (JSON.stringify(addresses)), (err) => {
      
                // In case of a error throw err.
                if (err) throw err;
            })
    })
    
    
};