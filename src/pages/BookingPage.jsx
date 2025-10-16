import Header from "../components/Header";
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getBookings } from "../utils/api_booking";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const MyBookings = () => {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
   getBookings(token, status)
    .then((data) => {
      console.log("Fetched data for status:", status, data);
      setBookings(data);
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to load bookings");
    });
  }, [token, status]);

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold" color="green">
            My Bookings
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": { backgroundColor: "#1b5e20" },
              borderRadius: "10px",
              textTransform: "none",
            }}
            onClick={() => navigate("/bookings/add")}
          >
            Add New Booking
          </Button>
        </Box>

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

        {bookings.length === 0 ? (
          <Typography align="center" color="text.secondary">
            You have no bookings yet.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Paper
              key={booking._id}
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: "15px",
                backgroundColor: "#fffaf0",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="#2e7d32">
                {booking.customerName}
              </Typography>
              <Typography color="text.secondary">
                {booking.customerEmail}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography>
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Time:</strong> {booking.time}
              </Typography>
              <Typography>
                <strong>People:</strong> {booking.peopleCount}
              </Typography>
              <Typography>
                <strong>Notes:</strong> {booking.notes || "—"}
              </Typography>
              <Typography>
                <strong>Table Number:</strong>{" "}
                {booking.tableNumber || "Not Assigned"}
              </Typography>

              <Box mt={2}>
                <Chip
                  label={booking.status}
                  sx={{
                    backgroundColor:
                      booking.status === "Confirmed"
                        ? "#4caf50"
                        : booking.status === "Pending"
                        ? "#ffb300"
                        : "#e53935",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </>
  );
};

export default MyBookings;
