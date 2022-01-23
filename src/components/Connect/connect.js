import React, { useState } from 'react';
import { ethers } from 'ethers'
import Web3Modal from "web3modal";

const generateMessageSignature = () => {
  return (
    '******************************************************************************** \n' +
    'Sign in Pixelate \n' +
    '******************************************************************************** \n' 
  );
}

const generateSignature = async (signer, userAddy ) => {
  let signed;
  const message = generateMessageSignature();
  signed = await signer.signMessage(message);
};



const Connect = (props) => {
  const [connected, setConnected] = useState(false);

  const Connection = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    if (signer._isSigner) {
      const userAddy = await signer.getAddress();
      const signature = await generateSignature(signer, userAddy);
      setConnected(true);
    } else {
      console.log('error');
    }
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