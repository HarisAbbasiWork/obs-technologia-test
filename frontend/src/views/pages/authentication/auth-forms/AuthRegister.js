import React from 'react';
import { Box, Button, TextField, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';

const FirebaseRegister = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string().required('Phone number is required')
      })}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        axios.post('http://localhost:3001/user/signup', values, {
          headers: { 'Content-Type': 'application/json' }
        }).then(response => {
          console.log("Signup successful", response);
          navigate("/login"); // Navigate to login page on successful signup
          setSubmitting(false);
        }).catch(error => {
          console.error('Error during signup', error);
          setErrors({ submit: error.message });
          setSubmitting(false);
        });
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            fullWidth
            label="Middle Name (optional)"
            name="middleName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.middleName}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.address}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.phoneNumber}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
        </form>
      )}
    </Formik>
  );
};

export default FirebaseRegister;
