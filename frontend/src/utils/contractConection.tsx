import React from "react";
import { ethers } from "ethers";

declare var window: any;
const contractAddress = "0xb54bE39B89F34BAC8Dc5d58b5e0F4a261099e185";
const mainABI = require("./mainABI.json");

const insertOrgAndAdmin = async (props: any) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    mainABI,
    provider.getSigner()
  );
  console.log("!!!");
  const signer = provider.getSigner();
  let signerAddress = await signer.getAddress();
  console.log(props)

  await contract.insertOrgAndAdmin(
    signerAddress,
    props.firstName,
    props.lastName,
    props.email,
    props.telephoneA,
    props.orgName,
    props.address,
    props.telOrg
  );
};

export default insertOrgAndAdmin;
