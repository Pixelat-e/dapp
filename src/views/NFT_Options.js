import React, { useState } from "react";
import { ethers } from "ethers";
import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";
import Web3 from "web3";
import BoardManager from "../components/PixelCanvas/BoardManager";

const Moralis = require("moralis");
const SERVER_URL = "https://izaeqmus36qm.usemoralis.com:2053/server";
const APP_ID = "RcQ2ZZxeW4ZUFDYFK9hIi6QZHYE3iBl6M2HgjtU8";
const MASTER_KEY = "gahCQC0brERXzGssFIej2dkW2bv8QsYUaCAauni5";
//Polygon MATIC testnet
const nft_contract_address = "0x6ce167e780A30FC34e43a58D0DF957197d374005"; 
const web3 = new Web3(window.ethereum);





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
    // const file = new Moralis.File("test.img", { base64: imgUrl });

    // let imgFile = await bm.urltoFile(imgUrl,`${meta.name}.png`);

    const file = new Moralis.File(`${meta.name}.png`, { base64: imgUrl });
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

    // let contract = new ethers.Contract(nft_contract_address, NFT_ABI, web3);  //https://github.com/ethers-io/ethers.js/issues/478
    // const encodedFunction = web3.eth.abi.encodeFunctionCall({
    //   name: "mintToken",
    //   type: "function",
    //   inputs: [{
    //     type: 'string',
    //     name: 'tokenURI'
    //     }]
    // }, [_uri]);
  const encodedFunction = web3.eth.abi.encodeFunctionCall(
    {
      name: "mintToken",
      type: "function",
      inputs: [
        {
          type: "string",
          name: "tokenURI",
        },
      ],
    },
    [_uri]
  );

  // let ethereum = window.ethereum;
  const transactionParameters = {
    to: nft_contract_address,
    from: ethereum.selectedAddress,
    data: encodedFunction,
  };
  const txt = await ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  });
  return txt;
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
