import CurrentPrices from "../sections/CurrentPrices";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Last30DaysPrices from "../sections/Last30DaysPrices";

import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();

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