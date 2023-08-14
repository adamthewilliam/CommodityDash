import { useQuery} from '@tanstack/react-query'
import axios from '../../http-common';
import { TimeSeriesResponse } from '../../interfaces/TimeSeriesResponse';
import { getDateNDaysAgo } from '../../helpers'
import _ from 'lodash';
import RechartsTimeseries from './RechartsTimeseries';
import { MappedTimeseriesData } from '../../interfaces/MappedTimeseriesData';
import ApexZoomableTimeseries from './ApexZoomableTimeseries';

const API_KEY = process.env.REACT_APP_COMMODITIES_API_ACCESS_KEY;

function useTimeseries(startDate: string, endDate: string, symbol: string) {
    return useQuery(["timeseries"], async (): Promise<TimeSeriesResponse> => {
        const { data }: {data: TimeSeriesResponse} = await axios.get(`/timeseries?access_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}&base=USD&symbols=${symbol}`)
            .then((response => response.data));

            // All commodity rates need to be divided by 1
            // Also I don't need the rate of the USD
            data.rates = _.forEach(data.rates, (date) => {
                _.forEach(date, (value, commodity) => {
                        date[commodity] = (1 / Number(value)).toFixed(2);
                })
            });

        console.log(data);

        return data;
    }, {cacheTime: 86400000}); // Only refresh cache every 24 hrs
}

function mapRatesToDataStructure(timeSeriesResponse: TimeSeriesResponse): MappedTimeseriesData[] {
    return _.map(timeSeriesResponse.rates, (commodities, date) => {
      const dataObject: MappedTimeseriesData = { date: date };
      for (const commodity in commodities) {
        dataObject[commodity] = Number(commodities[commodity]);
      }
      return dataObject;
    });
  }

interface TimeseriesProps {
    symbol: string;
}

export default function Timeseries({symbol}: TimeseriesProps) {
    const startDate: string = getDateNDaysAgo(30);
    const endDate: string = getDateNDaysAgo(1); // Cannot use the current date as the endDate

    const { status, data, error, isFetching } = useTimeseries(startDate, endDate, symbol);

    let mappedData: MappedTimeseriesData[] = [];

    if(data) {
        mappedData = mapRatesToDataStructure(data);
    }

    return (
        <div className="card">
            <h1 className="text-center">Past 30 Days</h1>
            {status === "loading" ? ("Loading...") : error instanceof Error ? (<span>Error: {error.message}</span>) : !data || !data.rates ? ("No data available"): (
            <ApexZoomableTimeseries startDate={startDate} endDate={endDate} symbol={symbol} data={mappedData}/>)}
            <div> {isFetching ? "Background updating..." : " "}</div>
        </div>
    )
}