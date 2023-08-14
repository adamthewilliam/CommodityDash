import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MappedTimeseriesData } from '../../interfaces/MappedTimeseriesData';

interface RechartsTimeseriesProps{
    data: MappedTimeseriesData[];
    symbol: string;
}

export default function RechartsTimeseries({data, symbol}: RechartsTimeseriesProps) {

    return (
        <ResponsiveContainer width="100%" height="85%">
        <LineChart
          width={500}
          height={300}
          data={Object.values(data)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-90}/>
          <YAxis label={{ value: 'USD per barrel', angle: -90, position: 'insideLeft', textAnchor: 'middle' }}/>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey={symbol} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    )
}