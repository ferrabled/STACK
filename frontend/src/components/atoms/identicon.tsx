import React, { useState } from "react";

import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import styled from "@emotion/styled";
import { ethers } from "ethers";
import Jazzicon from "@metamask/jazzicon";


const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;

export default function Identicon() {
  const [account, setAccount] = useState('');
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
  provider.send("eth_requestAccounts", []).then(
    () => provider.getSigner().getAddress().then((r)=> setAccount(r)))


  const ref = useRef<HTMLDivElement>();


  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);
  
  return <StyledIdenticon ref={ref as any} />
}