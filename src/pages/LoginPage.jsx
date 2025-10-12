import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { login } from "../utils/api_auth";
import { Button, Typography, Chip, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    // 1. check for error
    try {
      if (!email || !password) {
        toast.error("Please fill up the required fields");
      } else {
        const userData = await login(email, password);
        // set cookies
        setCookie("currentuser", userData, {
          maxAge: 60 * 60 * 8, // expire in 8 hours
        });
        toast.success("User has successfully logged in");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header current="login" title="Login to Your Account" />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3 }}>
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleFormSubmit}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
