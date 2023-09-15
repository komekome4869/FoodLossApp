import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AverageQuantityType } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
//   Legend
);


export default function Chart(props: {averageQuantity: AverageQuantityType}) {
    let averageQuantity = props.averageQuantity
    let data = {
        labels: ["Your Average Quantity [g]"],
        datasets: [
            {
            data: [averageQuantity.personal],
            backgroundColor: ['rgba(0,128,128, 0.5)'],
            },
        ],
    };

    // let data = {
    //     labels: ["You", "Average"],
    //     datasets: [
    //         {
    //         data: [averageQuantity.personal, averageQuantity.general],
    //         backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(53, 162, 235, 0.5)'],
    //         },
    //     ],
    // };
    return <Bar data={data} />;
}
