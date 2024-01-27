import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Filler);

type LineChartProps = { data: ChartData<"line">; options?: any };

export function LineChart({ data, options }: LineChartProps) {
  return <Line data={data} options={options || undefined} />;
}
