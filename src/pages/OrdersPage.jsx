import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { getOrders, updateOrder, deleteOrder } from "../utils/api_orders";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

const OrdersPage = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all orders
  useEffect(() => {
    getOrders(token)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, [token]);

  const handleUpdate = async (id, newStatus) => {
    setLoading(true);
    await updateOrder(id, newStatus, token);
    const updatedOrders = await getOrders(token);
    setOrders(updatedOrders);
    toast.info("Status has been updated");
    setLoading(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteOrder(id, token);
        const updatedOrders = await getOrders(token);
        setOrders(updatedOrders);
        toast.success("Order has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="orders" title="Order Management" />
      <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
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
            sx={{
              fontWeight: "bold",
              color: "#2e7d32",
            }}
          >
            My Orders
          </Typography>
        </Box>

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
                  <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Products</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Payment Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f9fbe7",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography fontWeight="bold">
                          {order.customerName}
                        </Typography>
                        <Typography variant="body2" color="gray">
                          {order.customerEmail}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {order.products.map((product, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              backgroundColor: "#f1f8e9",
                              p: 0.5,
                              mb: 0.5,
                              borderRadius: 1,
                              display: "block",
                            }}
                          >
                            {product.name}
                          </Typography>
                        ))}
                      </TableCell>

                      <TableCell sx={{ fontWeight: "bold" }}>
                        RM {order.totalPrice.toFixed(2)}
                      </TableCell>

                      <TableCell>
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                              value={order.status}
                              label="Status"
                              disabled={
                                order.status === "pending" ||
                                currentuser.role === "user"
                              }
                              onChange={(e) =>
                                handleUpdate(order._id, e.target.value)
                              }
                            >
                              <MenuItem value="pending" disabled>
                                Pending
                              </MenuItem>
                              <MenuItem value="paid">Paid</MenuItem>
                              <MenuItem value="failed">Failed</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </TableCell>

                      <TableCell>{order.paid_at}</TableCell>

                      <TableCell align="right">
                        {order.status === "paid"  ? (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          fullWidth
                          component={Link}
                          to={`/orders/${order._id}`}
                          sx={{ mr: 1, mb: 1, borderRadius: 2, display: "flex" }}
                        >
                          View
                        </Button>
                        ) : null}
                        {order.status === "pending"  ? (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            fullWidth
                            sx={{ mr: 1, borderRadius: 2, display: "flex" }}
                            onClick={() => handleDelete(order._id)}
                          >
                            Delete
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                      <Typography color="gray">No orders found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default OrdersPage;
