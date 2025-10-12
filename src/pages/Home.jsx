import Header from "../components/Header";
import { Container } from "@mui/material";
import { getProducts } from "../utils/api_products";
import { getCategories } from "../utils/api_category";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Home() {
  // const [cookies] = useCookies(["currentuser"]);
  // const { currentuser = {} } = cookies; // assign empty object to avoid error if user is not logged in
  // const { token = "" } = currentuser;
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // get products from API
    getProducts(category, page).then((data) => {
      setProducts(data);
    });
  }, [category, page]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);
  return (
    <>
      <Header />
      <AppBar
        position="static"
        fullwidth
        sx={{ backgroundColor: "gray", mb: 4}}
      >
        <Toolbar sx={{ overflowX: "auto", gap: 2, justifyContent: "center" }}>
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem value={cat._id}>{cat.label}</MenuItem>
          ))}
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product._id}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5">
                    {product.name}
                  </Typography>
                  <Typography variant="h6">
                    {"RM" + product.price}
                  </Typography>
                  <Typography variant="h5">
                    {product.category.label}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "block", px: 3, pb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {products.length === 0 ? (
          <Typography variant="h5" align="center" py={3}>
            No more menus found.
          </Typography>
        ) : null}
      </Container>
    </>
  );
}
