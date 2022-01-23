import { Flex } from "@chakra-ui/react";
import { colors } from "./config";

const Palette = ({board_manager}) => {

  const selectColor = (color) => {
    return () => {
      // setColor(color);
      board_manager.setCurBrushColor(color);
      // act(this);
    }
  }

  
  // onContextMenu={()=>{
  //   selectColor(color)();
    
  // }}
  return (
    <Flex wrap="wrap" w={{ base: "100%", sm: "70px", md: "100px" }}
      onContextMenu={(e)=>{e.preventDefault(); console.log("onContextMenu");}}
    >
      {colors.map((color, i) => (
        <Flex
          justifyContent="center"
          flexBasis={{ base: "10%", sm: "50%" }}
          boxSizing="border-box"
          paddingTop={{ base: "10%", sm: "35px", md: "50px" }}
          bgColor={"rgb(" + color[0] + "," + color[1] + "," + color[2] + ")"}
          onClick={selectColor(color)}
          
        >
        </Flex>
      ))}
    </Flex>
  );
};

export default Palette;