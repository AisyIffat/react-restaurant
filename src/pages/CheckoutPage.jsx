import {
  Container,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { getCart } from "../utils/cart";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { toast } from "sonner";
import validator from "email-validator";
import { createOrder } from "../utils/api_orders";
import { useCookies } from "react-cookie";

const CheckoutPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "", email = "", name = "" } = currentuser;

  const [cart, setCart] = useState(getCart());
  const [loading, setLoading] = useState(false);

  const getCartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total.toFixed(2);
  };

  const handleCheckout = async () => {
    if (!name || !email) {
      toast.error("Please fill up all the fields");
    } else if (!validator.validate(email)) {
      toast.error("Please use a valid email address");
    } else {
      try {
        setLoading(true);
        const totalPrice = getCartTotal();
        const response = await createOrder(name, email, cart, totalPrice);
        const billplz_url = response.billplz_url;
        window.location.href = billplz_url;
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header current="checkout" title="Checkout" />
      <Container
        maxWidth="lg"
        sx={{
          mt: 6,
          mb: 6,
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: 3,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "#2e7d32" }}
        >
          Checkout Details
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Left side — Contact info */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Contact Information
              </Typography>

              <Box mb={3}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

              <Box mb={3}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                sx={{ mt: 2, py: 1.4, fontWeight: "bold" }}
                onClick={handleCheckout}
              >
                Pay RM {getCartTotal()}
              </Button>
            </Paper>
          </Grid>

          {/* Right side — Order Summary */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Your Order Summary
              </Typography>

              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#2e7d32" }}>
                    <TableRow>
                      <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                        Product
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "#fff", fontWeight: "bold" }}
                      >
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.length > 0 ? (
                      cart.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell component="th" scope="row">
                            {product.name}
                          </TableCell>
                          <TableCell align="right">
                            RM {(product.price * product.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No product has been added to cart yet
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow sx={{ backgroundColor: "#f1f8f4" }}>
                      <TableCell
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      >
                        RM {getCartTotal()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CheckoutPage;
