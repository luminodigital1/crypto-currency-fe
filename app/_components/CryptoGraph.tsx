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

import { colorMapping, CryptoCurrency } from "../_utils/constants";

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
  data: { [key: string]: { percentageChange: number[]; timestamps: Date[] } };
  selectedCurrency?: CryptoCurrency | null;
}

const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}, ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

const CryptoGraph: React.FC<CryptoGraphProps> = ({
  data,
  selectedCurrency,
}) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const newDatasets: Dataset[] = [];
    let timestamps: Date[] = [];

    if (
      selectedCurrency &&
      selectedCurrency !== CryptoCurrency.All &&
      data[selectedCurrency]
    ) {
      const { percentageChange, timestamps: selectedTimestamps } =
        data[selectedCurrency];
      newDatasets.push({
        label: selectedCurrency,
        data: percentageChange,
        borderColor: colorMapping[selectedCurrency] || "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      });
      timestamps = selectedTimestamps;
    } else {
      Object.keys(data).forEach((currency) => {
        const { percentageChange, timestamps: currencyTimestamps } =
          data[currency];
        newDatasets.push({
          label: currency,
          data: percentageChange,
          borderColor:
            colorMapping[currency] ||
            `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
              Math.random() * 255
            }, 1)`,
          backgroundColor: `rgba(${Math.random() * 255}, ${
            Math.random() * 255
          }, ${Math.random() * 255}, 0.2)`,
          fill: true,
        });
        timestamps = currencyTimestamps;
      });
    }

    setChartData({
      labels: timestamps.map((timestamp) => formatDate(timestamp)),
      datasets: newDatasets,
    });
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
        {chartData.datasets.length > 0 ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Percentage Change in Cryptocurrency Prices",
                  font: {
                    size: 18,
                  },
                  padding: {
                    bottom: 20,
                  },
                },
              },
            }}
            style={{ height: "100%" }}
          />
        ) : (
          <Grid container justifyContent="center" alignItems="center">
            Loading...
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CryptoGraph;
