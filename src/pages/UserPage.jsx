import Header from "../components/Header";
import {
  Container,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { getUsers, updateUser, deleteUser } from "../utils/api_auth";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { toast } from "sonner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function UserPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getUsers(users).then((data) => setUsers(data));
  }, [users]);

  const handleUpdateUser = async (_id, name, email, role) => {
    if (!name || !email || !role) {
      toast.error("Please fill up all required fields");
      return;
    }
    try {
      await updateUser(_id, name, email, role);
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUserDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(id, token);
        const updateUsers = await getUsers(category);
        setUsers(updateUsers);
        toast.success("User has been deleted");
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
          sx={{ color: "#2e7d32" }}
        >
          Manage Users
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            mt: 3,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#2e7d32" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Role
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f5f5f5",
                    },
                    "&:hover": { backgroundColor: "#e8f5e9" },
                  }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {user.role}
                  </TableCell>
                  <TableCell align="center">
                    <Box>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        setOpen(true);
                        setSelectedID(user._id);
                        setSelectedName(user.name);
                        setSelectedEmail(user.email);
                        setSelectedRole(user.role);
                      }}
                    >
                      Edit
                    </Button>
                      {currentuser.email === user.email ? ( null
                      ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleUserDelete(user._id)}
                      >
                        Delete
                      </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit User Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontWeight="bold"
              sx={{ color: "#2e7d32", mb: 2 }}
            >
              Edit User
            </Typography>

            <TextField
              label="Name"
              value={selectedName}
              fullWidth
              sx={{ mb: 2 }}
              onChange={(e) => setSelectedName(e.target.value)}
            />
            <TextField
              label="Email"
              value={selectedEmail}
              fullWidth
              disabled
              sx={{ mb: 2 }}
              onChange={(e) => setSelectedEmail(e.target.value)}
            />
            <TextField
              label="Role"
              value={selectedRole}
              fullWidth
              onChange={(e) => setSelectedRole(e.target.value)}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 3,
              }}
            >
              <Button
                color="success"
                variant="contained"
                onClick={() => {
                  handleUpdateUser(
                    selectedID,
                    selectedName,
                    selectedEmail,
                    selectedRole
                  );
                  setOpen(false);
                }}
              >
                Save
              </Button>
              <Button color="error" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
}
