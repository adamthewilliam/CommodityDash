import { useQuery, useQueryClient} from '@tanstack/react-query'
import { LatestRateResponse } from '../../interfaces/LatestRateResponse';
import axios from '../../http-common';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

function useCurrentPrices() {
    return useQuery(["currentPrices"], async (): Promise<Array<LatestRateResponse>> => {
        const { data } = await axios.get(`latest?access_key=${API_KEY}&base=USD&symbols=BRENTOIL,CPO,NG,XAU,ALU`);
        return data;
    });
}

export default function CurrentPrices() {

    const queryClient = useQueryClient()
    const { status, data, error, isFetching } = useCurrentPrices();

    return (
        <div className="currentPrices card title">Current Prices</div>

    )
}