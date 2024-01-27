import { BarChart } from "@/app/components/graphs/BarChart";
import { formatCurrency } from "@/app/utils/formatters";
import { GET } from "@/app/utils/http-client";
import { useEffect, useState } from "react";

export function TransactionBreakdownChart({ account }: any) {
  const [monthlyData, setMonthlyData] = useState<any>(null);
  const [noMonthlyData, setNoMonthlyData] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const response = await GET(`/accounts/${account.id}/insights/transactions`);

      if (response.ok) {
        const data = await response.json();

        if (data.labels?.length > 0) {
          setNoMonthlyData(false);
          setMonthlyData({
            labels: data.labels.map((label: string) => label.trim()),
            datasets: [
              { label: "Deposits", data: data.deposits, backgroundColor: "#1d692faa" },
              {
                label: "Withdrawals",
                data: data.withdrawals.map((withdraw: number) => Math.abs(withdraw)),
                backgroundColor: "#db97c5aa",
              },
            ],
          });
        } else {
          setMonthlyData({});
        }
      }
    };

    if (monthlyData === null) {
      fetchMonthlyData();
    }
  }, [account, monthlyData]);

  if (monthlyData === null) {
    return <>Crunching numbers...</>;
  }

  if (noMonthlyData) {
    return <div className="text-gray-500">No data for this month yet.</div>;
  }

  return (
    <BarChart
      data={monthlyData}
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItem: any, _: any) => {
                return tooltipItem[0].dataset.label;
              },
              label: (tooltipItem: any, _: any) => {
                return formatCurrency(tooltipItem.raw);
              },
            },
          },
        },
      }}
    ></BarChart>
  );
}
