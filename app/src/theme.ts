import { ColorMode, extendTheme } from "@chakra-ui/react";

const firstColorMode: ColorMode = "dark";

const config = {
  useSystemColorMode: false,
  initialColorMode: firstColorMode,
};

const theme = extendTheme({ config });

export default theme;
