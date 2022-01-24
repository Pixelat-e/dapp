import { Flex, useColorMode } from "@chakra-ui/react";

const PixelCanvasBody = ({ children }) => {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      h="100vh"
      align="center"
      direction={{ base: "column-reverse", sm: "row" }}
      justifyContent="space-between"
      bgColor={ colorMode == "light" ? "gray.100" : "gray.800"}
      className="text-base bg-blueGray-700 pr-4"
    >
      {children}
    </Flex>
  );
};

export default PixelCanvasBody;
