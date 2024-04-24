import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const DesktopNav = ({ handleCloseNavMenu, isLoggedIn, handleLogout }) => {

    return (
        <>
            {/* <Typography
                variant="h4"
                component="h4"
                fontWeight="600"
                fontFamily="monospace"
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    letterSpacing: ".3rem",
                    color: "black",
                }}
            >
                DonationPal
            </Typography> */}

            <img
                src="/donationPalLogo.png"
                alt="logo"
                style={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                }}
                width="400"
                height="150"
            />

            <Box
                sx={{
                    width: "70%",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        pl: "10px",
                        pr: "30px",
                        height: "90px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    <Typography
                        variant="h6"
                        component="h6"
                        onClick={handleCloseNavMenu}
                        sx={{
                            my: 2,
                            color: "black",
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
                    <Typography
                        variant="h6"
                        component="h6"
                        onClick={handleCloseNavMenu}
                        sx={{
                            my: 2,
                            color: "black",
                            display: "block",
                            margin: "10px",
                            left: "50px",
                            textDecoration: "none",
                        }}
                    >
                        {isLoggedIn ? (
                            <Link style={{
                                textDecoration: "none",
                                color: "black",
                            }} onClick={handleLogout}>
                                Logout
                            </Link>
                        ) : (
                            <Link style={{
                                textDecoration: "none",
                                color: "black",
                            }} to="/login">
                                Login
                            </Link>
                        )}

                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default DesktopNav;
