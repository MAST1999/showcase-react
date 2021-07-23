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
import { Place } from "../App";
import { User } from "../interfaces";

interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Head = ({ user, setUser }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [inpInfo, setInpInfo] = useState("");
  const [place, setPlace] = useState(Place.Unknown);
  const addInfo = async (): Promise<void> => {
    try {
      const res = await axios.post(
        `http://localhost:5000/infosAPI/info/${user.uuid}`,
        { place, title: inpInfo }
      );
      console.log(res.data.message);
    } catch (err) {
      throw err;
    }
    setUser({
      username: "mast",
      uuid: "3d650e35-a215-4d80-aacd-9d867ab3c4af",
      email: "mast@gmail.com",
    });
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
          <Select variant="filled" p={0}>
            <Box
              as="option"
              value={Place.Unknown}
              onClick={() => setPlace(Place.Unknown)}
              selected
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
