import Header from "../components/Header";
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { getProducts, deleteProduct } from "../utils/api_products";
import { getCategories } from "../utils/api_category";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

export default function Products() {
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  const handleProductDelete = async (id) => {
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
        await deleteProduct(id, token);
        const updateProducts = await getProducts(category);
        setProducts(updateProducts);
        Swal.fire("Deleted!", "The menu has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 5 }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "#2e7d32",
            }}
          >
            Manage Menus
          </Typography>
          <Button
            component={Link}
            to="/products/new"
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              borderRadius: "10px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            + Add New
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
              id="category-select-label"
              sx={{ backgroundColor: "white", px: 1 }}
            >
              Filter by Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Paper
          elevation={4}
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table aria-label="menu table">
              <TableHead
                sx={{
                  backgroundColor: "#2e7d32",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f9fff9",
                        transition: "0.3s",
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: "1rem", fontWeight: 500 }}>
                      {product.name}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "1rem" }}>
                      RM {product.price}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: "1rem" }}>
                      {product.category?.label}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        sx={{
                          mr: 1,
                          textTransform: "none",
                          borderRadius: "8px",
                          backgroundColor: "#0288d1",
                          "&:hover": { backgroundColor: "#0277bd" },
                        }}
                        component={Link}
                        to={`/products/${product._id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          borderRadius: "8px",
                        }}
                        onClick={() => handleProductDelete(product._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
}
