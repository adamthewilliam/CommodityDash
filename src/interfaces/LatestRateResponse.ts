import { BaseResponse } from "./BaseResponse";

export interface LatestRateResponse extends BaseResponse {
    timestamp: string;
    rates: Rate;
    date: string;
}

interface Rate {
    [key: string]: string;
}