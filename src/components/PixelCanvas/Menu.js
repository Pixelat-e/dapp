import React, { useState, useEffect } from "react";
import { Flex, Button, useColorMode } from "@chakra-ui/react";
import { DownloadIcon, AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const PixelMenu = ({ board_manager }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const downloadHandler = () => {
    board_manager.save();
  };

  const uploadHandler = () => {
    board_manager.addImage();
  }

  const newProjectHandler = () => {
    board_manager.newProject();
  };

  const toDetailsHandler = () => {
    // board_manager.newProject();
    board_manager.saveInLocal();
    // window.location("/options");
    window.location.href = "/options";
  };

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      color={colorMode == "light" ? "gray.800" : "gray.100"}
    >
      <Button className="m-4" onClick={newProjectHandler}>
        <AddIcon />
        <div className="mx-4">New</div>
      </Button>
      <Button className="m-4" onClick={uploadHandler}>
        <i className="fas fa-upload"></i>
        <div className="mx-4">Upload Image</div>
      </Button>
      <Button className="m-4" onClick={downloadHandler}>
        <DownloadIcon />
        <div className="mx-4">Download</div>
      </Button>
      <Button className="m-4" onClick={toDetailsHandler}>
        {/* <a href="/details"> */}
        <ArrowForwardIcon />
        <div className="mx-4">Next</div>
        {/* </a> */}
      </Button>
    </Flex>
  );
};

export default PixelMenu;
