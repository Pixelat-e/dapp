import React from "react";

// import Navbar from "components/Navbars/AuthNavbar.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import PixelCanvas from "components/PixelCanvas/PixelCanvas.js";
export default function NFT_Create() {
  return (
    <>
        <IndexNavbar fixed />
        <PixelCanvas/>
        <Footer />
    </>
  );
}
