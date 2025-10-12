import * as React from "react";
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
import { useNavigate, Link } from "react-router";
import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";

const Header = (props) => {
  const [open, setOpen] = React.useState(false);
  const { current } = props;
  const [cookies, setCookie, removeCookie] = useCookies(["currentuser"]);
  const navigate = useNavigate();
  const { currentuser } = cookies;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            Home
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/menus">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            Menu
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/products">
            <ListItemIcon>
              <RestaurantMenuIcon />
            </ListItemIcon>
            Manage Products
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            Manage Categories
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div sx={{ height: "50px" }}>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Typography variant="body" sx={{ fontWeight: "bold", color: "#006241" }}>
        Nasi Lemak & Western
      </Typography>
      {currentuser ? (
        <Button
          variant="outlined"
          onClick={() => {
            // remove cookie
            removeCookie("currentuser");
            // redirect back to home page
            navigate("/");
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            variant={current === "login" ? "contained" : "outlined"}
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant={current === "signup" ? "contained" : "outlined"}
            color="primary"
            component={Link}
            to="/signup"
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}

export default Header;
