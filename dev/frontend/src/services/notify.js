import basePost from "./basePost";

export const list = onSuccess => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/notifications/get", body, onSuccess);
};

export const read = () => {};

export const readAll = () => {};
