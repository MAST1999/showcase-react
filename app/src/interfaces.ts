import { Place } from "./App";
import { CheckboxSelection, TypeOfFile, Version } from "./enums";

export interface User {
  username: string;
  uuid: string;
  email: string;
  infos: InfoAPI[];
  files: FileData[];
}

export interface InfoAPI {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  place: Place;
  checkboxes: CheckboxSelection;
  descCheckboxOne: string;
  descCheckboxTwo: string;
  descCheckboxThree: string;
  date: Date;
}

export interface CheckboxContainer {
  checkboxes: CheckboxSelection;
  descCheckboxOne: string;
  descCheckboxTwo: string;
  descCheckboxThree: string;
}

export interface FileData {
  uuid: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  filename: string;
  description: string;
  number: number;
  version: Version;
  type: TypeOfFile;
  date: Date;
}

export interface UserData {
  infos: InfoAPI[];
  files: FileData[];
}
