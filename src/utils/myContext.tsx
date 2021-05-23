import { createContext } from "react";
import { IMyContext } from "./customTypes";

export const MyContext = createContext<IMyContext>({
  state: {},
  dispatch: () => {},
});
