import { createSlice } from "@reduxjs/toolkit";
import { addUsers, fetchUsers } from "..";
import { toast } from "react-toastify";

export const UserSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    token: "",
    loading: false,
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading=true;

      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading=false
        state.users=action?.payload?.data?.user
      })
      .addCase(fetchUsers.rejected, (state, action) => {

        state.loading=false;
        console.log(action.payload,"actionRejected")
      })

      



      .addCase(addUsers.pending, (state, action) => {
        state.loading=true;

      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.loading=false
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.loading=false;
        toast.error(action.payload.response.data.message)
      });
  },
});

export default UserSlice.reducer;
