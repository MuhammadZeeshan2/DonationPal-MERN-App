const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
// const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51P722cB3Pifvydz8KJ2zpu6uS0acut0y26XZwPqTxeJ9zHItjpTD14DQQGFrt0EYbeejsLdy6giNaDhzAMakLo8M00IgICrnmM');
app.use(cors({

}));
if (process.env.Node_ENV === 'production') {
  app.use(cors({
    origin: "https://sp23-43600-ahmed-donationpal.uc.r.appspot.com"
  }));
}
else {
  app.use(cors());

}

// Database connection
const uri = 'mongodb+srv://shahzebraheel61:shahzaib1044@cluster0.luve38r.mongodb.net/?retryWrites=true&w=majority&ssl=true';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello");
});
const getURL = (app) => {

}
const SignupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});
const Signup = mongoose.model('Signup', SignupSchema);

app.post('/Signup', async (req, res) => {
  try {
    let newSignup = new Signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    });

    newSignup = await newSignup.save();

    res.send(newSignup);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/Login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const signup = await Signup.findOne({ email, password });
    console.log(signup);
    if (signup) {
      // Signin successful
      const userCampaigns = await Campaign.find({ 'Donors.Donor': signup.name });

      res.status(200).json({
        message: 'Login successful',
        user: {
          name: signup.name,
          email: signup.email,
          address: signup.address,
          id: signup._id

        },
        campaigns: userCampaigns
      });
    } else {
      // Signin failed
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


const CampaignSchema = new mongoose.Schema({
  Title: String,
  Goal: String,
  CurrentDonationTotal: Number,
  Donors: [
    {
      Donor: String,
      Donation: Number,
      Date: Date,

    }
  ],
  id: Number,
});


const Campaign = mongoose.model('Campaign', CampaignSchema);
const campaignData = [
  /* {
        Title: 'Help a Veteran with unexpected medical Costs',
        Goal: '$ 49,300',
        CurrentDonationTotal: 11250,
        Donors: [
          {
            Donor: 'Harold Perry',
            Donation: 400,
            Date: new Date(),
           

          },
          {
            Donor: 'Shirley Smith',
            Donation: 100,
            Date: new Date(),
          },
        ],
        id: 1,
      },
      {
        Title: 'Help a Single Mother',
        Goal: '$ 54,300',
        CurrentDonationTotal: 10250,
        Donors: [
          {
            Donor: 'Harold Perry',
            Donation: 600,
            Date: new Date(),
          },
          {
            Donor: 'Shirley Smith',
            Donation: 700,
            Date: new Date(),
          },
        ],
        id: 2,
      }*/
];

// Insert both campaigns into the database
Campaign.insertMany(campaignData)
  .then(() => {
    console.log('Campaigns saved successfully');
  })
  .catch((error) => {
    console.error('Error saving campaigns:', error);
  });

app.get('/campaign', async (req, res) => {
  try {

    const campaigns = await Campaign.find();
    //const data=campaigns.forEach ( (campaign) =>{
    //campaign.Donors.find((donor)=> donor.Donor==req.query.name)
    // }) 




    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/camp', async (req, res) => {
  try {
    const Name = 'Harold Perry'; // You can also get this from req.query or req.params

    // Use the donorName to filter campaigns
    const signup = await Signup.find({ 'email': Name });

    res.json(signup);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/create_checkout', async (req, res) => {
  // console.log(req.body)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.campaign_name
          },
          unit_amount: req.body.donation_amount
        },
        quantity: 1
      },

    ],
    mode: 'payment',
    success_url: `http://localhost:3001/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}&campaign_name=${req.body.campaign_name}`,
    cancel_url: `http://localhost:3000/`,
    metadata: {
      campaign_id: req.body.campaign_id,
      campaign_name: req.body.campaign_name,

    }
  });
  // console.log(session)
  res.redirect(303, session.url)

})
app.get('/donation_success', async (req, res) => {
  console.log(req.query);
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log(session.name)
  console.log(session);


  console.log(session.metadata.campaign_id)
  console.log(req.query.campaign_id)
  console.log(req.query.campaign_name)
  const donation_amount = session.amount_total / 100;
  const donor_name = session.customer_details.name;;

  // Update the campaign based on campaign_id or Title
  try {
    let filter = {};
    if (session.metadata.campaign_id) {
      filter = { id: session.metadata.campaign_id }; // Assuming 'id' is the field for campaign_id
    } else if (req.query.campaign_name) {
      filter = { Title: req.query.campaign_name }; // Using 'Title' for campaign_name
    } else {
      throw new Error('Campaign identifier not found');
    }

    const updatedCampaign = await Campaign.findOneAndUpdate(
      filter,
      {
        $inc: { CurrentDonationTotal: donation_amount },
        $push: {
          Donors: {
            Donor: donor_name,
            Donation: donation_amount,
            Date: new Date(),
          },
        },
      },
      { new: true }
    );


    console.log('Updated campaign:', updatedCampaign);

    const client_URL = `http://localhost:3000/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}&campaign_name=${session.metadata.campaign_name}`;


    res.redirect(303, client_URL)
  }
  catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).send('Error updating campaign');
  }

})
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
