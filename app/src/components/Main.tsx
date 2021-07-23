import { Box, Flex, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import { Info } from "../interfaces";
import FilesControl from "./FilesControl";
import UploadModal from "./UploadModal";

interface Props {
  infos: Info[];
  userUuid: string;
}

const Main = ({ infos, userUuid }: Props) => {
  const listItemBorderColor = useColorModeValue("teal.200", "teal.600");

  return (
    <GridItem rowSpan={2} colSpan={4}>
      <Flex flexDirection="column" alignItems="center">
        <Box spacing={3}>
          {infos.map((info) => (
            <Flex key={info.uuid} flexDirection="column">
              <Text
                fontSize={32}
                borderBottom="2px solid"
                borderColor="whiteAlpha.300"
                p={2}
              >
                {info.title}
              </Text>
              <FilesControl key={info.uuid} infoUuid={info.uuid} />
              <UploadModal
                header={info.title}
                infoUuid={info.uuid}
                userUuid={userUuid}
                key={info.uuid}
              />
              <Text>{info.list}</Text>
            </Flex>
          ))}
        </Box>
      </Flex>
    </GridItem>
  );
};

export default Main;
