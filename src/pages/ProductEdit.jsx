import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../utils/api_products";
import {
  Button,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Paper,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "sonner";
import { useNavigate, useParams, Link } from "react-router";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "../utils/api_image";
import { API_URL } from "../utils/constants";
import { getCategories } from "../utils/api_category";
import { useCookies } from "react-cookie";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["currentuser"]);
  const { currentuser = {} } = cookies;
  const { token = "" } = currentuser;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getProduct(id)
      .then((productData) => {
        if (productData) {
          setName(productData.name || "");
          setPrice(productData.price || 0);
          setCategory(productData.category || "");
          setImage(productData.image || null);
        } else {
          toast.error("Product not found");
          navigate("/products");
        }
      })
      .catch(() => {
        toast.error("Product not found");
        navigate("/products");
      });
  }, [id]);

  const handleFormSubmit = async () => {
    if (!name || !price || !category) {
      toast.error("Please fill up the required fields");
      return;
    }
    try {
      await updateProduct(id, name, price, category, image, token);
      toast.success("Menu has been updated");
      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ py: 5 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: "16px",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#fdfdfd",
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "#2e7d32",
            }}
          >
            Edit Menu
          </Typography>

          <Box mb={3}>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              type="number"
              label="Price (RM)"
              fullWidth
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel
                id="category-select-label"
                sx={{
                  backgroundColor: "white",
                  pr: 1,
                }}
              >
                Select Category
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
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            mb={4}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              border: "2px dashed #a5d6a7",
              borderRadius: "10px",
              py: 3,
              backgroundColor: "#f9fff9",
            }}
          >
            {image ? (
              <>
                <img
                  src={API_URL + image}
                  width="120px"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <Button
                  color="info"
                  variant="contained"
                  size="small"
                  onClick={() => setImage(null)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  Remove Image
                </Button>
              </>
            ) : (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#2e7d32",
                  "&:hover": { backgroundColor: "#256528" },
                  borderRadius: "10px",
                  fontWeight: 600,
                }}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={async (event) => {
                    const data = await uploadImage(event.target.files[0]);
                    setImage(data.image_url);
                  }}
                  accept="image/*"
                />
              </Button>
            )}
          </Box>

          <Box>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                textTransform: "none",
                py: 1.3,
                fontSize: "1rem",
                borderRadius: "10px",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
              onClick={handleFormSubmit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                py: 1.3,
                fontSize: "1rem",
                borderRadius: "10px",
                fontWeight: 600,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                mt: 1
              }}
              component={Link}
              to="/products"
            >
              Back
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ProductEdit;
