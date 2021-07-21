import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  text: string;
  id: number;
  header: string;
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

const EditModal = ({ header, id, text, setInfos, infos }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newText, setNewText] = useState(text);

  return (
    <Box>
      <Button onClick={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the file you want to upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{header}</Text>
            <Input
              onChange={(evt) => {
                setNewText(evt.target.value);
              }}
              value={newText}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                setInfos(
                  infos.map((oldInfo) => {
                    if (oldInfo.id === id) oldInfo.text = newText;
                    return oldInfo;
                  })
                );
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditModal;
