import { useState, useEffect, useRef, useCallback } from "react";
const Popup = ({clickHandler, imgRes, setImgRes}) => {
  const handleInputChange = useCallback(
    (event) => {
      setImgRes(event.target.value);
    },
    [setImgRes]
  );
  return (
    <div id="popup">
      <h3>Select the Dimensions Of the grid</h3>
      <input
        type="text"
        id="width"
        value={imgRes.width}
        onChange={handleInputChange}
      />
      X
      <input
        type="text"
        id="height"
        value={imgRes.height}
        onChange={handleInputChange}
      />
      <button id="close" onClick={clickHandler}>
        OK
      </button>
    </div>
  );
};
export default Popup;