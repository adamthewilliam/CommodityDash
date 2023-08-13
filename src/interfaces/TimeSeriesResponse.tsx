import { BaseResponse } from "./BaseResponse";
import { Rate } from "./Rate";

export interface TimeSeriesResponse extends BaseResponse {
    timeseries: boolean;
    start_date: string;
    end_date: string;
    rates: Array<TimeSeriesRate>;
}

interface TimeSeriesRate {
    date: string;
    rate: Array<Rate>;
}