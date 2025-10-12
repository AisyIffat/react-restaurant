import Header from "../components/Header";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../utils/api_category";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { getCategories } from "../utils/api_category";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [label, setLabel] = useState("");
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // get products from API
    getCategories(categories).then((data) => {
      setCategories(data);
    });
  }, [categories]);

  const handleAddCategory = async (event) => {
    // 1. check for error
    if (!label) {
      toast.error("Please fill up the required fields");
    }
    try {
      await addCategory(label);
      toast.success("New category has been added");
      setLabel("");
      navigate("/categories");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateCategory = async (_id, label) => {
    // 1. check for error
    if (!label) {
      toast.error("Please fill up the required fields");
    }
    try {
      await updateCategory(_id, label);
      toast.success("Category has been updated");
      navigate("/categories");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCategory(_id);
        const updateCategories = await getCategories(_id);
        setCategories(updateCategories);

        toast.success("Category has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="categories" title="Manage Categories" />
      <Container maxWidth="lg">
        <Typography variant="h4">
          <b>Categories</b>
        </Typography>
        <Paper
          elevation={2}
          sx={{ mt: 1, mb: 3, p: 2, display: "flex", gap: 2 }}
        >
          <TextField
            label="Category Name"
            fullWidth
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          ></TextField>
          <Button
            color="primary"
            variant="contained"
            onClick={(event) => handleAddCategory(event.target.value)}
          >
            Add
          </Button>
        </Paper>
        <Paper elevation={2} sx={{ mt: 1, mb: 3, p: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.label}
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 3,
                      }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          setOpen(true);
                          setSelectedCategoryID(category._id);
                          setSelectedCategoryLabel(category.label);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          handleDeleteCategory(category._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Edit Category
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                <TextField
                  value={selectedCategoryLabel}
                  fullWidth
                  onChange={(e) => setSelectedCategoryLabel(e.target.value)}
                ></TextField>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 3,
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleUpdateCategory(
                      selectedCategoryID,
                      selectedCategoryLabel
                    );
                    setOpen(false);
                  }}
                >
                  Edit
                </Button>
                <Button color="error" variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Box>
          </Modal>
        </Paper>
      </Container>
    </>
  );
};

export default CategoriesPage;
