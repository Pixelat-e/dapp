import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import PixelCanvas from "components/PixelCanvas/PixelCanvas.js";
export default function NFT_Create() {
  return (
    <>
        <Navbar transparent />
        <PixelCanvas className="bg-slate-700"/>
        <Footer />
    </>
  );
}
