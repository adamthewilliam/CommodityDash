import { BaseResponse } from "./BaseResponse";

export interface TimeSeriesResponse extends BaseResponse {
    timeseries: boolean;
    start_date: string;
    end_date: string;
    base: string;
    rates: {
        [date: string]: {
            [commodity: string]: string;
          };
    };
}