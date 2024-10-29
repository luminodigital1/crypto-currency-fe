import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { Grid } from "@mui/material";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

import { CryptoCurrency } from "../_utils/constants";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface CryptoGraphProps {
  data: { [key: string]: { prices: number[]; timestamps: string[] } };
  selectedCurrency?: CryptoCurrency;
}

const CryptoGraph: React.FC<CryptoGraphProps> = ({
  data,
  selectedCurrency = CryptoCurrency.Bitcoin,
}) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: selectedCurrency,
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    if (data[selectedCurrency]) {
      const { prices, timestamps } = data[selectedCurrency];

      setChartData({
        labels: timestamps.map((timestamp) =>
          new Date(timestamp).toLocaleString()
        ),
        datasets: [
          {
            label: selectedCurrency,
            data: prices,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    }
  }, [data, selectedCurrency]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
        height: "400px",
        marginBottom: "20px",
      }}
    >
      <Grid item sx={{ width: "60%", height: "100%" }}>
        {chartData.datasets[0].data.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            style={{ height: "100%" }}
          />
        ) : (
          <Grid>No data available for {selectedCurrency}</Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CryptoGraph;
