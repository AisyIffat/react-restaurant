import Header from "../components/Header";
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategories,
} from "../utils/api_category";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
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
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleAddCategory = async () => {
    if (!label) return toast.error("Please fill up the required fields");
    try {
      await addCategory(label);
      toast.success("New category has been added");
      setLabel("");
      const updated = await getCategories();
      setCategories(updated);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateCategory = async (_id, label) => {
    if (!label) return toast.error("Please fill up the required fields");
    try {
      await updateCategory(_id, label);
      toast.success("Category has been updated");
      const updated = await getCategories();
      setCategories(updated);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteCategory = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#388e3c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(_id);
          const updated = await getCategories();
          setCategories(updated);
          toast.success("Category has been deleted");
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    });
  };

  return (
    <>
      <Header current="categories" title="Manage Categories" />
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3 }}
          color="green"
        >
          Manage Categories
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
            backgroundColor: "#f8fafc",
          }}
        >
          <TextField
            label="Category Name"
            fullWidth
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none", px: 4 }}
            onClick={handleAddCategory}
          >
            Add
          </Button>
        </Paper>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            borderRadius: 3,
            backgroundColor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#2e7d32" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Category Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category._id}
                  hover
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                  }}
                >
                  <TableCell>{category.label}</TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setSelectedCategoryID(category._id);
                          setSelectedCategoryLabel(category.label);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ py: 3 }}>
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography
              variant="h5"
              mb={3}
              textAlign="center"
              fontWeight="bold"
            >
              Edit Category
            </Typography>
            <TextField
              fullWidth
              value={selectedCategoryLabel}
              onChange={(e) => setSelectedCategoryLabel(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  handleUpdateCategory(
                    selectedCategoryID,
                    selectedCategoryLabel
                  )
                }
              >
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default CategoriesPage;
