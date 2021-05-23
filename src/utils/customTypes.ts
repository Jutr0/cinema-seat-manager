import { Dispatch } from "react";

export type IApiResponse = ISeat[];
export type ISeat = {
  id: string;
  cords: ICords;
  reserved: boolean;
  picked?: boolean;
};
export type ICords = {
  x: number;
  y: number;
};

export interface IMyContext {
  state: IMyState;
  dispatch: Dispatch<IMyState>;
}

export interface IMyState {
  apiResponse?: IApiResponse;
  seatsNum?: number | null;
  seatsPicked?: ISeat[];
  isNextTo?: boolean;
}
