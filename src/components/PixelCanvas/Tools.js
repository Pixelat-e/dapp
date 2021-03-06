import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { tools } from "./config";
import { useState } from "react";

import PixelMenu from "./Menu";
const Tools = ({ brushMode, setbrushMode, board_manager }) => {
  // const [activeTool, setActiveTool] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();

  // const setmode = (i) => {
  //   setActiveTool(i);
  //   // tools[i].isActive = true;
  //   // document.querySelectorAll("#toolbar .item").forEach((x, i) => {
  //   //   if (tools[i]) x.style.backgroundColor = "grey";
  //   //   else x.style.backgroundColor = "";
  //   // });
  // };

  let callbacks = board_manager.toolCallbacks;

  return (
    <Flex
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
    >
      <PixelMenu board_manager={board_manager} />
      <Flex wrap="wrap" w={{ base: "100%", sm: "100px", md: "150px" }}>
        {tools.map((tool, i) => (
          <Flex
            justifyContent="center"
            align="center"
            flexBasis={{ base: "10%", sm: "50%" }}
            boxSizing="border-box"
            p={4}
            bgColor={brushMode == i && "gray.300"}
            cursor="pointer"
            onClick={(e) => callbacks[i](e, tool["name"])}
            className="cursor-pointer"
            // style={{
            //   backgroundColor: i == activeTool?"grey.200":""
            // }}
          >
            <IconButton
              as={tool.icon}
              variant="unstyled"
              w={7}
              h={7}
              transform={tool.name == "Ellipse" && "rotateX(45deg)"}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Tools;
