import { DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  GridItem,
  IconButton,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { mutate } from "swr";
import { InfoAPI } from "../interfaces";
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
      <Flex ml={2} flexDirection="row" spacing={3} flexWrap="wrap">
        {infos.map((info) => {
          return (
            <Flex
              key={info.uuid}
              flexDirection="column"
              border="1px solid"
              borderColor={listItemBorderColor}
              p={2}
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
                      const res = await axios.delete(
                        `http://localhost:5000/infosAPI/info/${info.uuid}`
                      );
                      mutate(
                        `http://localhost:5000/infosAPI/userInfos/${userUuid}`
                      );
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              </Text>
              {info.uuid === "daf4i32-432t24-3g35g35-35g34gfd2f" ? (
                <Text>
                  Syncing... <Spinner />
                </Text>
              ) : (
                <VStack>
                  <FilesControl infoUuid={info.uuid} />
                  <UploadModal
                    header={info.title}
                    infoUuid={info.uuid}
                    userUuid={userUuid}
                  />
                </VStack>
              )}
              <Text>
                Location:{" "}
                {info.list.charAt(0).toUpperCase() + info.list.slice(1)}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </GridItem>
  );
};

export default Main;
