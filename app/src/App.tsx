import { Center, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Head from "./components/Head";
import Main from "./components/Main";

function App() {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="repeat(3, 1fr) 50px"
      h="100vh"
      gap={2}
    >
      <Head />

      <Main />

      <GridItem rowSpan={1} colSpan={4}>
        <Center h="100%">
          Mast<sup>tm</sup>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default App;
