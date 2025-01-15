import React,{ useContext } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { ColorModeContext } from "../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { NavLink,useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
const location = useLocation();
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Box
      width="100%"
      bgcolor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center"
      sx={{ boxShadow: 3, mb: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        QUANTUM CHAT
      </Typography>
      {loggedIn ? (
        <NavLink to="/login" onClick={handleLogout}>
          Logout
        </NavLink>
      ) : (
        <>
          <NavLink to="/register">Sign Up</NavLink>
          <NavLink to="/login">Sign In</NavLink>
        {(location.pathname==="/login"||location.pathname==="/register") &&(
          <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 2 }}>
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
)}
        </>
      )}
    </Box>
  );
};

export default NavBar;
