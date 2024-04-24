import React, { useState } from "react";



import { useNavigate } from 'react-router-dom';


import { Container, Box, Typography, TextField } from "@mui/material";


const Login = ({ setIsLoggedIn, onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Signin successful
                const a = await response.json();
                onLogin(a.user);
                console.log(a);

                navigate('/Campaign');
            } else {
                // Signin failed
                const error = await response.json();
                alert('Email or Password is incorrect');
                console.log(error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };




    return (
        <>
            {/* <Header /> */}
            <Container
                sx={{
                    display: "flex",
                    p: "30px",
                    minWidth: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        width: "60%",
                        p: "30px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "15px",
                        }}
                    >
                        <Typography variant="h4">Login:</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6">Email Address:</Typography>
                            <TextField
                                id="email-input"
                                label="Email"
                                placeholder="harold.perry@example.com"
                                type="email"
                                variant="outlined"
                                size="small"
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6">Password:</Typography>
                            <TextField
                                id="password-input"
                                label="Password"
                                placeholder="**************"
                                type="password"
                                variant="outlined"
                                size="small"
                                value={password}
                                onChange={handleChangePassword}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "10px",
                                width: "100%",
                            }}
                        >
                            <button
                                style={{
                                    paddingTop: "8px",
                                    paddingBottom: "8px",
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    borderRadius: "5px",
                                    fontSize: "20px",
                                }}
                                onClick={handleSubmit}

                            >
                                Submit
                            </button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;
