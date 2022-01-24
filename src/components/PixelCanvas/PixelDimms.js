import {
  Flex,
  useColorMode,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
const PixelDimms = ({ board_manager }) => {
  const [imgRes, setImgRes] = useState(board_manager.getImgRes());
  const { colorMode, toggleColorMode } = useColorMode();
  const clickHandler = () => {
    // console.log("Local img res");
    board_manager.setImgRes(imgRes);
  };
  //   const handleInputChange = (e) => {
  //     console.log(e);
  //     let newVal = e.target.value;
  //     // if (e.target.name == "width"){

  //     // }
  //     setImgRes({
  //       ...imgRes,
  //       [e.target.name]: newVal,
  //     });
  //   };

  const handleInputChangeW = (val) => {
    setImgRes({
      ...imgRes,
      ["width"]: val,
    });
    clickHandler();
  };

  const handleInputChangeH = (val) => {
    setImgRes({
      ...imgRes,
      ["height"]: val,
    });
    clickHandler();
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
          name="width"
          onChange={handleInputChangeW}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <div className="px-4">X</div>
        <NumberInput
          defaultValue={imgRes.height}
          min={1}
          max={256}
          name="height"
          onChange={handleInputChangeH} 
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Spacer />
      <Button id="close" onClick={clickHandler}>
        OK
      </Button>
    </Flex>
  );
};
export default PixelDimms;
