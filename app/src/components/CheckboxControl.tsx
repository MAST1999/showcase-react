import { Checkbox } from "@chakra-ui/checkbox";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import { CheckboxSelection, CheckboxValues } from "../enums";
import { CheckboxContainer } from "../interfaces";

interface Props {
  checkboxContainer: CheckboxContainer;
  infoUuid: string;
}

const CheckBoxControl = ({ checkboxContainer, infoUuid }: Props) => {
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [descCheckboxes, setDescCheckboxes] = useState({
    descCheckboxOne: checkboxContainer.descCheckboxOne,
    descCheckboxTwo: checkboxContainer.descCheckboxTwo,
    descCheckboxThree: checkboxContainer.descCheckboxThree,
  });
  const underBorder = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  useEffect(() => {
    console.log(checkboxContainer);
    switch (checkboxContainer.checkboxes) {
      case CheckboxSelection.All: {
        setCheckboxes([
          String(CheckboxValues.First),
          String(CheckboxValues.Second),
          String(CheckboxValues.Third),
        ]);
        break;
      }
      case CheckboxSelection.First: {
        setCheckboxes([String(CheckboxValues.First)]);
        break;
      }
      case CheckboxSelection.FirstAndSecond: {
        setCheckboxes([
          String(CheckboxValues.First),
          String(CheckboxValues.Second),
        ]);
        break;
      }
      case CheckboxSelection.Second: {
        setCheckboxes([String(CheckboxValues.Second)]);
        break;
      }
      case CheckboxSelection.SecondAndThird: {
        setCheckboxes([
          String(CheckboxValues.Second),
          String(CheckboxValues.Third),
        ]);
        break;
      }
      case CheckboxSelection.Third: {
        setCheckboxes([String(CheckboxValues.Third)]);
        break;
      }
      default: {
        setCheckboxes([]);
        break;
      }
    }
  }, [checkboxContainer]);

  return (
    <Box borderBottom="2px solid" borderColor={underBorder} pb={2}>
      <VStack alignItems="flex-start">
        <Box>
          <Checkbox
            value={`${CheckboxValues.First}`}
            isChecked={
              checkboxes.some((value) => value === String(CheckboxValues.First))
                ? true
                : false
            }
            onChange={(e) => {
              checkboxes.some((value) => value === String(CheckboxValues.First))
                ? setCheckboxes(
                    checkboxes.filter(
                      (value) => value !== String(CheckboxValues.First)
                    )
                  )
                : setCheckboxes([...checkboxes, String(CheckboxValues.First)]);
            }}
          >
            It's Finished
          </Checkbox>
          <Editable
            border="1px solid"
            borderColor="cyan.300"
            borderRadius={10}
            p={2}
            defaultValue={checkboxContainer.descCheckboxOne}
            placeholder="Enter Extra Info Here"
          >
            <EditablePreview />
            <EditableInput
              onChange={(e) => {
                setDescCheckboxes({
                  ...descCheckboxes,
                  descCheckboxOne: e.target.value,
                });
              }}
            />
          </Editable>
        </Box>

        <Box>
          <Checkbox
            value={`${CheckboxValues.Second}`}
            isChecked={
              checkboxes.some(
                (value) => value === String(CheckboxValues.Second)
              )
                ? true
                : false
            }
            onChange={() => {
              checkboxes.some(
                (value) => value === String(CheckboxValues.Second)
              )
                ? setCheckboxes(
                    checkboxes.filter(
                      (value) => value !== String(CheckboxValues.Second)
                    )
                  )
                : setCheckboxes([...checkboxes, String(CheckboxValues.Second)]);
            }}
          >
            Need's Approval
          </Checkbox>
          <Editable
            border="1px solid"
            borderColor="cyan.300"
            borderRadius={10}
            p={2}
            defaultValue={checkboxContainer.descCheckboxTwo}
            placeholder="Enter Extra Info Here"
          >
            <EditablePreview />
            <EditableInput
              onChange={(e) => {
                setDescCheckboxes({
                  ...descCheckboxes,
                  descCheckboxTwo: e.target.value,
                });
              }}
            />
          </Editable>
        </Box>

        <Box>
          <Checkbox
            value={`${CheckboxValues.Third}`}
            isChecked={
              checkboxes.some((value) => value === String(CheckboxValues.Third))
                ? true
                : false
            }
            onChange={() => {
              checkboxes.some((value) => value === String(CheckboxValues.Third))
                ? setCheckboxes(
                    checkboxes.filter(
                      (value) => value !== String(CheckboxValues.Third)
                    )
                  )
                : setCheckboxes([...checkboxes, String(CheckboxValues.Third)]);
            }}
          >
            Is Live
          </Checkbox>
          <Editable
            border="1px solid"
            borderColor="cyan.300"
            borderRadius={10}
            p={2}
            defaultValue={checkboxContainer.descCheckboxThree}
            placeholder="Enter Extra Info Here"
          >
            <EditablePreview />
            <EditableInput
              onChange={(e) => {
                setDescCheckboxes({
                  ...descCheckboxes,
                  descCheckboxThree: e.target.value,
                });
              }}
            />
          </Editable>
        </Box>
      </VStack>
      <Button
        mt={2}
        colorScheme="cyan"
        onClick={async () => {
          console.log({
            descCheckboxOne: descCheckboxes.descCheckboxOne,
            descCheckboxTwo: descCheckboxes.descCheckboxTwo,
            descCheckboxThree: descCheckboxes.descCheckboxThree,
          });
          await axios.put(`http://localhost:5000/infoAPI/info/${infoUuid}`, {
            checkboxes,
            descCheckboxOne: descCheckboxes.descCheckboxOne,
            descCheckboxTwo: descCheckboxes.descCheckboxTwo,
            descCheckboxThree: descCheckboxes.descCheckboxThree,
          });

          mutate(`http://localhost:5000/infoAPI/${infoUuid}`);
        }}
      >
        Save
      </Button>
    </Box>
  );
};

export default CheckBoxControl;
