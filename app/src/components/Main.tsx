import {
  Box,
  Flex,
  GridItem,
  ListItem,
  OrderedList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import EditModal from "./EditModal";
import UploadModal from "./UploadModal";

interface Props {
  infos: Array<{
    id: number;
    text: string;
    title: string;
  }>;
  setInfos: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        text: string;
        title: string;
      }[]
    >
  >;
}

const Main = ({ infos, setInfos }: Props) => {
  const listItemBorderColor = useColorModeValue("teal.200", "teal.600");

  return (
    <GridItem rowSpan={2} colSpan={4}>
      <Flex flexDirection="column" alignItems="center">
        <OrderedList spacing={3}>
          {infos.map((info) => (
            <ListItem
              key={info.id}
              border="2px solid"
              borderRadius={10}
              borderColor={listItemBorderColor}
              width="fit-content"
              p={2}
            >
              <Box display="flex" flexDirection="row" alignItems="center">
                <Text mr={2}>{info.text}</Text>
                <UploadModal header={info.title} id={info.id} />
                <EditModal
                  text={info.text}
                  header={info.title}
                  id={info.id}
                  setInfos={setInfos}
                  infos={infos}
                />
              </Box>
            </ListItem>
          ))}
        </OrderedList>
      </Flex>
    </GridItem>
  );
};

export default Main;
