import { post } from "./base";

export const list = onSuccess => {
  const body = {
    token: localStorage.getItem("token")
  };

  post("/notifications/get", body, onSuccess);
};

export const read = () => {};

export const readAll = () => {};
