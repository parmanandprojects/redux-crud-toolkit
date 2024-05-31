import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import "./AddUser.css";
import { useFormik } from "formik";
import {
  AddUserValidationSchema,
  editUserValidationSchema,
} from "../../validation/AllSchemas";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUsers, updateUser } from "../../redux";
import { axiosIstance } from "../../config/DataService";
import { API } from "../../config/api";

const AddUser = () => {
  const [editUser, setEditUser] = useState(null);
  console.log(editUser?.name, "editUser");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let location = useLocation();
  console.log(location, "location");
  let editDataId = location?.state;

  const formik = useFormik({
    initialValues: {
      name: editUser ? "dsfsdfsdfsdf" : "",
      email: editUser ? editUser?.email : "",
      mobile: editUser ? editUser?.mobie : "",
      password: "",
      cPassword: "",
    },
    validationSchema: editUser
      ? editUserValidationSchema
      : AddUserValidationSchema,
    onSubmit: (values, actions) => {
      if (editUser) {
        try {
          actions.setSubmitting(true);
          dispatch(updateUser({ data: values, id: editDataId, navigate })).then((res)=>console.log(res,"resss"));
          actions.resetForm();
        } catch (error) {
          console.error("Submission error:", error);
        }
      } else {
        try {
          actions.setSubmitting(true);
          dispatch(addUsers({ data: values, navigate }));
          actions.resetForm();
        } catch (error) {
          console.error("Submission error:", error);
        }
      }

      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (editDataId) {
      axiosIstance
        .get(`${API.GET_SINGLE_USER}/${editDataId}`)
        .then((res) => setEditUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, [editDataId]);

  useEffect(() => {
    if (editUser) {
      formik.setValues({
        name: editUser.name,
        email: editUser.email,
        mobile: editUser.mobile,
        password: "",
        cPassword: "",
      });
    }
  }, [editUser]);

  return (
    <>
      <Box className="form-wrapper">
        <Box className="main-form">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              placeholder="Enter name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br />
            {console.log(formik.values)}
            <TextField
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            <TextField
              placeholder="Enter mobile number"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
            <br />
            {editUser ? (
              ""
            ) : (
              <>
                <TextField
                  placeholder="Enter password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <br />
                <TextField
                  placeholder="Confirm password"
                  name="cPassword"
                  value={formik.values.cPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cPassword && Boolean(formik.errors.cPassword)
                  }
                  helperText={
                    formik.touched.cPassword && formik.errors.cPassword
                  }
                />
                <br />
              </>
            )}
            <Box className="sbmt-btn">
              <Button
                type="submit"
                variant="contained"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : editUser ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
