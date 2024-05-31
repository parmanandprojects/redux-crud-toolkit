import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosIstance } from "../config/DataService";
import { API } from "../config/api";
import { toast } from "react-toastify";

//get-users---
export const fetchUsers = createAsyncThunk(
  "fetchUsers/users",
  async (navigate, { rejectWithValue }) => {
    try {
      let response = await axiosIstance.get(API.GET_ALL_USER);

      return response;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

//add-users---
export const addUsers = createAsyncThunk(
  "addUsers/users",
  async ({ data, navigate }, { rejectWithValue }) => {
    // debugger;
    try {
      let response = await axiosIstance.post(API.ADD_USER, data);
      if (response.data.status == 201) {
        toast.success(response.data.message);
        navigate("/");
      }
      return response;
    } catch (err) {
      console.log(err, "errrr");
      return rejectWithValue(err);
    }
  }
);

//delete-users---
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      let response = await axiosIstance.delete(`${API.DELETE_USER}/${id} `);
      if (response.data.status == 200) {
        console.log(response.data);
        toast.success(response?.data?.message);
        navigate("/");
      }
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

//update-users---
export const updateUser = createAsyncThunk(
  "updateUser/users",
  async ({ data, id, navigate }, { rejectWithValue }) => {
    try {
      let response = await axiosIstance.post(`${API.UPDATE_USER}/${id} `, data);
      if (response.data.status == 200) {
        console.log(response.data);
        toast.success(response?.data?.message);
        navigate("/");
      }
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
