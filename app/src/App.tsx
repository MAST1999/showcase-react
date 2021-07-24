import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import Head from "./components/Head";
import Main from "./components/Main";
import { Info, User } from "./interfaces";

export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

const App = () => {
  const [user, setUser] = useState<User>({
    username: "mast",
    uuid: "8b3c7ffb-cd3d-4a7c-9d5f-db4664378f60",
    email: "mast@gmail.com",
  });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR<{ infos: Info[] }>(
    `http://localhost:5000/infosAPI/userInfos/${user.uuid}`,
    fetcher
  );

  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="70px repeat(2, 1fr) 50px"
      minH="99.9vh"
      h="100%"
      gap={2}
    >
      <Head user={user} setUser={setUser} />

      {error ? (
        <Box>Something went wrong</Box>
      ) : data ? (
        <Main infos={data.infos} userUuid={user.uuid} />
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
