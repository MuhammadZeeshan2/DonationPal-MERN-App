/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";


const Campaign = ({ user }) => {
    console.log('hello')
    const [campaign, setCampaign] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Make a GET request to your API endpoint with the campaign_id
        fetch(`http://localhost:3001/campaign?name=${user.name}`)
            .then((response) => response.json())
            .then((data) => {
                setCampaign(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching data:", error);
            });
    }, []);



    if (loading) {
        return <p>Loading...</p>; // Render a loading message or spinner
    }
    console.log(campaign)
    return (

        <Container
            maxWidth="xl"
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
                    alignItems: "center",
                    width: "50%",
                    p: "30px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        gap: "10px",
                    }}
                >
                    <Typography variant="h3" sx={{ mb: "20px" }}>
                        Welcome {user.name}!
                    </Typography>
                    <Typography variant="h6" component="p">
                        <b>Email:{user.email}</b>
                    </Typography>
                    <Typography variant="h6" component="p">
                        <b>CurrentDonationTotal:</b>$2400
                    </Typography>

                    <table style={{ width: "65%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                    Title
                                </th>
                                <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                    Donation
                                </th>
                                <th style={{ border: "1px solid #dddddd", padding: "10px" }}>
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaign.map((donor) => (

                                <>
                                    {donor.Donors.map((name) => {
                                        console.log(name)
                                        if (name.Donor === user.name) {
                                            return (
                                                <tr key={name.Donor}>
                                                    <td
                                                        style={{
                                                            border: "1px solid #dddddd",
                                                            textAlign: "center",
                                                            padding: "10px",
                                                        }}
                                                    >
                                                        {donor.Title}
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid #dddddd",
                                                            textAlign: "center",
                                                            padding: "10px",
                                                        }}
                                                    >
                                                        ${name.Donation}
                                                    </td>
                                                    <td
                                                        style={{
                                                            border: "1px solid #dddddd",
                                                            textAlign: "center",
                                                            padding: "10px",
                                                        }}
                                                    >
                                                        {new Date(name.Date).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null
                                    })}
                                </>
                            ))}

                        </tbody>
                    </table>
                </Box>
            </Box>
        </Container>

    );
};

export default Campaign;



