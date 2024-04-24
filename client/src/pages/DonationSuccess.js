import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useGetOneCampaign from "../components/CampaignsList/useGetOneCampaign";
function DonationSuccess() {
    const [campaign, setCampaign] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const campaignId = searchParams.get('campaign_id');
    const donationAmount = searchParams.get('donation_amount');
    const Title = searchParams.get('campaign_name')
    const [loading, error, campaigndata] = useGetOneCampaign(`http://localhost:3001/campaign/${campaignId}`)
    useEffect(() => {
        setCampaign(campaigndata)
    }, [campaigndata]);
    return (
        <div>
            Donation success ! You donated ${donationAmount} to the campaign <strong>{Title}</strong>
        </div>
    )
}
export default DonationSuccess;
