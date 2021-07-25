import { Place } from "./App";

export interface User {
  username: string;
  uuid: string;
  email: string;
}

export interface Info {
  title: string;
  dateRecord: string;
  list: Place;
  uuid: string;
}

export interface InfoAPI {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  list: Place;
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
