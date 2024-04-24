import React from "react";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const MobileNav = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) => {
    return (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon fontSize="large" />
            </IconButton>
            <Typography
                variant="h5"
                component="div"
                noWrap
                sx={{
                    display: { xs: "flex", md: "none" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                    pl: "20px",
                }}
                fontWeight="600"
                fontFamily="monospace"
            >
                DonationPal
            </Typography>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: "block", md: "none" },
                }}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                        variant="body1"
                        textAlign="center"
                        sx={{
                            display: "block",
                            margin: "10px",
                            textDecoration: "none",
                        }}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                            to="/"
                        >
                            Home
                        </Link>
                    </Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default MobileNav;
