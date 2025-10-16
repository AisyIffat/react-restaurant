import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState } from "react";
import { login } from "../utils/api_auth";
import { Button, Typography, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill up the required fields");
      } else {
        const userData = await login(email, password);
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
            Welcome Back
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Please login to continue to your account.
          </Typography>

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

          <Box mb={4}>
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
            Login
          </Button>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              Don’t have an account yet?
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 3, ml: 1, color: "text.secondary" }}
              component={Link}
              to="/signup"
            >
              Sign Up Here
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
