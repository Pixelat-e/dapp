import { Flex } from "@chakra-ui/react";
import { colors } from "./config";
import { ChromePicker } from "react-color";
import React, { useState, useEffect } from "react";
const COLOR_PICKER_TYPE = "chrome";

const Palette = ({ board_manager }) => {
  const getColor = () => {
    let color = board_manager.getCurBrushColor();
    return (
      "rgba(" +
      color[0] +
      "," +
      color[1] +
      "," +
      color[2] +
      "," +
      color[3] +
      ")"
    );
  };
  const [curColor, setColor] = useState(getColor());
  const selectColor = (color) => {
    return () => {
      // setColor(color);
      board_manager.setCurBrushColor(color);
      // act(this);
    };
  };

  const handleChange = (color, event) => {
    let rgba = color.rgb;
    setColor(
      "rgba(" +
        rgba["r"] +
        "," +
        rgba["g"] +
        "," +
        rgba["b"] +
        "," +
        rgba["a"] +
        ")"
    );
  };

  const handleChangeComplete = (color, event) => {
    console.log(color);
    let rgba = color.rgb;
    let final = [rgba["r"], rgba["g"], rgba["b"], rgba["a"]];
    board_manager.setCurBrushColor(final);
  };

  // onContextMenu={()=>{
  //   selectColor(color)();

  // }}

  return (
    <Flex
      wrap="wrap"
      w={{ base: "100%", sm: "70px", md: "100px", lg: "360px", xl: "540px" }}
      onContextMenu={(e) => {
        e.preventDefault();
        console.log("onContextMenu");
      }}
      justifyContent="center"
    >
      {COLOR_PICKER_TYPE == "default" &&
        colors.map((color, i) => (
          <Flex
            justifyContent="center"
            flexBasis={{ base: "10%", sm: "50%" }}
            boxSizing="border-box"
            paddingTop={{ base: "10%", sm: "35px", md: "50px" }}
            bgColor={"rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"}
            onClick={selectColor(color)}
            className="cursor-pointer"
          ></Flex>
        ))}
      {COLOR_PICKER_TYPE == "chrome" && (
        <ChromePicker
          color={curColor}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
        />
      )}
    </Flex>
  );
};

export default Palette;
