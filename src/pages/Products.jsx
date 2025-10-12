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
  const { currentuser = {} } = cookies; // assign empty object to avoid error if user is not logged in
  const { token = "" } = currentuser;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // get products from API
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
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        // delete product at the backend
        await deleteProduct(id, token);

        // method #1: remove from the state manually
        // delete product from the state
        // setProducts(products.filter( (p) => p._id !== id ));

        // method #2: get the new data from the backend
        const updateProducts = await getProducts(category);
        setProducts(updateProducts);

        toast.success("Menu has been deleted");
      }
    });
  };
  return (
    <>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
            }}
          >
            Menus
          </Typography>
          {/* {currentuser.role === "admin" ? ( */}
          <Button
            component={Link}
            to="/products/new"
            variant="contained"
            color="success"
          >
            Add New
          </Button>
          {/* ) : null} */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            paddingBottom: "10px",
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "5px" }}
            >
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem value={cat._id}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="center">RM{product.price}</TableCell>
                  <TableCell align="center">{product.category.label}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/products/${product._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => {
                        handleProductDelete(product._id);
                      }}
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
