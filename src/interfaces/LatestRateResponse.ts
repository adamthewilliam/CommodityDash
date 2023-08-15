import { BaseResponse } from "./BaseResponse";
import { Rate } from "./Rate";

export interface LatestRateResponse extends BaseResponse {
    timestamp: string;
    rates: Rate;
    date: string;
}