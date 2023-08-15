import CurrentPrices from "../sections/CurrentPrices";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Timeseries from "../sections/Timeseries";
import { useState } from "react";

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

/*
Once the data is not fresh, it will trigger a refetch from the api.
The API only provides updated data every 10 minutes so this is optimal for performance.
*/
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 90000, /* Cache data for 15 mins*/
            staleTime: 60000, /* Duration at which a query stays fresh. If it's fresh, data will always be read from cache*/
            refetchInterval: 70000 /* Api updates data every 10 minutes, so we want to refetch after this happens */
        }
    }});

export default function DashboardLayout() {

    const [commoditySymbol, setCommoditySymbol] = useState("WTIOIL");

    const updateCommoditySymbolState = (commoditySymbol: string) => {
        setCommoditySymbol(commoditySymbol);
    }

    return (
        <div className="grid-container">
            <Header/>
            <QueryClientProvider client={queryClient}>
                <CurrentPrices updateCommoditySymbolState={updateCommoditySymbolState}/>
                <Timeseries commoditySymbol={commoditySymbol}/>
            </QueryClientProvider>
            <Footer></Footer>
        </div>
    )
}