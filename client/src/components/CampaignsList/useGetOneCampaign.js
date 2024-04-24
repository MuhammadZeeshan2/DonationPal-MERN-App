import { useState, useEffect } from "react";
import axios from 'axios';
function useGetOneCampaign(campaigns) {
    const [Loading, setLoading] = useState(false);
    const [Campaign, setCampaign] = useState({});
    const [error, setError] = useState('');
    useEffect(() => {
        const loadCampaign = async () => {
            try {
                const response = await axios.get(campaigns);
                setCampaign(response.data);
                setLoading(false);
            }
            catch (err) {
                setLoading(false);
                setError(err.message);
                console.error(err);
            }
        };
        setLoading(true)
        loadCampaign();
    }, [campaigns])
    return [Loading, error, Campaign];


}

export default useGetOneCampaign;
