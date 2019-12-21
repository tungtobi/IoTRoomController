import { post } from "./base";

export const list = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  post("/admin/list-user", body, onSuccess, onFailure);
};

export const add = (user, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...user
  };

  console.log(body);

  post("/admin/add-user", body, onSuccess, onFailure);
};

export const remove = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  post("/admin/delete-user", body, onSuccess, onFailure);
};

export const view = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  post("/user/info", body, onSuccess, onFailure);
};

export const modify = (info, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...info
  };

  post("/admin/modify-user", body, onSuccess, onFailure);
};

export const modifySelf = (info, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    ...info
  };

  post("/user/modify-user", body, onSuccess, onFailure);
};

export const changePassword = (username, password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username,
    password
  };

  post("/admin/modify-user", body, onSuccess, onFailure);
};

export const changeSelfPassword = (password, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    password
  };

  post("/user/modify-user", body, onSuccess, onFailure);
};
export const lock = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  post("/admin/lock-user", body, onSuccess, onFailure);
};

export const unlock = (username, onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token"),
    username
  };

  post("/admin/unlock-user", body, onSuccess, onFailure);
};

export const data = (onSuccess, onFailure) => {
  const body = {
    token: localStorage.getItem("token")
  };

  post("/iot/data", body, onSuccess, onFailure);
};
