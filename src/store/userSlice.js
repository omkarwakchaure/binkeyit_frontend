import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
const initialState = {
  _id: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateAvatar: (state, action) => {
      return { ...state, avatar: action.payload };
    },
    logout: () => initialState,
  },
});
export const { setUserDetails, updateAvatar, logout } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = () => useSelector((state) => state.user);
export const userRole =()=> useSelector((state)=>state.user.role)