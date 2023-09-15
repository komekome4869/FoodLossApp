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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
//   Legend
);

interface ChartProps {
    yquant: number;
    quant: number;
}

export default function Shopfeed({yquant, quant}: ChartProps) {
    let data = {
        labels: ["Your Average Quantity", "Restaurant Average Quantity", ],
        datasets: [
            {
            data: [yquant, quant],
            backgroundColor: ['rgba(0,128,128, 0.5)', 'rgba(53, 162, 235, 0.5)'],
            },
        ],
    };
    return <Bar data={data} />;
}
