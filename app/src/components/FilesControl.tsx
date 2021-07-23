import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Link,
  Spinner,
  Text,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { FileData } from "../interfaces";

interface Props {
  infoUuid: string;
}

const FilesControl = ({ infoUuid }: Props) => {
  const fetcher = (url: string): Promise<FileData[]> =>
    axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<FileData[]>(
    `http://localhost:5000/infosAPI/filesInfos/${infoUuid}`,
    fetcher
  );

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="Apply edit"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="Cancel edit"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="Edit"
          size="sm"
          icon={<EditIcon />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  };

  if (error) return <Box>Something Went Wrong. {error}</Box>;
  if (!data)
    return (
      <Box>
        <Spinner /> Loading...
      </Box>
    );
  return (
    <VStack>
      {data.map((file) => {
        return (
          <Flex key={file.uuid} flexDirection="column">
            <Text>{file.filename}</Text>
            {file.description ? (
              <Editable
                defaultValue={file.description}
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <EditablePreview />
                <EditableInput
                  borderColor="whiteAlpha.400"
                  border="1px solid"
                />
                <EditableControls />
              </Editable>
            ) : (
              <Editable
                defaultValue="You can add description using the edit button!"
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <EditablePreview w="368px" />
                <EditableInput
                  borderColor="whiteAlpha.400"
                  border="1px solid"
                />
                <EditableControls />
              </Editable>
            )}
            <Link href={file.link}>Download</Link>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default FilesControl;
