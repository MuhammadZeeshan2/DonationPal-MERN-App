// import React, { useEffect, useState } from "react";
// import { Container, Box, Grid, Paper, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const CampaignsList = () => {
//     const [campaigns, setCampaigns] = useState([]);

//     const GetCampaigns = async () => {
//         try {
//             const response = await axios.get("http://localhost:3001/campaign");

//             const data = await response.data;


//             setCampaigns(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     useEffect(() => {
//         GetCampaigns();
//     }, []);

//     return (
//         <Container
//             maxWidth="xl"
//             sx={{
//                 p: "50px",
//             }}
//         >
//             <Box
//                 sx={{
//                     minWidth: "100%",
//                     maxWidth: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "30px",
//                 }}
//             >
//                 {/* <Typography variant="h3">Our Campaigns</Typography> */}
//                 <Grid container spacing={5}>
//                     {campaigns &&
//                         campaigns.map((campaign) => (
//                             <Grid
//                                 item
//                                 sm={3}
//                                 md={2}
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                 }}
//                                 key={campaign.id}
//                             >
//                                 <Paper
//                                     elevation={5}
//                                     sx={{
//                                         maxWidth: "250px",
//                                         minWidth: "220px",
//                                         height: "280px",
//                                     }}
//                                 >
//                                     <Box
//                                         sx={{
//                                             p: "20px",
//                                             display: "flex",
//                                             flexDirection: "column",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             gap: "10px",
//                                             height: "80%",
//                                             background: "#c0d3f3",
//                                         }}
//                                     >
//                                         <Typography variant="h5">
//                                             {campaign.Title
//                                             }
//                                         </Typography>
//                                         <Box
//                                             sx={{
//                                                 display: "flex",
//                                                 flexDirection: "row",
//                                                 justifyContent: "space-between",
//                                                 alignItems: "center",
//                                                 width: "100%",
//                                             }}
//                                         >
//                                             <Typography
//                                                 variant="p"
//                                                 fontWeight="bold"
//                                             >
//                                                 Goal:
//                                             </Typography>
//                                             <Typography variant="p">
//                                                 {campaign.Goal}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                     <Box
//                                         sx={{
//                                             p: "10px",
//                                         }}
//                                     > key={campaign.id}
//                                         <Link to={`campaign/${campaign.id}`} state={{ id: campaign.id }}>
//                                             View Details &gt;&gt;
//                                         </Link>
//                                     </Box>
//                                 </Paper>
//                             </Grid>
//                         ))}

//                 </Grid>
//             </Box>
//         </Container>
//     );
// };

// export default CampaignsList;
import React from "react";
import { useState, useEffect } from "react";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const CampaignsList = () => {
    const [campaigns, setCampaigns] = useState([]);

    const GetCampaigns = async () => {
        try {
            const response = await axios.get("http://localhost:3001/campaign");
            const data = await response.data;
            setCampaigns(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetCampaigns();
    }, []);

    return (
        <Container
            maxWidth="xl"
            sx={{
                p: "50px",
            }}
        >
            {/* <Typography variant="h3">Our Campaigns</Typography> */}
            <Grid container spacing={5}>
                {campaigns &&
                    campaigns.map((campaign) => (
                        <Grid
                            item
                            sm={3}
                            md={2}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            key={campaign.id}
                        >
                            <Paper
                                elevation={5}
                                sx={{
                                    maxWidth: "250px",
                                    minWidth: "220px",
                                    height: "280px",
                                }}
                            >
                                <Box
                                    sx={{
                                        p: "20px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px",
                                        height: "80%",
                                        background: "#c0d3f3",
                                    }}
                                >
                                    <Typography variant="h5">
                                        {campaign.Title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <Typography
                                            variant="p"
                                            fontWeight="bold"
                                        >
                                            Goal:
                                        </Typography>
                                        <Typography variant="p">
                                            {campaign.Goal}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        p: "10px",
                                    }}
                                >
                                    {/* Wrap "View Details" with Link */}
                                    <Link to={`/campaigns/${campaign.id}`} state={campaign}>

                                        View Details &gt;&gt;
                                    </Link>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default CampaignsList;
