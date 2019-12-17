import basePost from "./basePost";

export const login = (username, password, onSuccess, onFailure) => {
  const body = {
    username,
    password
  };

  basePost("/login", body, onSuccess, onFailure);
};

export const logout = () => {
  const body = {
    token: localStorage.getItem("token")
  };

  basePost("/logout", body, console.log);
};
