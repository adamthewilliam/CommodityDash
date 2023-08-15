import { LatestRateResponse } from "../../interfaces/LatestRateResponse";
import CurrentPricesProps from "../../interfaces/CurrentPricesProps";

interface CurrentPricesTableProps extends CurrentPricesProps {
    data: LatestRateResponse;
}

export default function CurrentPricesTable({data, updateCommoditySymbolState}: CurrentPricesTableProps) {
    console.log(data);
    console.log(Array.isArray(data.rates));

    const handleButtonClick = (commoditySymbol: string) => {
        updateCommoditySymbolState(commoditySymbol);
    }

    return (
        <div>
            <table className="grid-table styled-table">
                <thead>
                    <tr>
                        <th>Commodity</th>
                        <th>USD</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data.rates).map(([commodity, commodityValue]) => (
                        <tr key={commodity}>
                            <td>{commodity}</td>
                            <td>{commodityValue}</td>
                            <td><button className="button" onClick={() => handleButtonClick(commodity)}>View graph</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}