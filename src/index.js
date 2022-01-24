import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import "assets/styles/landing.css";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Final from "views/Final.js";
import Index from "views/Index.js";
import NFT_Create from "views/NFT_Create.js";
import NFT_Options from "views/NFT_Options";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const theme = extendTheme(config);

ReactDOM.render(
  <>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/final" exact component={Final} />
          <Route path="/pixel_canvas" exact component={NFT_Create} />
          <Route path="/options" exact component={NFT_Options} />
          <Route path="/" exact component={Index} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </>,
  document.getElementById("root")
);
