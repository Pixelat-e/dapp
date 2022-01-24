import React from "react";

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";


import BoardManager from "../components/PixelCanvas/BoardManager"; 

export default function NFT_Options() {

  let bm = new BoardManager();

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