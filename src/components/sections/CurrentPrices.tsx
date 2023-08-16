import { useQuery} from '@tanstack/react-query'
import { LatestRateResponse } from '../../interfaces/LatestRateResponse';
import axios from '../../http-common';
import _ from 'lodash';
import CurrentPricesTable from './CurrentPricesTable';
import {convertTimestampToFormattedDatetime } from '../../helpers'
import CurrentPricesProps from '../../interfaces/CurrentPricesProps';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

const commoditySymbols: string = "BRENTOIL,WTIOIL,NG,XAU,ALU";

function useCurrentPrices() {
    return useQuery(["currentPrices"], async (): Promise<LatestRateResponse> => {
        const { data }: {data: LatestRateResponse} = await axios.get(`/latest?access_key=${API_KEY}&base=USD&symbols=${commoditySymbols}`)
            .then((response => response.data));

            // All commodity rates need to be divided by 1
            // Also I don't need the rate of the USD
            data.rates = _.forEach(data.rates, (commodityValue, commodity) => {
                data.rates[commodity] = (1 / Number(commodityValue)).toFixed(2)
            });
            data.rates = _.omit(data.rates, ['USD']);

        console.log(data);

        return data;
    });
}

export default function CurrentPrices({updateCommoditySymbolState}: CurrentPricesProps) {
    const { status, data, error, isFetching } = useCurrentPrices();

    const dateTime = convertTimestampToFormattedDatetime(data?.timestamp);
    
    return (
        <div className="currentPrices card">
            <h2 className="text-center">Current Prices</h2>
            <h5 className="text-center">Last updated: {dateTime}</h5>

            {status === "loading" ? ("loading...") : error instanceof Error ? (<span>Error: {error.message}</span>) : !data || !data.rates ? ("No data available"): (
                <CurrentPricesTable data={data} updateCommoditySymbolState={updateCommoditySymbolState}/>
            )}
            <div> {isFetching ? "Background updating..." : " "}</div>
        </div>
    )
}