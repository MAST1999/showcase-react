import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Text,
  useColorModeValue,
  useEditableControls,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import DownloadLink from "react-download-link";
import useSWR, { mutate } from "swr";
import { FileData } from "../interfaces";

interface Props {
  infoUuid: string;
  userUuid: string;
}

interface PropsEditable {
  fileUuid: string;
  inpRef: React.RefObject<HTMLInputElement>;
}

const FilesControl = ({ infoUuid, userUuid }: Props) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const filesBorderColor = useColorModeValue("teal.100", "whiteAlpha.600");
  const [version, setVersion] = useState(0);
  const [typeOfFile, setTypeOfFile] = useState(0);
  const [number, setNumber] = useState(0);

  const fetcher = async (url: string): Promise<FileData[]> => {
    const res = await axios.get(url);
    console.log(res.data);
    return res.data;
  };

  const { data, error } = useSWR<FileData[]>(
    `http://localhost:5000/fileAPI/receive/${infoUuid}`,
    fetcher
  );

  const EditableControls = ({ fileUuid, inpRef }: PropsEditable) => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    const submitProps = getSubmitButtonProps();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="Apply edit"
          icon={<CheckIcon />}
          ref={submitProps.ref}
          onClick={async (e) => {
            await axios.put(
              `http://localhost:5000/fileAPI/file/${fileUuid}/${userUuid}/${infoUuid}`,
              { description: inpRef.current?.value }
            );
            mutate(`http://localhost:5000/fileAPI/receive/${infoUuid}`);

            submitProps["onClick"] && submitProps["onClick"](e);
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

  const textVersions = ["NotSet", "One", "Two", "Three", "Four", "Five"];
  const TextTypeOfFiles = [
    "NotSet",
    "NotImportant",
    "Image",
    "Document",
    "Secret",
  ];

  return (
    <VStack>
      {data.map((file) => {
        return (
          <Flex
            key={file.uuid + file.filename}
            flexDirection="column"
            borderBottom="2px solid"
            borderColor={filesBorderColor}
            mb={2}
            w="450px"
          >
            <Text
              fontSize={24}
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              File Name:{" "}
              <Box as="span" fontSize={18}>
                {file.filename}
              </Box>
            </Text>
            <HStack>
              <Text>Version</Text>
              <Select
                mb={2}
                defaultValue={file.version}
                onChange={(e) => {
                  setVersion(+e.target.value);
                }}
              >
                {textVersions.map((ver, index) => (
                  <option key={ver} value={index}>
                    {ver}
                  </option>
                ))}
              </Select>
            </HStack>

            <HStack>
              <Text>Type of file</Text>
              <Select
                defaultValue={file.type}
                mb={2}
                onChange={(e) => setTypeOfFile(+e.target.value)}
              >
                {TextTypeOfFiles.map((type, index) => (
                  <option key={type} value={index}>
                    {type}
                  </option>
                ))}
              </Select>
            </HStack>

            <Button
              colorScheme="cyan"
              mb={2}
              mx={2}
              onClick={async () => {
                await axios.put(
                  `http://localhost:5000/fileAPI/file/checkbox/${file.uuid}`,
                  {
                    version,
                    typeOfFile,
                  }
                );

                mutate(`http://localhost:5000/fileAPI/receive/${infoUuid}`);
              }}
            >
              Update File
            </Button>

            <IconButton
              mx={2}
              aria-label="Delete file"
              icon={<DeleteIcon />}
              onClick={async () => {
                try {
                  await axios.delete(
                    `http://localhost:5000/fileAPI/file/${file.uuid}/${userUuid}/${infoUuid}`
                  );

                  mutate(`http://localhost:5000/fileAPI/receive/${infoUuid}`);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
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
            <Box>
              <NumberInput defaultValue={file.number} min={0} mt={2}>
                <NumberInputField
                  onChange={(e) => setNumber(+e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Button
              colorScheme="cyan"
              onClick={async () => {
                await axios.put(
                  `http://localhost:5000/fileAPI/file/number/${file.uuid}`,
                  { number }
                );

                mutate(`http://localhost:5000/fileAPI/receive/${infoUuid}`);
              }}
            >
              Update Count
            </Button>
            <Button as="div" width="fit-content" mt={3} mb={2} p={0}>
              <DownloadLink
                label="Download The File"
                filename={file.filename}
                exportFile={() => "data"}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px 8px",
                }}
              />
            </Button>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default FilesControl;
