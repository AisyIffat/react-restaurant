import Header from "../components/Header";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Link } from "react-router";
import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const { currentuser } = cookies;
  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 45, color: "#1b5e20" }} />,
      title: "Authentic Fusion Flavours",
      desc: "Enjoy the perfect mix of traditional Nasi Lemak and Western favourites cooked with local passion.",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 45, color: "#1b5e20" }} />,
      title: "Fresh & Fast",
      desc: "Every meal is made fresh and served promptly, ensuring your experience is both delicious and convenient.",
    },
    {
      icon: <EmojiEmotionsIcon sx={{ fontSize: 45, color: "#1b5e20" }} />,
      title: "Friendly Atmosphere",
      desc: "Relax in a cozy setting with welcoming staff ready to serve you with a smile.",
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 45, color: "#1b5e20" }} />,
      title: "Made with Love",
      desc: "Our chefs prepare every dish with care and passion — the taste says it all.",
    },
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          height: "90vh",
          backgroundImage: "url('/public/hero.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            p: 6,
            borderRadius: "20px",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Nasi Lemak & Western
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Traditional Malaysian flavours meet Western comfort — a taste of
            both worlds.
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            component={Link}
            to="/menus"
            sx={{
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            Explore Menu
          </Button>
        </Box>
      </Box>

      <Box sx={{ py: 10, backgroundColor: "#f9fbe7" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                alt="Restaurant interior"
                sx={{
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: 4,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#1b5e20", mb: 2 }}
              >
                Our Story
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 3 }}>
                Founded with love for both Malaysian and Western cuisines, our
                restaurant began as a small kitchen serving locals hearty plates
                of comfort food. Today, we’re proud to serve dishes that unite
                cultures and create smiles.
              </Typography>
              <Box>
                {currentuser ? (
                  <Button
                    variant="outlined"
                    color="success"
                    component={Link}
                    to="/bookings/add"
                    sx={{ borderRadius: "10px" }}
                  >
                    Reserve a Table
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="success"
                    component={Link}
                    to="/login"
                    sx={{ borderRadius: "10px" }}
                  >
                    Reserve a Table
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f5fff6",
          py: 10,
        }}
      >
        <Container>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#006241" }}
          >
            Why Dine With Us
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            maxWidth="md"
            mx="auto"
            mb={6}
          >
            We don’t just serve food — we serve experiences. Here’s why
            customers keep coming back to Nasi Lemak & Western.
          </Typography>

          <Grid container spacing={8} justifyContent="center">
            {[
              {
                img: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
                title: "Authentic Taste",
                desc: "Every bite brings the perfect harmony of Malaysian spices and Western indulgence.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/1046/1046861.png",
                title: "Comfortable Dining",
                desc: "Enjoy your meals in a cozy atmosphere ideal for family gatherings and friendly hangouts.",
              },
              {
                img: "https://cdn-icons-png.flaticon.com/512/3081/3081987.png",
                title: "Quality Ingredients",
                desc: "We source the freshest local produce and premium ingredients for every dish we create.",
              },
            ].map((item, index) => (
              <Grid size={12} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      component="img"
                      src={item.img}
                      alt={item.title}
                      sx={{
                        width: 70,
                        height: 70,
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 10, backgroundColor: "#f9fbe7" }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1b5e20", mb: 2 }}
          >
            Visit Us
          </Typography>
          <Typography
            sx={{
              mb: 6,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Drop by and experience a cozy atmosphere filled with the aroma of
            freshly cooked Nasi Lemak and Western delights. We can’t wait to
            serve you!
          </Typography>

          <Paper
            elevation={6}
            sx={{
              display: "inline-block",
              textAlign: "left",
              p: 5,
              borderRadius: "16px",
              backgroundColor: "#ffffff",
              maxWidth: 500,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon sx={{ color: "#1b5e20", mr: 1 }} />
              <Typography>+60 12-340 9908</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon sx={{ color: "#1b5e20", mr: 1 }} />
              <Typography>nasilemakdanwestern@gmail.com</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AccessTimeFilledIcon sx={{ color: "#1b5e20", mr: 1 }} />
              <Box>
                <Typography>Mon - Thu: 10:00 AM – 10:30 PM</Typography>
                <Typography>Fri - Sun: 10:00 AM – 11:00 PM</Typography>
              </Box>
            </Box>

            <Box>
              {currentuser ? (
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  to="/bookings/add"
                  fullWidth
                  sx={{ mt: 2, fontWeight: "bold" }}
                >
                  Book a Table
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  to="/login"
                  fullWidth
                  sx={{ mt: 2, fontWeight: "bold" }}
                >
                  Book a Table
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#1b5e20",
          color: "#fff",
          textAlign: "center",
          py: 3,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Nasi Lemak & Western. All rights
          reserved.
        </Typography>
      </Box>
    </>
  );
}
