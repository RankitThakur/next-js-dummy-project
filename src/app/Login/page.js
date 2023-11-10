"use client";
import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Box, Grid, Typography, Paper } from "@mui/material";
import { LoginValidationSchema } from "./login.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidationSchema,
      onSubmit: async (values) => {
        const { email, password } = values;
        const response = await fetch("/api/login", {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.result) {
          router.push("/Dashboard");
        }
        localStorage.setItem("access-token", data.accessToken);
      },
    });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}></Grid>
      <Grid
        item
        xs={12}
        md={5}
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
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email && true}
                helperText={touched.email && errors.email}
                data-testid="email-input"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password && true}
                helperText={touched.password && errors.password}
                data-testid="password-input"
              />
              <Grid container />
              <Box sx={{ mt: 2 }}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    background: "black",
                  }}
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Typography
                sx={{
                  mr: 1,
                }}
              >
                Don't have an account?
              </Typography>

              <Link href="/SignUp">Sign up</Link>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};
export default React.memo(Login);
