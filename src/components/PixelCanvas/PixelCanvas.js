import PixelCanvasBody from "./PixelCanvasBody";
import Board from "./Board";
import BoardManager from "./BoardManager";
import Palette from "./Palette";
import Tools from "./Tools";
import { colors, tools } from "./config";
import Frames from "./utils/Frames";
import Popup from "./utils/Popup";
import {Point} from "./utils/Shapes";
import useScript from "./utils/useScript";

import { useState, useEffect, useRef } from "react";

const pixel_canvas_dim = (b_m) => {
  let imgRes = b_m.getImgRes();
  let aspectRatio = imgRes.width / imgRes.height;
  console.log(`aspect ratio: ${aspectRatio}`)
  let w = window.innerWidth/3;
  let h =  w / aspectRatio;
  
  return {
    width:w,
    height:h 
  };
}


const popupClick = () => {};
//TODO: On window resize, do the three.js typical resize code
const PixelCanvas = ({}) => {
  const [brushMode, setBrushMode] = useState(null);
  // const [active, setActive] = useState(false);
  const [isFramesOpen, togglesFrames] = useState(false);
  const canvas = useRef();
  const canvas_grid = useRef();

  const board_manager = new BoardManager();
  // const [size, setSize] = useState(pixel_canvas_dim(board_manager));

  let canvasData = localStorage.getItem("pc-canvas-data");
  const resizeHandler = () => {
    console.log("RESIZE HANDLER")
    // setSize(pixel_canvas_dim(board_manager))
    let newCanvasRes = pixel_canvas_dim(board_manager)
    board_manager.setCanvasRes(newCanvasRes)
    board_manager.handleWindowResize();
  }
  useScript("/lib/gif.js");
  useEffect(() => {
    let canvasEl = canvas.current;
    let canvasGridEl = canvas_grid.current;
    console.log(canvas_grid)
    board_manager.setCanvas(canvasEl);
    board_manager.setCanvasGrid(canvasGridEl);
    let ctx = canvasEl.getContext("2d");
    board_manager.setCtx(ctx);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    // window.onmouseup = () => setActive(false);
    resizeHandler();
    window.addEventListener('resize', resizeHandler);


    return () => {
      window.removeEventListener('resize', resizeHandler);
      board_manager.saveInLocal();
      return "Data will be lost if you leave the page, are you sure?";
    }
  }, []);

  // function handleClick(e) {
  //   console.log(
  //     e.clientX - e.target.offsetLeft,
  //     e.clientY - e.target.offsetTop
  //   );
  //   return;
  // }
  return (
    <>
      <PixelCanvasBody>
        <Tools
          brushMode={brushMode}
          setBrushMode={setBrushMode}
          board_manager={board_manager}
        />
        <Board
          board_manager={board_manager}
          canvas={canvas}
          canvas_grid={canvas_grid}
        />
        <Palette board_manager={board_manager} />
        {isFramesOpen && <Frames togglesFrames={togglesFrames} />}
      </PixelCanvasBody>
      {board_manager.isPopup && (
        <Popup clickHandler={popupClick} board_manager={board_manager} imgRes={board_manager.imgRes} />
      )}
      
    </>
  );
};

export default PixelCanvas;
