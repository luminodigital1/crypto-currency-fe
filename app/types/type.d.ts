interface CryptoData {
  currency: string;
  price: number;
  previousPrice: number;
  currentTime: number;
  percentageChange: number;
}

interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}
