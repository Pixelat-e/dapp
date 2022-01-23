import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import Web3 from "web3";

const generateMessageSignature = () => {
  return (
    "******************************************************************************** \n" +
    "Sign in Pixelate \n" +
    "******************************************************************************** \n"
  );
};

const generateSignature = async (signer, userAddy) => {
  let signed;
  const message = generateMessageSignature();
  signed = await signer.signMessage(message);
};

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

//https://dev.to/hideckies/ethers-js-cheat-sheet-1h5j
const Connect = (props) => {
  const [connected, setConnected] = useState(false);


  useEffect(()=>{
    Connection();
  },[])

  const Connection = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let isConnected = await checkConnection(provider) 
    if (isConnected){
      setConnected(true);
      return;
    }

    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(connection);
    
    
    const signer = provider.getSigner();
    if (signer._isSigner) {
      const userAddy = await signer.getAddress();
      const signature = await generateSignature(signer, userAddy);
      setConnected(true);
    } else {
      console.log("error");
    }
  };

  const checkConnection = async (provider) => {
    let accs = await provider.listAccounts();
    if (accs.length > 0){
      console.log("accs")
      console.log(accs)
      return true;
    }
    return false;
    // // Check if browser is running Metamask
    // let web3;
    // if (window.ethereum) {
    //   web3 = new Web3(window.ethereum);
    // } else if (window.web3) {
    //   web3 = new Web3(window.web3.currentProvider);
    // }

    // // Check if User is already connected by retrieving the accounts
    // await web3.eth.getAccounts().then(async (addr) => {
    //   // Set User account into state
    //   console.log(addr);
    //   setConnected(true);
    //   return true;
    // });


  };

  return (
    <>
      <button
        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
        type="button"
        onClick={Connection}
      >
        {!connected ? <p>Connect wallet</p> : <p>Connected</p>}
      </button>
    </>
  );
};

export default Connect;
