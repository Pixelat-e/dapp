import React from "react";

import Navbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Raccoon1 from "assets/raccoon_1.png"
import Web3 from "web3";
import { useLocation } from 'react-router-dom'


export default function Final({}) {
  const location = useLocation()

  const { name, cname, desc } = location.state;

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/vectors/pixel-art-cyberpunk-metropolis-background-vector-id1279840008?k=20&m=1279840008&s=612x612&w=0&h=M_E3GNssqAkdszL4-1TIsPohgnIJbhyqWShC5wuU7Tw=&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">


          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">

              
                {/* <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("assets/img/team-2-800x800.jpg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                </div> */}



                <div className="flex flex-wrap justify-center py-40">
                  <div className="w-full lg:w-6/12 px-4 lg:order-1 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={Raccoon1}
                        className="shadow-xl h-auto align-middle border-none absolute  lg:-ml-16 max-w-210-px mt-12"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 lg:order-2">
                      <div className=" text-center">
                        <h3 className="text-4xl font-bold leading-normal mb-2 text-blueGray-700 mb-2">
                          Congratulations, your NFT has been minted!
                        </h3>
                        <div className="text-left">
                          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                            Name: {name}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            Community: {cname}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            Description: {desc}
                          </div>
                          {/* <div className="mb-2 text-blueGray-600">
                            Contact Address: {}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            Token ID: {}
                          </div>
                          <div className="mb-2 text-blueGray-600">
                            Chain: {}
                          </div> */}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
