import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import Head from "./components/Head";
import Main from "./components/Main";
import { User, UserData } from "./interfaces";

export enum Place {
  Iran = "iran",
  US = "us",
  UK = "uk",
  Canada = "canada",
  Japan = "japan",
  Unknown = "unknown",
}

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User>({
    username: "mast",
    uuid: "e34508be-fc02-4000-8767-2aab6b3d9243",
    email: "mast@gmail.com",
  });

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR<UserData>(
    `http://localhost:5000/infosAPI/userInfos/${user.uuid}`,
    fetcher
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
      <Head user={user} data={data} />

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
