import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import PixelCanvas from "components/PixelCanvas/PixelCanvas.js";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

export default function NFT_Create() {
  return (
    <>
      <ChakraProvider>
        <Navbar transparent />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <PixelCanvas />
        <Footer />
      </ChakraProvider>
    </>
  );
}
