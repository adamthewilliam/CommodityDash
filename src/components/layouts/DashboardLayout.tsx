import CurrentPrices from "../sections/CurrentPrices";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Last30DaysPrices from "../sections/Last30DaysPrices";

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

/*
Cache the data for 15 minutes (cacheTime) and mark the data as not fresh after 10 minutes (staleTime).
Once the data is not fresh, it will trigger a refetch from the api.
The API only provides updated data every 10 minutes so this is optimal for performance.
*/
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 90000,
            staleTime: 60000,
            refetchInterval: 70000
        }
    }});

export default function DashboardLayout() {
    return (
        <div className="grid-container">
            <Header/>
            <QueryClientProvider client={queryClient}>
                <CurrentPrices/>
                <Last30DaysPrices/>
            </QueryClientProvider>
            <Footer></Footer>
        </div>
    )
}