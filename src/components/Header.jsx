import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CasesIcon from "@mui/icons-material/Cases";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";

const Header = (props) => {
  const [open, setOpen] = useState(false);
  const { current } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const navigate = useNavigate();
  const { currentuser } = cookies;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    removeCookie("currentuser");
    navigate("/");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {currentuser ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/menus">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Menu" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
                <ShoppingBagIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/bookings">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/menus">
                <ListItemIcon>
                  <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Menu" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      <Divider />
      {currentuser?.role === "admin" && (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/users">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/products">
              <ListItemIcon>
                <RestaurantMenuIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Products" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/categories">
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Categories" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/manage/orders/admin">
              <ListItemIcon>
                <CasesIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/manage/admins/bookings">
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Bookings" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        boxShadow: 1,
      }}
    >
      {/* Left side - Drawer menu */}
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "#006241" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Center - Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#006241",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
        component={Link}
        to="/"
      >
        Nasi Lemak & Western
      </Typography>

      {/* Right side - Login/Logout */}
      {currentuser ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ color: "#006241", fontWeight: 500 }}>
            Welcome, {currentuser.name}!
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to="/login"
            sx={{ mr: 1 }}
          >
            Login
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
