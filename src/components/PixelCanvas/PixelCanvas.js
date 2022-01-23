import PixelCanvasBody from "./PixelCanvasBody";
import Board from "./Board";
import BoardManager from "./BoardManager";
import Palette from "./Palette";
import Tools from "./Tools";
import { colors, tools } from "./config";
import Frames from "./utils/Frames";
import Popup from "./utils/Popup";

import { useState, useEffect, useRef } from "react";

const popupClick = () => {};

const PixelCanvas = ({}) => {
  const [size, setSize] = useState({ width: 250, height: 250 });
  // const [imgRes, setImgRes] = useState({ width: 32, height: 32 });
  const [brushMode, setBrushMode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(false);
  const [isFramesOpen, togglesFrames] = useState(false);
  // const [curTool, setCurTool] = useState(0);
  const canvas = useRef();
  const board_manager = new BoardManager();

  let canvasData = localStorage.getItem("pc-canvas-data");

  useEffect(() => {
    board_manager.setCanvas(canvas.current);
    let ctx = canvas.getContext("2d");
    board_manager.setCtx(ctx);
    ctx.fillStyle = "white";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.onmouseup = () => setActive(false);
  }, []);

  function handleClick(e) {
    console.log(
      e.clientX - e.target.offsetLeft,
      e.clientY - e.target.offsetTop
    );
    return;
  }
  setImgRes;

  function handleHover(e) {
    if (this.active) {
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      x = Math.floor((imgRes.width * x) / canvas.clientWidth);
      y = Math.floor((imgRes.height * y) / canvas.clientHeight);
      if (tools[Tool.pen]) {
        var p = new Point(x, y);
        if (!p.equals(this.previous_point)) {
          this.previous_point = p;
          Board.drawPoint(p.x, p.y);
          // board_manager.drawPoint();
        }
      } else if (tools[Tool.eraser]) {
        this.erase(x, y);
      }
    }
  }

  return (
    <>
      <PixelCanvasBody>
        <Tools
          brushMode={brushMode}
          setBrushMode={setBrushMode}
          board_manager={board_manager}
        />
        <Board
          height={size.width}
          width={size.height}
          imgRes={imgRes}
          canvas={canvas}
          board_manager={board_manager}
          setActive={setActive}
          handleClick={handleClick}
          handleHover={handleHover}
          brushMode={brushMode}
          setBrushMode={setBrushMode}
        />
        <Palette board_manager={board_manager} />
        {isFramesOpen && <Frames togglesFrames={togglesFrames} />}
      </PixelCanvasBody>
      <Popup clickHandler={popupClick} imgRes={imgRes} setImgRes={setImgRes} />
    </>
  );
};

export default PixelCanvas;
