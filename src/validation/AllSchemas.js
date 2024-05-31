import * as yup from 'yup';

export const AddUserValidationSchema = yup.object({
    name: yup
    .string('Enter your name')
    .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
      mobile: yup
      .string('Enter your mobile')
      .required('Mobile is required'),
      password: yup
      .string('Enter your password')
      .required('Password is required'),
  
      cPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match").required('Password is required'),
  });


  export const editUserValidationSchema = yup.object({
    name: yup
    .string('Enter your name')
    .required('Name is required'),
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
      mobile: yup
      .string('Enter your mobile')
      .required('Mobile is required'),
     
   
  });