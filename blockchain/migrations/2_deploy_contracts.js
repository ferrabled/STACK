const Main = artifacts.require('Main');
const DataStructs = artifacts.require('DataStructs');
const OrgUsers = artifacts.require('Users');
const Users2 = artifacts.require('Users2');

const fs = require('fs')

module.exports = function(deployer) {
    const finished=false;
    deployer.deploy(DataStructs).then(() => DataStructs.deployed())
    .then(DataStructs => 
        deployer.deploy(Main, DataStructs.address))
        .then(async (Main) => {
           const OrgUsersD = await deployer.deploy(OrgUsers, Main.address);
           const Users2D = await deployer.deploy(Users2, OrgUsersD.address, Main.address);
        }).then(()=>{
                    let addresses = {
                        Main: Main.address,
                        DataStructs: DataStructs.address,
                        Users: OrgUsers.address,
                        Users2: Users2.address
                    }
    
                    fs.writeFile('../frontend/src/assets/addresses.json', (JSON.stringify(addresses)), (err) => {
          
                    // In case of a error throw err.
                    if (err) throw err;
                });
                
            })    
    
};