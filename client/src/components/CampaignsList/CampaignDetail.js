import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/campaign')
      .then(response => response.json())
      .then(json => {
        setCampaign(json);
        setLoading(false);
      });
  }, []);

  const selectedCampaign = campaign.find(c => c.id === parseInt(id));

  return (

    <Container maxWidth="xl" sx={{
      display: "flex",
      p: "30px",
      minWidth: "100%",
    }}>

      {loading && <p>Loading...</p>}
      {!loading && selectedCampaign && (
        <>
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
              <Typography variant="h3" sx={{ mb: "100px", width: '100%' }}>
                {selectedCampaign.Title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  fontWeight="bold"
                >
                  Goal:
                </Typography>
                <Typography variant="h6" component="p">
                  {selectedCampaign.Goal}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="h6"
                  component="p"
                  fontWeight="bold"
                >
                  Current Donation Total:
                </Typography>
                <Typography variant="h6" component="p">
                  ${selectedCampaign.CurrentDonationTotal}
                </Typography>

              </Box>
              <Typography variant="h4" sx={{ mt: "20px", mb: "10px" }}>
                Donations Received:
              </Typography>
              <table style={{ width: "65%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th
                      style={{ border: "1px solid #dddddd", p: "10px" }}>
                      Donor
                    </th>
                    <th style={{ border: "1px solid #dddddd", p: "10px" }}>
                      Donation
                    </th>
                    <th style={{ border: "1px solid #dddddd", p: "10px" }}>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCampaign.Donors.map((donor) => (
                    <tr key={donor.Date}>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          textAlign: "center",
                          padding: "10px",
                        }}
                      >
                        {donor.Donor}
                      </td>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          textAlign: "center",
                          padding: "10px",
                        }}
                      >
                        ${donor.Donation}
                      </td>
                      <td
                        style={{
                          border: "1px solid #dddddd",
                          textAlign: "center",
                          padding: "10px",
                        }}
                      >
                        {new Date(donor.Date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </Box>
            <form action={'http://localhost:3001/create_checkout'} method="POST">
              <input type="hidden" name="campaign_id" value={selectedCampaign.id} />
              <input type="hidden" name="campaign_name" value={selectedCampaign.Title} />
              <input type="hidden" name="donation_amount" value='2500' />
              <button type="submit" style={{ marginTop: '10px', marginRight: '460px' }}>
                Donate $25 Today!
              </button>
            </form>
          </Box>



        </>

      )}

      {!loading && !selectedCampaign && <p>Campaign not found.</p>}

    </Container>

  );
};
export default CampaignDetail;
