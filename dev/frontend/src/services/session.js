import { post } from "./base";

export const login = (username, password, onSuccess, onFailure) => {
  const body = {
    username,
    password
  };

  post("/login", body, onSuccess, onFailure);
};

export const logout = () => {
  const body = {
    token: localStorage.getItem("token")
  };

  post("/logout", body, () => {});
};
