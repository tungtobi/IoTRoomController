import { get } from "./base";

export const chart = (onSuccess, onFailure) => {
  get("/GraphData", onSuccess, onFailure);
};

export const current = (onSuccess, onFailure) => {
  get("/RealData", onSuccess, onFailure);
};
