import {
  Button,
  Divider,
  GridItem,
  Heading,
  HStack,
  Input,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";

const Head = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <GridItem rowSpan={1} colSpan={4}>
      <HStack p={2}>
        <Heading>Welcome To Something</Heading>
        <Spacer />
        <HStack>
          <Input placeholder="Add Something New" variant="filled" />
          <Button>Add</Button>
        </HStack>
        <Spacer />
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Light" : "Dark"}
        </Button>
      </HStack>
      <Divider borderColor="cyan" />
    </GridItem>
  );
};

export default Head;
