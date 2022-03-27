// ConnectButton.tsx
import { Button, Card, Typography } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const ConnectButton = () => {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);


  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <div>
        {/* {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH */}
        {account && `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
    </div> 
  ) : (
    <Button className='w-80 h-24' variant="contained" color="primary" onClick={handleConnectWallet}><Typography variant="h6">Ya tengo cuenta</Typography></Button>
  );
}


export default ConnectButton;