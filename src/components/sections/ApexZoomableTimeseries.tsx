import { MappedTimeseriesData } from '../../interfaces/MappedTimeseriesData';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';

interface ApexZoomableTimeseriesProps{
    commoditySymbol: string;
    data: MappedTimeseriesData[]
}

export default function ApexZoomableTimeseries({commoditySymbol, data}: ApexZoomableTimeseriesProps) {

  const dates: string[] = [];

  _.forEach(data, (data: MappedTimeseriesData) => {
    dates.push(data.date);
  });
    console.log(dates);

    const numberValues: number[] = _.chain(data)
        .flatMap(_.values)
        .filter(_.isNumber)
        .filter((num) => num !== 1)
        .value();
    console.log(numberValues);

    const options = {
        chart: {
          id: 'basic-bar',
          stacked: false,
          height: '100%'
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
          categories: dates,
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
              },
            title: {
              text: 'USD',
              style: {
                color: '#eee'
            }
            }
        },
        title: {
          text: commoditySymbol,
            style: {
              color: '#eee'
            }
        }
      };

    const series = [
        {
          name: commoditySymbol,
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