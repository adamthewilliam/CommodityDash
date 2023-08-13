import { useQuery} from '@tanstack/react-query'
import { LatestRateResponse } from '../../interfaces/LatestRateResponse';
import axios from '../../http-common';
import CurrentPricesTable from './CurrentPricesTable';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

function useCurrentPrices() {
    return useQuery(["currentPrices"], async (): Promise<LatestRateResponse> => {
        const { data } = await axios.get(`latest?access_key=${API_KEY}&base=USD&symbols=BRENTOIL,CPO,NG,XAU,ALU`);
        return data;
    });
}

export default function CurrentPrices() {
    const { status, data, error, isFetching } = useCurrentPrices();

    return (
        <div className="card">
            <h1 className="card-title">Current Prices</h1>
            {status === "loading" ? ("Loading...") : error instanceof Error ? (<span>Error: {error.message}</span>) : (
                <CurrentPricesTable data={data}/>
            )}
            <div> {isFetching ? "Background updating..." : " "}</div>
        </div>
    )
}