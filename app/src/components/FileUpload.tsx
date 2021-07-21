import { InputGroup } from "@chakra-ui/input";
import { Box } from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

const FileUpload = (props: FileUploadProps) => {
  const [fileName, setFileName] = useState("");
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick}>
      <input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={(event) => {
          const filename = event.target.value.slice(12);
          setFileName(filename);
        }}
      />
      <Box mr={2} w="100%">
        {fileName}
      </Box>
      <Box>{children}</Box>
    </InputGroup>
  );
};

export default FileUpload;
