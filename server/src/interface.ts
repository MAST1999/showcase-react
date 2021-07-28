import { Method } from "./enum";

export interface Route {
  method: Method;
  controller: any;
  route: string;
  action: string;
}
