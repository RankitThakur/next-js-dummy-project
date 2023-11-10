"use client";
import React from "react";
import { Box, Button, Grid, TextField, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import SignUpValidationSchema from "./signUp.schema";
import { SIGN_UP_FIELDS } from "./constent";
import Link from "next/link";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: SignUpValidationSchema,

    onSubmit: async (values) => {
      const { name, email, password } = values;
      console.log("userWorking");
      await fetch("/api/sign-up", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
      });
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={6}></Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: "70%",
          }}
        >
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              background: "#fbfbfb",
              border: "1px solid #ccc",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                {Object.entries(SIGN_UP_FIELDS).map(([value, label], key) => (
                  <Grid key={key} item xs={12}>
                    <TextField
                      fullWidth
                      id={value}
                      name={value}
                      label={label}
                      type={
                        value === "password" ||
                        value === "password_confirmation"
                          ? "password"
                          : "text"
                      }
                      variant="outlined"
                      value={formik.values[value]}
                      onChange={formik.handleChange}
                      error={
                        formik.touched[value] && Boolean(formik.errors[value])
                      }
                      helperText={formik.touched[value] && formik.errors[value]}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2, background: "black" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Typography
                  sx={{
                    mr: 1,
                  }}
                >
                  Have an account?
                </Typography>
                <Link href="/Login">Login in</Link>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
