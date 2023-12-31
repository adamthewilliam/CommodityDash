import { LatestRateResponse } from "../../interfaces/LatestRateResponse";
import CurrentPricesProps from "../../interfaces/CurrentPricesProps";
import _ from 'lodash';

interface CurrentPricesTableProps extends CurrentPricesProps {
    data: LatestRateResponse;
}

export default function CurrentPricesTable({data, updateCommoditySymbolState}: CurrentPricesTableProps) {
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
                    {_.map(data.rates, (commodityValue, commoditySymbol) => (
                        <tr key={commoditySymbol}>
                            <td>{commoditySymbol}</td>
                            <td>{commodityValue}</td>
                            <td><button className="button" onClick={() => handleButtonClick(commoditySymbol)}>View graph</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}