import {
  Flex,
  useColorMode,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
const PixelDimms = ({ board_manager }) => {
  const [imgRes, setImgRes] = useState(board_manager.getImgRes());
  const { colorMode, toggleColorMode } = useColorMode();
  const clickHandler = () => {
    board_manager.setImgRes(imgRes);
  };
  const handleInputChange = (e) => {
    let newVal = e.target.value;
    // if (e.target.name == "width"){

    // }
    setImgRes({
      ...imgRes,
      [e.target.name]: newVal,
    });
  };

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      color={colorMode == "light" ? "gray.800" : "gray.100"}
      className="space-y-4"
    >
      <h3>Select the Dimensions Of the grid</h3>
      <Spacer />
      <Flex alignItems="center">
        <NumberInput
          defaultValue={imgRes.width}
          min={1}
          max={256}
          onChange={handleInputChange}
          name="width"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <div className="px-4">
            X
        </div>
        <NumberInput
          defaultValue={imgRes.height}
          min={1}
          max={256}
          onChange={handleInputChange}
          name="height"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Spacer />
      <button id="close" onClick={clickHandler}>
        OK
      </button>
    </Flex>
  );
};
export default PixelDimms;
