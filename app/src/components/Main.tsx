import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  GridItem,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { mutate } from "swr";
import { InfoAPI } from "../interfaces";
import CheckBoxControl from "./CheckboxControl";
import FilesControl from "./FilesControl";
import UploadModal from "./UploadModal";

interface Props {
  infos: InfoAPI[];
  userUuid: string;
}

const Main = ({ infos, userUuid }: Props) => {
  const listItemBorderColor = useColorModeValue("teal.200", "teal.600");

  return (
    <GridItem rowSpan={2} colSpan={4}>
      {infos.length > 0 ? (
        <Flex ml={2} flexDirection="row" spacing={3} flexWrap="wrap">
          {infos.map((info) => {
            return (
              <Flex
                key={info.uuid}
                flexDirection="column"
                border="1px solid"
                flexWrap="wrap"
                borderColor={listItemBorderColor}
                borderRadius={10}
                p={2}
                mr={2}
              >
                <Text
                  fontSize={32}
                  borderBottom="2px solid"
                  borderColor="whiteAlpha.300"
                  p={2}
                  mb={2}
                >
                  {info.title}
                  <IconButton
                    ml={2}
                    aria-label="Search database"
                    icon={<DeleteIcon />}
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:5000/infoAPI/info/${info.uuid}`
                        );
                        // TODO On production this will need to be the req based on user uuid
                        mutate("http://localhost:5000/userAPI/userDefault");
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  />
                </Text>
                <Box>
                  <Text>Checkboxes</Text>
                  <CheckBoxControl
                    checkboxContainer={{
                      checkboxes: info.checkboxes,
                      descCheckboxOne: info.descCheckboxOne,
                      descCheckboxTwo: info.descCheckboxTwo,
                      descCheckboxThree: info.descCheckboxThree,
                    }}
                    infoUuid={info.uuid}
                  />
                </Box>

                <VStack>
                  <FilesControl infoUuid={info.uuid} userUuid={userUuid} />
                  <UploadModal
                    header={info.title}
                    infoUuid={info.uuid}
                    userUuid={userUuid}
                  />
                </VStack>

                <Text>
                  Location:{" "}
                  {info.place.charAt(0).toUpperCase() + info.place.slice(1)}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      ) : (
        <Text>There are no infos, start adding them!</Text>
      )}
    </GridItem>
  );
};

export default Main;
