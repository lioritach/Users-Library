import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "usersFields",
  initialState: {
    usersData: null,
    status: "idle",
  },
  reducers: {
    getUsersData: (state, action) => {
      state.usersData = action.payload;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setNewUser: (state, action) => {
      state.usersData.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.usersData = state.usersData.filter(
        (arrow) => arrow.email !== action.payload
      );
    },
  },
});

export const {
  getUsersData,
  setStatus,
  deleteUser,
  setNewUser,
} = Slice.actions;
export const selectUsersData = (state) => state.usersFields.usersData;
export const selectStatus = (state) => state.usersFields.status;

export default Slice.reducer;
