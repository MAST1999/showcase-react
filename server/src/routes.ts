import { FileController } from "./controller/FileController";
import { InfoController } from "./controller/InfoController";
import { UserController } from "./controller/UserController";
import { Method } from "./enum";
import { Route } from "./interface";

const userAPI = "/userAPI";
const infoAPI = "/infoAPI";
const fileAPI = "/fileAPI";

export const Routes: Route[] = [
  // User Routes
  {
    method: Method.Get,
    route: userAPI + "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: Method.Get,
    route: userAPI + "/user/:uuid",
    controller: UserController,
    action: "one",
  },
  {
    method: Method.Post,
    route: userAPI + "/user",
    controller: UserController,
    action: "create",
  },
  {
    method: Method.Delete,
    route: userAPI + "/users/:uuid",
    controller: UserController,
    action: "remove",
  },
  {
    method: Method.Get,
    route: userAPI + "/userDefault",
    controller: UserController,
    action: "defaultUser",
  },
  // Info Routes
  {
    method: Method.Post,
    route: infoAPI + "/info/:uuid",
    controller: InfoController,
    action: "create",
  },
  {
    method: Method.Get,
    route: infoAPI + "/info/:uuid",
    controller: InfoController,
    action: "one",
  },
  {
    method: Method.Delete,
    route: infoAPI + "/info/:uuid",
    controller: InfoController,
    action: "remove",
  },
  // File Routes
  {
    method: Method.Post,
    route: fileAPI + "/files",
    controller: FileController,
    action: "file",
  },
  {
    method: Method.Get,
    route: fileAPI + "/receive/:uuid",
    controller: FileController,
    action: "sendFiles",
  },
  {
    method: Method.Delete,
    route: fileAPI + "/file/:uuid/:userUuid/:infoUuid",
    controller: FileController,
    action: "remove",
  },
  {
    method: Method.Put,
    route: fileAPI + "/file/:uuid/:userUuid/:infoUuid",
    controller: FileController,
    action: "desc",
  },
];
