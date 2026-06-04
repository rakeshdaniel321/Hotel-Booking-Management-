import { createSlice } from "@reduxjs/toolkit";

// பிரவுசர் நினைவகத்தில் ஏற்கனவே லாகின் டேட்டா இருக்கிறதா என்று பார்க்கிறோம்
const savedEmail = localStorage.getItem("adminEmail");
const isAuth = localStorage.getItem("isAdminAuthenticated") === "true";

const initialState = {
  isAuthenticated: isAuth,
  adminEmail: savedEmail
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.adminEmail = action.payload.email;
      
      //local memory
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminEmail", action.payload.email);
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.adminEmail = null;
      
      
      localStorage.removeItem("isAdminAuthenticated");
      localStorage.removeItem("adminEmail");
    }
  }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
