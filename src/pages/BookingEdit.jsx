import Header from "../components/Header";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { getBooking, updateBooking } from "../utils/api_booking";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

export default function BookingEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [peopleCount, setPeopleCount] = useState(0);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");
  const [tableNumber, setTableNumber] = useState("");

  // Fetch booking data
  useEffect(() => {
    getBooking(id)
      .then((bookingData) => {
        // check if bookingData is empty or not
        if (bookingData) {
          // update the state with the bookingData
          setCustomerName(bookingData ? bookingData.customerName : "");
          setCustomerEmail(bookingData ? bookingData.customerEmail : "");
          setDate(bookingData ? bookingData.date : "");
          setTime(bookingData ? bookingData.time : "");
          setPeopleCount(bookingData ? bookingData.peopleCount : 0);
          setNotes(bookingData ? bookingData.notes : "");
          setStatus(bookingData ? bookingData.status : "Pending");
          setTableNumber(bookingData ? bookingData.tableNumber : "");
        } else {
          // if not available, set error message
          setError("Booking not found");
        }
      })
      .catch((error) => {
        // catch the API error
        setError("Booking not found");
      });
  }, [id]);

  const handleFormSubmit = async (event) => {
    // 1. check for error
    if (!status || !tableNumber) {
      toast.error("Please fill up the required fields");
    }
    try {
      console.log(token);
      // 2. trigger the API to update new product
      await updateBooking(id, date, time, status, tableNumber, token);
      // 3. if successful, redirect user back to home page and show success message
      toast.success("Booking has been updated");
      navigate("/manage/admins/bookings");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ mt: 5 }}>
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
            Edit Booking
          </Typography>

          <Box mb={2}>
            <TextField
              label="Customer Name"
              fullWidth
              disabled
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Customer Email"
              fullWidth
              disabled
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Date"
              fullWidth
              disabled
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Time"
              fullWidth
              disabled
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="People Count"
              fullWidth
              disabled
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Notes"
              fullWidth
              multiline
              disabled
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Box>

          <Box mb={2}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Confirmed">Confirmed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </Box>

          <Box mb={2}>
            <TextField
              label="Table Number"
              type="number"
              fullWidth
              disabled={status === "Pending" || status === "Cancelled"}
              inputProps={{ min: 1, max: 30 }}
              value={tableNumber}
              onChange={(e) => {
                setTableNumber(e.target.value);
              }}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 2 }}
              onClick={handleFormSubmit}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/manage/admins/bookings")}
            >
              Back
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
}
