import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialUsers = () => {
  const item = window.localStorage.getItem("users");
  return item
    ? JSON.parse(item)
    : [
        {
          id: uuidv4(),
          name: "dashcode",
          email: "dashcode@gmail.com",
          password: "dashcode",
        },
      ];
};
// save users in local storage

const initialIsAuth = () => {
  const item = window.localStorage.getItem("isAuth");
  return item ? JSON.parse(item) : false;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: initialUsers(),
    isAuth: initialIsAuth(),
  },
  reducers: {
    handleRegister: (state, action) => {
      const { name, email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);
      if (user) {
        ToastPopup("error", "User already exists!")
      } else {
        state.users.push({
          id: uuidv4(),
          name,
          email,
          password,
        });
        window.localStorage.setItem("users", JSON.stringify(state.users));
        ToastPopup("success", "User registered successfully!")
      }
    },

    handleLogin: (state, action) => {
      state.isAuth = action.payload;
      // save isAuth in local storage
      window.localStorage.setItem("isAuth", JSON.stringify(state.isAuth));
      ToastPopup("success", "User logged in successfully!")
    },
    handleLogout: (state, action) => {
      state.isAuth = action.payload;
      // remove isAuth from local storage
      window.localStorage.removeItem("isAuth");
      ToastPopup("success", "User logged out successfully!")
    },
  },
});

export const { handleRegister, handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
