import Header from "../components/Header";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { createBooking } from "../utils/api_booking";

const BookingAdd = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "", email = user.email } = currentuser;

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState(email);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [notes, setNotes] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!customerName || !customerEmail || !date || !time || !peopleCount) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await createBooking(
        customerName,
        customerEmail,
        date,
        time,
        peopleCount,
        notes,
        token
      );
      toast.success("Your booking has been created!");
      navigate("/bookings");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: "20px",
            backgroundColor: "#fffaf0",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={3}
            fontWeight="bold"
            color="#2e7d32"
          >
            Reserve Your Table
          </Typography>

          <Box mb={2}>
            <TextField
              label="Customer Name"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Customer Email"
              fullWidth
              disabled
              value={email}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              type="date"
              label="Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              type="time"
              label="Time"
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ step: 3600 }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Number of People"
              type="number"
              fullWidth
              inputProps={{ min: 1, max: 30 }}
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              minRows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#2e7d32",
                "&:hover": { backgroundColor: "#1b5e20" },
                borderRadius: "12px",
                textTransform: "none",
              }}
              onClick={handleFormSubmit}
            >
              Book Now
            </Button>
          </Box>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          fullWidth
          onClick={() => navigate("/bookings")}
        >
          Back
        </Button>
      </Container>
    </>
  );
};

export default BookingAdd;
