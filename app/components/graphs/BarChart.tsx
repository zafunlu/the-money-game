import {
  Chart as ChartJS,
  ChartData,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type BarChartProps = { data: ChartData<"bar">; options?: any };

export function BarChart({ options, data }: BarChartProps) {
  return <Bar options={options} data={data} />;
}
