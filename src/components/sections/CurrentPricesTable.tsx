import { LatestRateResponse } from "../../interfaces/LatestRateResponse";

interface CurrentPricesTableProps {
    data: LatestRateResponse;
}

export default function CurrentPricesTable({data}: CurrentPricesTableProps) {
    console.log(data);
    console.log(Array.isArray(data.rates));

    return (
        <div>
            <table className="grid-table styled-table">
                <thead>
                    <tr>
                        <th>Commodity</th>
                        <th>USD</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data.rates).map(([commodity, commodityValue]) => (
                        <tr key={commodity}>
                            <td>{commodity}</td>
                            <td>{commodityValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}