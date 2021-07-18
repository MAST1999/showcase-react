import {
  Button,
  GridItem,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";

const main = () => {
  const infos = [
    { id: 1, text: "hello" },
    { id: 2, text: "bye" },
  ];

  return (
    <GridItem rowSpan={2} colSpan={4}>
      <OrderedList>
        {infos.map((info) => (
          <ListItem key={info.id}>
            <Text>{info.text}</Text>
            <Button>Edit</Button>
          </ListItem>
        ))}
      </OrderedList>
    </GridItem>
  );
};

export default main;
