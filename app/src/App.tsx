import { Center, Divider, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import Head from "./components/Head";
import Main from "./components/Main";

const initialState = [
  { id: 1, text: "hello", title: "my title" },
  { id: 2, text: "bye", title: "second title" },
];

function App() {
  const [infos, setInfos] = useState(initialState);

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="70px repeat(2, 1fr) 50px"
      h="100vh"
      gap={2}
    >
      <Head />

      <Main infos={infos} setInfos={setInfos} />

      <GridItem rowSpan={1} colSpan={4}>
        <Divider borderColor="cyan" />
        <Center h="100%">
          Mast<sup>tm</sup>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default App;
