import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
import axios from "axios";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";

interface Props {
  infoUuid: string;
  userUuid: string;
  header: string;
}

type FormValues = {
  file_: FileList;
};

const UploadModal = ({ header, infoUuid, userUuid }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data: { file_: File[] }) => {
    const files = data.file_;
    if (files.length > 1) {
      try {
        const res = await axios.post("http://localhost:5000/uploadAPI/files", {
          files,
          userUuid,
          infoUuid,
        });

        console.log(res);
      } catch (err) {
        throw err;
      }
    }
  });

  const validateFiles = (value: FileList) => {
    if (value.length < 1) return "Files is required";

    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) return "Max file size is 10Mb";
    }

    return true;
  };

  return (
    <Box mr={2}>
      <Button onClick={onOpen}>Upload</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select the file you want to upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{header}</Text>
            <form onSubmit={onSubmit}>
              <FormControl id="form-upload-file">
                <FormLabel>Select File To Upload</FormLabel>
                <FileUpload
                  register={register("file_", { validate: validateFiles })}
                  multiple={true}
                >
                  <Button colorScheme="blue">Upload</Button>
                </FileUpload>
                <Flex w="100%" flexDirection="row" justifyContent="end">
                  <Button colorScheme="blue" type="submit" mt={2}>
                    Send
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UploadModal;
