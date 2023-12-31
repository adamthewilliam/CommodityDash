import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import { TimeSeriesResponse } from '../../interfaces/TimeSeriesResponse';

interface TimeseriesGraphProps{
    commoditySymbol: string;
    data: TimeSeriesResponse['rates'];
}

export default function TimeseriesGraph({commoditySymbol, data}: TimeseriesGraphProps) {

  /* Get the dates to display on the xaxis */
  /* Underscore prefix indiciates the variable is unintentionally used to avoid declaration warnings.*/
  
  /* Refactor this logic to the parent component to keep this component dumb*/
  const dates: string[] = [];
  _.forEach(data, (_timeseries, date) => {
    dates.push(date);
  });
  
  console.log(dates);

  /* Flatten the mapped timeseries data down to just the currency values.*/
  /* Remove the USD currency from the returned commodities for a timeseries date.*/
  /* Divide the commodity value by 1 to display the true value. This is because the api returns the commodity value in the base currency */

  /* Refactor this logic to the parent component to keep this component dumb*/
  const numberValues: number[] = 
    _.flatMap(data, (timeseries) => {
      return _.map(timeseries, (commodityValue, commoditySymbol) => {
        if(commoditySymbol !== "USD") {
          return _.round(1 / Number(commodityValue), 2);
        }
        return undefined;
      }).filter((value) => value !== undefined) as number[];
      });

    const options = {
        chart: {
          id: 'timeseries-graph',
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