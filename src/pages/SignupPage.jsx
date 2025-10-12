import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { signup } from "../utils/api_auth";
import { Button, Typography, Chip, Paper } from "@mui/material";
import validator from "email-validator";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async (event) => {
    // 1. check for error
    try {
      if (!name || !email || !password) {
        toast.error("Please fill up the required fields");
      } else if (!validator.validate(email)) {
        // 2. make sure the email is valid
        toast.error("Please use a valid email address");
      } else if (password !== confirmPassword) {
        toast.error("Password does not match");
      } else {
        const userData = await signup(name, email, password);
        // set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        toast.success("New user has been added");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header current="signup" title="Create a New Account" />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box mb={2}>
            <Typography variant="h6">Name</Typography>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Email</Typography>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Password</Typography>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6">Confirm Password</Typography>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
