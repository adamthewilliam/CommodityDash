import CurrentPrices from "../sections/CurrentPrices";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import Last30DaysPrices from "../sections/Last30DaysPrices";

export default function DashboardLayout() {
    return (
        <div className="grid-container">
            <Header/>
            <CurrentPrices/>
            <Last30DaysPrices/>
            <Footer></Footer>
        </div>
    )
}