import basePost from "./basePost";

export const list = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/admin/list-user", body, onSuccess, onFailure);
};

export const add = () => {};

export const view = () => {};

export const modify = () => {};

export const lock = () => {};

export const unlock = () => {};
