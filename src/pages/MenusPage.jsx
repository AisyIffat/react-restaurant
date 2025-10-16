import Header from "../components/Header";
import {
  AppBar,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Fab,
} from "@mui/material";
import { getProducts } from "../utils/api_products";
import { getCategories } from "../utils/api_category";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router";
import { addToCart } from "../utils/cart";
import { useCookies } from "react-cookie";

export default function MenusPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;

  useEffect(() => {
    getProducts(category).then((data) => setProducts(data));
  }, [category]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ backgroundColor: "#FFF8E1", minHeight: "100vh" }}>
        {/* Category Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: "linear-gradient(90deg, #004d31 0%, #007a53 100%)",
            color: "white",
            py: 1,
          }}
        >
          <Tabs
            value={category}
            onChange={(e, newValue) => setCategory(newValue)}
            centered
            indicatorColor="secondary"
            textColor="inherit"
            sx={{
              "& .MuiTab-root": {
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                mx: 1,
                "&:hover": { color: "#c8e6c9" },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#c8e6c9",
                height: "4px",
                borderRadius: "2px",
              },
            }}
          >
            <Tab label="All" value="all" />
            {categories.map((cat) => (
              <Tab key={cat._id} label={cat.label} value={cat._id} />
            ))}
          </Tabs>
        </AppBar>

        <Box textAlign="center" mt={5} mb={3}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#006241" }}
          >
            Our Menu
          </Typography>
        </Box>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 4, md: 6 } }}
        >
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  textAlign: "center",
                  width: 300,
                  m: 1,
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    API_URL +
                    (product.image
                      ? product.image
                      : "uploads/default_image.png")
                  }
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#F4B400", fontWeight: "bold", mt: 1 }}
                  >
                    RM {product.price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
                    Category: {product.category?.label}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  {currentuser ? (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#006241",
                        "&:hover": { backgroundColor: "#004d31" },
                      }}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  ) : null}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
          {currentuser ? (
            <Fab aria-label="cart" component={Link} to="/cart">
              <ShoppingCartIcon />
            </Fab>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
