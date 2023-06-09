import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import LoginModal from "../Molecules/LoginModal";
import SignupModal from "../Molecules/SignupModal";
import LogoutIcon from '@mui/icons-material/Logout';

type HeaderProps = {
  handleLogout: () => void;
  getUser: () => void;
  user:
    | {
        username: string;
        email: string;
      }
    | undefined;
};

export default function Header({ handleLogout, getUser, user }: HeaderProps) {
  const [data, setData] = useState({ msg: "test" });
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  useEffect(() => {
    setEnv();
  }, []);

  async function setEnv() {}

  function handleDrawerToggle() {
    setShowDrawer((prevState) => !prevState);
  }

  function handleLoginModal() {
    setShowLogin((prevState) => !prevState);
  }

  function handleSignupClose() {
    setShowSignup((prevState) => !prevState);
  }
  function handleSignupModal() {
    setShowLogin((prevState) => !prevState);
    setShowSignup((prevState) => !prevState);
  }
  function handleUserLogout(){
    handleLogout()
  }

  const list = [
    <Box
      sx={{ width: "500px" }}
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="hello" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="hello" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>,
  ];

  return (
    <>
      <SignupModal
        getUser={getUser}
        open={showSignup}
        handleClose={handleSignupClose}
      />
      <LoginModal
        getUser={getUser}
        open={showLogin}
        handleClose={handleLoginModal}
        handleSignupModal={handleSignupModal}
      />
      <Drawer anchor="left" onClose={handleDrawerToggle} open={showDrawer}>
        {list}
      </Drawer>
      <Box sx={{
                flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Workout Tracker
            </Typography>
            {user ? (
              <>
                {user?.username}
                <Button onClick={handleUserLogout} color="inherit">
                  Log Out
                  <LoginIcon />
                </Button>
              </>
            ) : (
              <Button onClick={handleLoginModal} color="inherit">
                Log In
                <LogoutIcon />
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
