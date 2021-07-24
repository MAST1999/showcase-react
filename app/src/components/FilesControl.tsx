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
import { useRef } from "react";
import useSWR from "swr";
import { FileData } from "../interfaces";

interface Props {
  infoUuid: string;
}

interface PropsEditable {
  fileUuid: string;
  inpRef: React.RefObject<HTMLInputElement>;
}

const FilesControl = ({ infoUuid }: Props) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const fetcher = (url: string): Promise<FileData[]> =>
    axios.get(url).then((res) => res.data);
  const { data, error } = useSWR<FileData[]>(
    `http://localhost:5000/infosAPI/filesInfos/${infoUuid}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  const EditableControls = ({ fileUuid, inpRef }: PropsEditable) => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    const submitProps = getSubmitButtonProps();

    console.log(submitProps.onClick);
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="Apply edit"
          icon={<CheckIcon />}
          ref={submitProps.ref}
          onClick={async (e) => {
            await axios.put(
              `http://localhost:5000/uploadAPI/file/${fileUuid}`,
              { description: inpRef.current?.value }
            );

            submitProps["onClick"]
              ? submitProps["onClick"](e)
              : console.log("what");
          }}
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
  if (data) {
    data.sort((file1, file2) => {
      const date1 = new Date(file1.createdAt);
      const date2 = new Date(file2.createdAt);

      if (date1.getTime() < date2.getTime()) return -1;
      if (date1.getTime() > date2.getTime()) return 1;
      return 0;
    });
  }
  return (
    <VStack>
      {data.map((file) => {
        return (
          <Flex
            key={file.uuid + file.filename}
            flexDirection="column"
            borderBottom="2px solid"
            borderColor="whiteAlpha.300"
            mb={2}
          >
            <Text fontSize={24}>File Name: {file.filename}</Text>
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
                <EditableControls fileUuid={file.uuid} inpRef={inpRef} />
              </Editable>
            ) : (
              <Editable
                defaultValue="You can add description using the edit button!"
                fontSize="2xl"
                isPreviewFocusable={false}
              >
                <EditablePreview />
                <EditableInput
                  borderColor="whiteAlpha.400"
                  border="1px solid"
                  ref={inpRef}
                />
                <EditableControls fileUuid={file.uuid} inpRef={inpRef} />
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
