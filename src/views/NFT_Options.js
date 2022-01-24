import React, { useState } from "react";
import { ethers } from "ethers";

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";

import BoardManager from "../components/PixelCanvas/BoardManager";

const Moralis = require("moralis");
const SERVER_URL = "https://izaeqmus36qm.usemoralis.com:2053/server";
const APP_ID = "RcQ2ZZxeW4ZUFDYFK9hIi6QZHYE3iBl6M2HgjtU8";
const MASTER_KEY = "gahCQC0brERXzGssFIej2dkW2bv8QsYUaCAauni5";
const nft_contract_address = "0x351bbee7C6E9268A1BF741B098448477E08A0a53"; //0xDC80F8AcDB95145814381638BfbedF518deb177c;
let web3 = new ethers.providers.Web3Provider(window.ethereum);

let NFT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]



export default function NFT_Options() {
  let bm = new BoardManager();
  const [imgUrl, setImgUrl] = useState(bm.getLocalImg());
  const [meta, setMeta] = useState({
    name: "",
    cname: "",
    description: "",
  });

  const handleInputChange = (e) => {
    // console.log(e);
    let newVal = e.target.value;
    // if (e.target.name == "width"){

    // }
    setMeta({
      ...meta,
      [e.target.name]: newVal,
    });
  };

  const uploadImg = async () => {
    const file = new Moralis.File("test.img", { base64: imgUrl });
    await file.saveIPFS({ useMasterKey: true });
    console.log(file.ipfs(), file.hash());
    return file;
  };

  const uploadMeta = async () => {
    const metadata = meta;
    console.log(meta);
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });
    await metadataFile.saveIPFS();
    return metadataFile;
  };

  const uploadNFT = async () => {
    //moralis config

    // var img = new Image(); // Create new img element
    // img.setAttribute('src', imgUrl);
    // img.addEventListener("load", async () => {
    //   Moralis.start({ SERVER_URL, APP_ID, MASTER_KEY });

    //   // Save file input to IPFS
    //   const file = new Moralis.File("test", img);
    //   await file.saveIPFS();
    //   console.log(file.ipfs(), file.hash());
    // });
    // console.log(`imgUrl: ${imgUrl.length()}`)

    Moralis.start({
      serverUrl: SERVER_URL,
      appId: APP_ID,
      masterKey: MASTER_KEY,
    });

    await Moralis.Web3.authenticate().then((user) => {
      console.log(user);
    });
    // Save file input to IPFS
    let uploadedImg = uploadImg();
    let uploadedMeta = await uploadMeta();
    const metadataURI = uploadedMeta.ipfs();
    console.log(`metadataURI: ${metadataURI}`);
    const txt = await mintToken(metadataURI);
    console.log(`Minted token: ${txt}`);
  };

  const mintToken = async (_uri) => {
    let ethereum = window.ethereum;
    console.log(`ethereum.selectedAddress: ${ethereum.selectedAddress}`)
    // "function mintToken(string tokenURI)"
    // let ABI = [
    //   {
    //     name: "mintToken",
    //     type: "function",
    //     inputs: [
    //       {
    //         type: "string",
    //         name: "tokenURI",
    //       },
    //     ],
    //   },
    // ];
    // let iface = new ethers.utils.Interface(NFT_ABI);
    // iface.encodeFunctionData("mintToken",[
    //   _uri,
    // ])

    // ABI = [
    //   {
    //     name: "eth_sendTransaction",
    //     type: "function",
    //     inputs: [
    //       {
    //         type: "string",
    //         name: "to"
    //       },
    //       {
    //         type: "string",
    //         name: "from"
    //       },
    //       {
    //         type: "function",
    //         name: "data"
    //       }
    //     ]
    //   }
    // ]

    let contract = new ethers.Contract(nft_contract_address, NFT_ABI, web3);  //https://github.com/ethers-io/ethers.js/issues/478
    // const encodedFunction = web3.eth.abi.encodeFunctionCall({
    //   name: "mintToken",
    //   type: "function",
    //   inputs: [{
    //     type: 'string',
    //     name: 'tokenURI'
    //     }]
    // }, [_uri]);

    // const transactionParameters = {
    //   to: nft_contract_address,
    //   from: ethereum.selectedAddress,
    //   data: encodedFunction
    // };
    // const txt = await ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters]
    // });
    contract.eth_sendTransaction(nft_contract_address,ethereum.selectedAddress,iface.getFunction())
    return await contract.getValue();
  };

  return (
    <>
      <Navbar transparent />
      <div className="flex flex-row pt-32 pb-64">
        <div className="w-1/2 p-8">
          <img
            src={bm.getLocalImg()}
            alt="https://media.karousell.com/media/photos/products/2022/1/15/nft_digitalised_pixel_art_1642254510_bbb89d3b_progressive_thumbnail.jpg"
            className="shadow-lg rounded max-w-full h-auto align-middle border-none"
          />
        </div>
        <div class="w-1/2">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="p-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                NFT Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                type="text"
                value={meta.name}
                placeholder="Enter text here"
                onChange={handleInputChange}
              />
            </div>
            <div class="p-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="cname"
              >
                Community Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cname"
                name="cname"
                value={meta.cname}
                type="text"
                placeholder="Enter text here"
                onChange={handleInputChange}
              />
            </div>
            <div class="p-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="description"
              >
                Description
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                name="description"
                value={meta.description}
                type="text"
                placeholder="Enter text here"
                onChange={handleInputChange}
              />
            </div>

            <div class="md:flex md:items-center p-4">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="button"
                  onClick={uploadNFT}
                >
                  FINISH
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
