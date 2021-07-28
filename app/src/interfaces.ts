import { Place } from "./App";

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
}

export interface FileData {
  uuid: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  filename: string;
  description: string;
}

export interface UserData {
  infos: InfoAPI[];
  files: FileData[];
}
