import { Flex, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
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
      <Flex ml={2} flexDirection="row" spacing={3} flexWrap="wrap">
        {infos.map((info) => (
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
            </Text>
            <FilesControl infoUuid={info.uuid} />
            <UploadModal
              header={info.title}
              infoUuid={info.uuid}
              userUuid={userUuid}
            />
            <Text>
              Location: {info.list.charAt(0).toUpperCase() + info.list.slice(1)}
            </Text>
          </Flex>
        ))}
      </Flex>
    </GridItem>
  );
};

export default Main;
