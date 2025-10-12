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
  // load the cart items from the local storage
  const [cart, setCart] = useState(getCart());

  const getCartTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total.toFixed(2);
  };

  const removeItemFromCart = (product) => {
    // 1. remove product from cart
    const updatedCart = cart.filter((item) => item._id !== product._id);
    // 2. update the cart data in local storage and the state
    updateCart(updatedCart);
    // 3. update the state
    setCart(updatedCart);
  };

  return (
    <>
      <Header current="cart" title="Cart" />
      <Container sx={{ textAlign: "center" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.length > 0 ? (
                cart.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="right">{product.quantity}</TableCell>
                    <TableCell align="right">
                      ${(product.price * product.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            // once user confirm, then we delete the product
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
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    No Product Add Yet!
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell colSpan={3}></TableCell>
                <TableCell align="right">${getCartTotal()}</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mb: 3, gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            component={Link}
            to="/menus"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
            disabled={cart.length === 0 ? true : false}
          >
            Checkout
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
