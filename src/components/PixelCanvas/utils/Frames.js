import { useState, useEffect, useRef } from "react";
export default Frames = ({ frames, togglesFrames }) => {
  // const [images,setImaages] = useState([]);
  const framesEl = useRef();
  const galleryEl = useRef();
  const open = () => {
    let frameEl = framesEl.current;
    frameEl.style.display = "block";
    frameEl.style.transform = "translate(-50%,-50%) scale(1,1)";
    frameEl.focus();
    // galleryEl.current.innerHTML = "";
  };
  const close = () => {
    frameEl.style.transform = "translate(-50%,-50%) scale(0,0)";
  };

  const handleBlur = () => {
    togglesFrames(false);
  };

  const goPrevious = () => {
    galleryEl.current.style.scrollLeft -= 100;
  };

  const goNext = () => {
    galleryEl.current.style.scrollLeft += 100;
  };

  // closes the frame overlay and loads this image
  const imgClickCallback = (idx) => {
    return () => {
      board.loadFrame(idx);
      togglesFrames(false);
    };
  };

  const imgContextCallback = (idx) => {
    return () => {
      e.preventDefault();
      var del_confirmation = confirm("Delete?");
      if (del_confirmation) {
        board.deleteFrame(idx);
        // Frames.open();
      }
    };
  };

  return (
    <div id="frames" onBlur={handleBlur} tabindex="0" ref={framesEl}>
      <div className="btn" style="left: 10px;" oncClick={goPrevious}>
        <i class="fa fa-chevron-left"></i>
      </div>
      <div className="btn" style="right: 10px;" oncClick={goNext}>
        <i class="fa fa-chevron-right"></i>
      </div>
      <div id="gallery" ref={galleryEl}>
        {frames &&
          frames.map((Frame, idx) => (
            <Frame
              onClick={imgClickCallback(idx)}
              onContextmenu={imgContextCallback(idx)}
            />
          ))}
      </div>
    </div>
  );
};
