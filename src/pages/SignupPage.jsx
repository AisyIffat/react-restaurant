import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import { signup } from "../utils/api_auth";
import { Button, Typography, Paper } from "@mui/material";
import validator from "email-validator";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";
import { useCookies } from "react-cookie";

const SignupPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      if (!name || !email || !password) {
        toast.error("Please fill up the required fields");
      } else if (!validator.validate(email)) {
        toast.error("Please use a valid email address");
      } else if (password !== confirmPassword) {
        toast.error("Password does not match");
      } else {
        const userData = await signup(name, email, password);
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
      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
          mb: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            backgroundColor: "#f8fafc",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            color="success"
            sx={{ mb: 4 }}
          >
            Sign Up
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Fill in your details to create a new account.
          </Typography>

          <Box mb={3}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Full Name
            </Typography>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Email Address
            </Typography>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box mb={3}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Box mb={4}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Confirm Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              InputProps={{
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Already have an account?
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 3, ml: 1, color: "text.secondary" }}
              component={Link}
              to="/login"
            >
              Login Here
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SignupPage;
