import React from "react";

import Logo from "assets/Logo.svg";
import { AccountWallet } from "components/atoms";
import { ethers } from "ethers";

declare var window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum);

const AppHeader = () => {
  const isConnected = async () => {
    try {
      const addresses = await provider.listAccounts();
      console.log(addresses.length);
      if(addresses.length > 0) return true;
      else return false;
      //const isWalletConnected = window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch {
      console.log("No se ha encontrado Metamask");
      return false;
    }
  };

  const wallet = isConnected()



  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between gap-5 rounded-b-xl bg-brand px-4 py-3 md:px-8 lg:px-24 xl:px-48">
      {/* <img src={Logo} alt="React Logo" className="h-6" /> */}
      <span className="font-bold">
        <span className="text-brand-light">Gestor</span>
        <span className="text-brand-lighter">Blockchain</span>
      </span>
      {/* {wallet && (
         <AccountWallet />
      )} */}
     
    </header>
  );
};

export default AppHeader;
