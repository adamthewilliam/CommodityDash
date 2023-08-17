import { useQuery} from '@tanstack/react-query'
import axios from '../../http-common';
import { TimeSeriesResponse } from '../../interfaces/TimeSeriesResponse';
import { getDateNDaysAgo } from '../../helpers'
import TimeseriesGraph from './TimeseriesGraph';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

function useTimeseries(startDate: string, endDate: string, commoditySymbol: string) {
    /* symbol is used as a query key to cache a timeseries response. This means we will cache a timeseries response for each symbol */
    return useQuery(["timeseries", [commoditySymbol]], async (): Promise<TimeSeriesResponse> => {
        const { data }: {data: TimeSeriesResponse} = await axios.get(`/timeseries?access_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&base=USD&symbols=${commoditySymbol}`)
            .then((response => response.data));

        console.log(data);

        return data;
    }, {cacheTime: 86400000}); // Only refresh cache every 24 hrs - changes from 10 min updates will not be seen on the graph
}

interface TimeseriesProps {
    commoditySymbol: string;
}

export default function Timeseries({commoditySymbol}: TimeseriesProps) {
    const startDate: string = getDateNDaysAgo(30);
    const endDate: string = getDateNDaysAgo(1); // Cannot use the current date as the endDate

    const { status, data, error, isFetching } = useTimeseries(startDate, endDate, commoditySymbol);

    return (
        <div className="timeseries card">
            <h2 className="text-center">Past 30 Days</h2>
            {status === "loading" ? ("Loading...") : error instanceof Error ? (<span>Error: {error.message}</span>) : !data || !data.rates ? ("No data available"): (
            <TimeseriesGraph commoditySymbol={commoditySymbol} data={data.rates}/>)}
            <div> {isFetching ? "Background updating..." : " "}</div>
        </div>
    )
}