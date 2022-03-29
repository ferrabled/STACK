// ConnectButton.tsx
import { Button, Card, Typography } from "@mui/material";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { injected } from "components/wallet/connector";
import { ethers } from "ethers";
import { Navigate, useNavigate } from "react-router-dom";

const ConnectButton = () => {
  const navigate = useNavigate();

  //   const { activate, account, library, connector, active, deactivate } = useWeb3React()

  //   const [isActive, setIsActive] = useState(false)
  //   const [shouldDisable, setShouldDisable] = useState(false) // Should disable connect button while connecting to MetaMask
  //   const [isLoading, setIsLoading] = useState(true)

  //   useEffect(() => {
  //     connect().then(val => {
  //         setIsLoading(false)
  //     })
  // }, [])

  // // Check when App is Connected or Disconnected to MetaMask
  // const handleIsActive = useCallback(() => {
  //     console.log('App is connected with MetaMask ', active)
  //     setIsActive(active)
  // }, [active])

  // useEffect(() => {
  //     handleIsActive()
  // }, [handleIsActive])

  // Connect to MetaMask wallet
  const connect = async () => {
    // console.log('Connecting to MetaMask...')
    // setShouldDisable(true)
    // try {
    //     await activate(injected).then(() => {
    //         setShouldDisable(false)
    //     })
    // } catch(error) {
    //     console.log('Error on connecting: ', error)
    // }
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then(() => {
        console.log("Connect success");
        navigate("/home");
      })
      .catch(() => {
        console.log("adsdsadsasda");
      });
  };

  /*  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);


  function handleConnectWallet() {
    activateBrowserWallet();
  } */

  return (
    <Button
      className="w-80 h-24"
      variant="contained"
      color="primary"
      onClick={connect}
    >
      <Typography variant="h6">Ya tengo cuenta</Typography>
    </Button>
  );
  // return account ? (
  //   <div>
  //       {/* {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH */}
  //       {account && `${account.slice(0, 6)}...${account.slice(
  //             account.length - 4,
  //             account.length
  //           )}`}
  //   </div>
  // ) : (
  //   <Button className='w-80 h-24' variant="contained" color="primary" onClick={connect}><Typography variant="h6">Ya tengo cuenta</Typography></Button>
  // );
};

export default ConnectButton;
