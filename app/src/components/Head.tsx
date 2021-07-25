import {
  Box,
  Button,
  Divider,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import { Place } from "../App";
import { User, UserData } from "../interfaces";

interface Props {
  user: User;
  data: UserData;
}

const Head = ({ user, data }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [inpInfo, setInpInfo] = useState("");
  const [place, setPlace] = useState(Place.Unknown);
  const addInfo = async (): Promise<void> => {
    try {
      mutate(
        `http://localhost:5000/infosAPI/userInfos/${user.uuid}`,
        {
          ...data,
          infos: [
            ...data.infos,
            {
              title: inpInfo,
              list: place,
              uuid: "daf4i32-432t24-3g35g35-35g34gfd2f",
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
            },
          ],
        },
        false
      );

      console.log(user.uuid);
      await axios.post(`http://localhost:5000/infosAPI/info/${user.uuid}`, {
        place,
        title: inpInfo,
      });

      await mutate(`http://localhost:5000/infosAPI/userInfos/${user.uuid}`);
    } catch (err) {
      throw err;
    }
  };

  return (
    <GridItem rowSpan={1} colSpan={4}>
      <HStack p={2}>
        <Heading>Welcome {user.username}</Heading>
        <Spacer />
        <HStack>
          <Input
            placeholder="Add New Info"
            variant="outline"
            onChange={(evt) => setInpInfo(evt.target.value)}
            value={inpInfo}
          />
          <Select variant="filled" p={0} defaultValue={Place.Unknown}>
            <Box
              as="option"
              value={Place.Unknown}
              onClick={() => setPlace(Place.Unknown)}
            >
              I don't know
            </Box>
            <Box
              as="option"
              value={Place.Iran}
              onClick={() => setPlace(Place.Iran)}
              p={0}
            >
              Iran
            </Box>
            <Box
              as="option"
              value={Place.Canada}
              onClick={() => setPlace(Place.Canada)}
              p={0}
            >
              Canada
            </Box>
            <Box
              as="option"
              value={Place.Japan}
              onClick={() => setPlace(Place.Japan)}
              p={0}
            >
              Japan
            </Box>
            <Box
              as="option"
              value={Place.UK}
              onClick={() => setPlace(Place.UK)}
            >
              United Kingdom
            </Box>
            <Box
              as="option"
              value={Place.US}
              onClick={() => setPlace(Place.US)}
            >
              United States
            </Box>
          </Select>
          <Button onClick={() => addInfo()}>Add</Button>
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
