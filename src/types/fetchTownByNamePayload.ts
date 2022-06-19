import { ITown } from "./town";

export enum FetchType {
  ADD = "ADD",
  UPDATE = "UPDATE",
}

export type FetchTownByNamePayload = {
  data: ITown;
  type: FetchType;
};

export type FetchTownByNameParams = {
  townName: string;
  type: FetchType;
};
