import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import axios from "axios";

type Debt = {
  created_at: string;
  total_amount: string;
  remaining_amount: string;
  debt_status: "active" | "closed";
};

type DashboardResponse = {
  debts: Debt[];
};

export default function StatisticsChart() {
  const [data, setData] = useState<DashboardResponse | null>(null);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ data: DashboardResponse }>(
          `${import.meta.env.VITE_API_URL}/admin/statistics`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // ===== OYLIK HISOB =====
  const monthlyGiven = new Array(12).fill(0);
  const monthlyPaid = new Array(12).fill(0);
  const monthlyLate = new Array(12).fill(0);

  data?.debts.forEach((debt) => {
    const month = new Date(debt.created_at).getMonth();

    const total = Number(debt.total_amount);
    const remaining = Number(debt.remaining_amount);
    const paid = total - remaining;

    monthlyGiven[month] += total;
    monthlyPaid[month] += paid;

    if (debt.debt_status === "active" && remaining > 0) {
      monthlyLate[month] += remaining;
    }
  });

  const series = [
    {
      name: "Berilgan nasiya",
      data: monthlyGiven,
    },
    {
      name: "To'langan nasiya",
      data: monthlyPaid,
    },
    {
      name: "Kechiktirilgan nasiya",
      data: monthlyLate,
    },
  ];

  const options: ApexOptions = {
    legend: { show: false, position: "top", horizontalAlign: "left" },
    colors: [
      "#12B76A", // 🟢 Berilgan
      "#465FFF", // 🔵 To‘langan
      "#F04438", // 🔴 Kechiktirilgan
    ],

    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toLocaleString("uz-UZ")} UZS`,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => val.toLocaleString("uz-UZ"),
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Yillik Statistika
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Har bir oydagi nasiyalar ma'lumotlari
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <div className="w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
