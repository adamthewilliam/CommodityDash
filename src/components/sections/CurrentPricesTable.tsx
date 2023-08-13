import { LatestRateResponse } from "../../interfaces/LatestRateResponse";

interface CurrentPricesTableProps {
    data?: LatestRateResponse;
}

export default function CurrentPricesTable({data}: CurrentPricesTableProps) {
    console.log(data);
    return (
        <div>
            <table className="grid-table">
                <thead>
                    <tr>
                        <th>Commodity</th>
                        <th>USD</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.rates?.map(rate => {
                        return (
                            <tr key={rate.currencyValue}>
                                <td>{rate.commodity}</td>
                                <td>${rate.currencyValue}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}