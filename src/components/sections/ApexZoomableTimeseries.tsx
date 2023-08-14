import {getDatesInRange} from '../../helpers'
import { MappedTimeseriesData } from '../../interfaces/MappedTimeseriesData';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';

interface ApexZoomableTimeseriesProps{
    startDate: string;
    endDate: string;
    symbol: string;
    data: MappedTimeseriesData[]
}

export default function ApexZoomableTimeseries({startDate, endDate, symbol, data}: ApexZoomableTimeseriesProps) {

    const datesInRange = getDatesInRange(new Date(startDate), new Date(endDate));

    const numberValues: number[] = _.chain(data)
        .flatMap(_.values)
        .filter(_.isNumber)
        .filter((num) => num !== 1)
        .value();

    const options = {
        chart: {
          id: 'basic-bar',
          stacked: false
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
          categories: datesInRange,
          labels: {
            style: {
                colors: '#eee'
            }
          }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#eee'
                }
              }
        },
        title: {
            text: symbol,
            labels: {
                style: {
                    colors: '#eee'
                }
              }
        }
      };

    const series = [
        {
          name: symbol,
          data: numberValues
        }
      ];

    return (
        <ReactApexChart 
            options={options}
            series={series}
            type="area"
            height="350"
        />
    )
}