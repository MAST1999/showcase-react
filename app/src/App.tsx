import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import Head from "./components/Head";
import Main from "./components/Main";
import { User } from "./interfaces";

export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

const App = () => {
  const { data, error } = useSWR<User>(
    "http://localhost:5000/userAPI/userDefault"
  );

  if (error) return <Text>Something went wrong</Text>;
  if (!data)
    return (
      <Center>
        Loading <Spinner />
      </Center>
    );

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="70px repeat(2, 1fr) 50px"
      minH="99.9vh"
      h="100%"
      gap={2}
    >
      <Head user={data} data={data} />

      {error ? (
        <Box>Something went wrong</Box>
      ) : data ? (
        <Main infos={data.infos} userUuid={data.uuid} />
      ) : (
        <Spinner />
      )}

      <GridItem rowSpan={1} colSpan={4}>
        <Divider borderColor="cyan" />
        <Center h="100%">
          Mast<sup>tm</sup>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default App;
