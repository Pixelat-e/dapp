import { chakra, Flex } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { Point } from "./utils/Shapes.js"
import { tools, colors } from "./config";



const Canvas = chakra("canvas");
const SVG = chakra("svg");
const Rect = chakra("rect");


const Board = ({
  height,
  width,
  imgRes,
  canvas,
  setActive,
  handleClick,
  handleHover,
  brushMode,
  setBrushMode,
  board_manager
}) => {
  // const [imgData, setImgData] = useState();
  // const [frames,setFrames] = useState([]);
  // const [toolColor,setToolColor] = useState(colors[0]);
  // const [PreviousPoint, setPreviousPoint] = useState([]);
  // function handleMouseDown(e) {
  //   this.PreviousPoint = new Point(undefined, undefined);
  //   setActive(true);
  // }


  

  

  // Setting callbacks
  // tools

  return (
    <Flex flexGrow={1} justifyContent="center" align="center">
      <Canvas
        ref={canvas}
        boxShadow="lg"
        bgColor="white"
        width={width}
        height={height}
        onMouseDown={board_manager.canvasMouseDown}
        onMouseUp={board_manager.canvasMouseUp}
        onClick={handleClick}
        onMouseMove={board_manager.canvasMouseMove}
        // onMouseOver={handleHover}
      />
      <Flex
        width={width}
        height={height}
        bgColor="transparent"
        position="absolute"
        pointerEvents="none"
        backgroundImage="linear-gradient(to right, rgb(1,1,1) 0px, transparent 1px), linear-gradient(to bottom, rgb(1,1,1) 0px, transparent 1px);"
        backgroundSize={"5px 5px"}
      >
        {/* <Flex
          position="absolute"
          left={100}
          top={100}
          width={20}
          height={20}
          bgColor="gray.100"
        /> */}
      </Flex>
    </Flex>
  );
};

export default Board;
