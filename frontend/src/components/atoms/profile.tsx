import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system'; 
import Identicon from './identicon';
import { ethers } from "ethers";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const AccountWallet = () => {
    const [account, setAccount] = useState("");
    useEffect(() => {
      const connect = () => {
            //@ts-ignore
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            provider
              .send("eth_requestAccounts", [])
              .then((r) => {
                console.log(r);
                console.log("Connect success");
                console.log("Retrieving Data from user");
                setAccount(r[0]);
              })
              .catch(() => {
                console.log("Error conectando la billetera");
              });
          };
      connect();
    }, [])
    

    return account ? (
    <div>
        <Box className="text-brand-lighter font-bold flex flex-row gap-3">
        {/* {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH */}
        <div className='flex flex-row justify-center gap-2'>
        {account && `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        
        <MenuOpenIcon/>
        </div>
        </Box>
    </div> 
  ) : (
    <div></div>
  );

}

export default AccountWallet;