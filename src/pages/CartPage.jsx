import { Container, Button, Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { getCart, updateCart } from "../utils/cart";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { Link } from "react-router";

const CartPage = () => {
  const [cart, setCart] = useState(getCart());

  const getCartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total.toFixed(2);
  };

  const removeItemFromCart = (product) => {
    const updatedCart = cart.filter((item) => item._id !== product._id);
    updateCart(updatedCart);
    setCart(updatedCart);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
        {/* Title Section */}
        <Box
          sx={{
            textAlign: "left",
            mb: 4,
            borderBottom: "3px solid #2e7d32",
            pb: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            My Cart
          </Typography>
        </Box>

        {/* Cart Table */}
        <Paper
          elevation={4}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Total
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cart.length > 0 ? (
                  cart.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f9fbe7",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography sx={{ fontWeight: "bold" }}>
                          {product.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        RM {product.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        RM {(product.price * product.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            Swal.fire({
                              title: "Remove this item?",
                              text: "It will be deleted from your cart.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, remove it!",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                removeItemFromCart(product);
                              }
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      colSpan={5}
                      align="center"
                      sx={{ py: 4 }}
                    >
                      <Typography color="gray" variant="body1">
                        No products added yet!
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {/* Cart Total Row */}
                <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                  >
                    RM {getCartTotal()}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            component={Link}
            to="/menus"
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/checkout"
            disabled={cart.length === 0}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
