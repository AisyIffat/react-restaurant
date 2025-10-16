import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { getBookingsAdmin } from "../utils/api_admin";
import { deleteBooking } from "../utils/api_booking";
import { useCookies } from "react-cookie";
import { Link } from "react-router";

export default function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("all");
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  // Load all bookings
  useEffect(() => {
    getBookingsAdmin(token, status)
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, status]);

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBooking(id, token);
        const updatedBookings = await getBookingsAdmin(token, status);
        setBookings(updatedBookings);
        toast.info("Booking has been deleted");
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
          Manage Bookings
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: "20px",
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="status-select-label"
              sx={{ backgroundColor: "white", px: 1 }}
            >
              Filter by Status
            </InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="status"
              onChange={(event) => setStatus(event.target.value)}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 4 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2e7d32" }}>
                <TableCell sx={{ color: "white" }}>Customer</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Time</TableCell>
                <TableCell sx={{ color: "white" }}>People</TableCell>
                <TableCell sx={{ color: "white" }}>Table</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.customerName}</TableCell>
                  <TableCell>{b.customerEmail}</TableCell>
                  <TableCell>{b.date}</TableCell>
                  <TableCell>{b.time}</TableCell>
                  <TableCell>{b.peopleCount}</TableCell>
                  <TableCell>{b.tableNumber || "-"}</TableCell>
                  <TableCell>{b.status}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/bookings/${b._id}/edit`}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
