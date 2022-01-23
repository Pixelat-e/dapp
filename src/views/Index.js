/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import AutoPlay from "components/Autoplay/autoplay";


export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
    
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-white ">
                A long time ago in a galaxy far, far away...
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Without the hassle, here, creating your own NFT is guaranteed to be {" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-white "
                  target="_blank"
                >
                  Simple and Easy
                </a>
              </p>
              <div className="mt-12">
                <a
                  href=""
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-48 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/galazy.png").default}
          alt="..."
        />

        
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        
        <div className="container mx-auto pb-16">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
              <div className="relative flex flex-col min-w-0 w-full mb-6 mt-48 md:mt-0">
                <img
                  alt="..."
                  src={require("assets/punk3100.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-120-px z-3 left-145-px -top-29-px"
                />
                <img
                  alt="..."
                  src={require("assets/raccoon_2.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                />
                <img
                  alt="..."
                  src={require("assets/raccoon_3.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px -top-225-px left-40-px z-2"
                />
                <img
                  alt="..."
                  src={require("assets/raccoon_4.png").default}
                  className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                />
                <img
                  alt="..."
                  src={require("assets/raccoon_5.png").default}
                  className="w-full align-middle rounded absolute shadow-lg max-w-200-px -left-200-px -top-150-px"
                />
                <img
                  alt="..."
                  src={require("assets/raccoon_6.png").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-210-px left-260-px top-95-px"
                />
                <img
                  alt="..."
                  src={require("assets/cryptopunk0465.png").default}
                  className="w-full align-middle rounded absolute shadow-xl max-w-210-px left-420-px -top-94-px"
                />
              </div>
            </div>
          </div>

        </div>
        <div className="justify-center text-center flex flex-wrap pt-48 mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-bold text-4xl mb-12">3 Steps to Mint</h2>
          </div>
        </div>
        <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-1/5 px-16">
                  <h5 className="text-xl font-bold pb-4 text-center text-lightBlue-600" >
                    Import Base
                  </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/base.jpg").default}
                      />
                      
                    </div>
                </div>
                <div className="w-full lg:w-1/5 px-16">
                  <div>
                    <i class="fas fa-arrow-alt-circle-right fa-4x mt-20 text-pink-400"></i>
                    </div>
                </div>

                <div className="w-full lg:w-1/5 px-16">
                  <h5 className="text-xl font-bold pb-4 text-center text-lightBlue-600">
                    Mint
                  </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/base2.jpg").default}
                      />
                    </div>
                </div>
                <div className="w-full lg:w-1/5 px-16">
                  <div>
                    <i class="fas fa-arrow-alt-circle-right fa-4x mt-20 text-pink-400"></i>
                    </div>
                </div>

                <div className="w-full lg:w-1/5 px-16">
                  <h5 className="text-xl font-bold pb-4 text-center text-lightBlue-600">
                    Mint
                  </h5>
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/base2.jpg").default}
                      />
                    </div>

                </div>
        </div>
        <div className="justify-center text-center flex flex-wrap pt-48 mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-bold text-4xl mb-12">Join a community</h2>
            
          </div>
          <AutoPlay/>
        </div>
    
      </section>
      <Footer />
    </>
  );
}
