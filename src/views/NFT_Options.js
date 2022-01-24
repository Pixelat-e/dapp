import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

const uploadNFT = async () => {
  //moralis config
  const Moralis = require("moralis/node");
  const SERVER_URL = "https://izaeqmus36qm.usemoralis.com:2053/server";
  const APP_ID = "RcQ2ZZxeW4ZUFDYFK9hIi6QZHYE3iBl6M2HgjtU8";
  const MASTER_KEY = "gahCQC0brERXzGssFIej2dkW2bv8QsYUaCAauni5";
  var img = new Image(); // Create new img element
  img.src = "../assets/raccoon_1.png"; // Set source path

  Moralis.start({ SERVER_URL, APP_ID, MASTER_KEY });

  // Save file input to IPFS
  const file = new Moralis.File("test", img);
  await file.saveIPFS();
  console.log(file.ipfs(), file.hash());
};

export default function NFT_Options() {
  return (
    <>
      <Navbar transparent />
      <div className="flex flex-row pt-32 pb-64">
        <div className="w-1/2 p-8">
          <img
            src="https://media.karousell.com/media/photos/products/2022/1/15/nft_digitalised_pixel_art_1642254510_bbb89d3b_progressive_thumbnail.jpg"
            alt="..."
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
                type="text"
                placeholder="Enter text here"
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
                type="text"
                placeholder="Enter text here"
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
                type="text"
                placeholder="Enter text here"
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
