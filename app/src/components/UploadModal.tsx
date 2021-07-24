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
    const formData = new FormData();

    for (const file of data.file_) {
      formData.append("files", file);
    }
    formData.append("userUuid", userUuid);
    formData.append("infoUuid", infoUuid);
    await axios({
      url: "http://localhost:5000/uploadAPI/files",
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    onClose();
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
    <Box
      mb={2}
      mt={2}
      p={2}
      borderBottom="2px solid"
      borderColor="whiteAlpha.300"
    >
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
