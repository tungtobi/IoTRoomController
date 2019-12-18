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

export const lock = (username, onSuccess) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/lock-user", body, onSuccess);
};

export const unlock = (username, onSuccess) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  basePost("/admin/unlock-user", body, onSuccess);
};
