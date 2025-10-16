import Header from "../components/Header";
import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { toast } from "sonner";
import { getOrdersAdmin, updateOrder, deleteOrder } from "../utils/api_orders";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

export default function ManageOrder() {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all bookings
  useEffect(() => {
    getOrdersAdmin(token)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, [token]);

  const handleUpdate = async (id, newStatus) => {
    setLoading(true);
    await updateOrder(id, newStatus, token);
    const updatedOrders = await getOrdersAdmin(token);
    setOrders(updatedOrders);
    toast.info("Status has been updated");
    setLoading(false);
  };

  // Handle delete
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
        const updatedOrders = await getOrdersAdmin(token);
        setOrders(updatedOrders);
        toast.success("Order has been deleted");
      }
    });
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          color="green"
          textAlign="center"
          sx={{ mb: 3 }}
        >
          Manage Orders
        </Typography>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 4 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2e7d32" }}>
                <TableCell sx={{ color: "white" }}>Customer</TableCell>
                <TableCell sx={{ color: "white" }}>Products</TableCell>
                <TableCell sx={{ color: "white" }}>Total Amount</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Payment Date</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
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
      </Container>
    </>
  );
}
