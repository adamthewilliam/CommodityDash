import { useQuery} from '@tanstack/react-query'
import { LatestRateResponse } from '../../interfaces/LatestRateResponse';
import axios from '../../http-common';
import _ from 'lodash';
import CurrentPricesTable from './CurrentPricesTable';
import {convertTimestampToFormattedDatetime } from '../../helpers'
import CurrentPricesProps from '../../interfaces/CurrentPricesProps';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

function useCurrentPrices() {
    return useQuery(["currentPrices"], async (): Promise<LatestRateResponse> => {
        const { data }: {data: LatestRateResponse} = await axios.get(`/latest?access_key=${API_KEY}&base=USD&symbols=BRENTOIL,WTIOIL,NG,XAU,ALU`)
            .then((response => response.data));

            // All commodity rates need to be divided by 1
            // Also I don't need the rate of the USD
            data.rates = _.forEach(data.rates, (commodityValue, commodity) => {
                data.rates[commodity] = (1 / Number(commodityValue)).toFixed(2)
            });
            data.rates = _.omit(data.rates, ['USD']);

        return data;
    });
}

export default function CurrentPrices({updateCommoditySymbolState}: CurrentPricesProps) {
    const { status, data, error, isFetching } = useCurrentPrices();

    const dateTime = convertTimestampToFormattedDatetime(data?.timestamp);
    
    return (
        <div className="card">
            <h1 className="text-center">Current Prices</h1>
            <h6 className="text-center">Last updated: {dateTime}</h6>

            {status === "loading" ? ("loading...") : error instanceof Error ? (<span>Error: {error.message}</span>) : !data || !data.rates ? ("No data available"): (
                <CurrentPricesTable data={data} updateCommoditySymbolState={updateCommoditySymbolState}/>
            )}
            <div> {isFetching ? "Background updating..." : " "}</div>
        </div>
    )
}