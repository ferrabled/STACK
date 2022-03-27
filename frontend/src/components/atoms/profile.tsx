import React from 'react';
import { useEthers, useEtherBalance } from "@usedapp/core";
import { Box } from '@mui/system'; 
import Identicon from './identicon';

const AccountWallet = () => {
    const {activateBrowserWallet, account } = useEthers();


    return account ? (
    <div>
        <Box className="text-brand-lighter font-bold flex flex-row gap-3">
        {/* {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH */}
        <div>
        {account && `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </div>
        <Identicon/>
        </Box>
    </div> 
  ) : (
    <div></div>
  );

}

export default AccountWallet;