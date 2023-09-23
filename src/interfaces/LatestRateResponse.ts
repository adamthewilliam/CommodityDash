import { BaseResponse } from "./BaseResponse";

export interface LatestRateResponse extends BaseResponse {
    timestamp: string;
    rates: {[commoditySymbol: string]: string};
    date: string;
}