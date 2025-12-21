import { useEffect, useState } from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import Select from "../../components/form/Select";

type Period = "day" | "month" | "year";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [selected, setSelected] = useState<Period>("day");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const options = [
    { value: "day", label: "Kunlik Statistika" },
    { value: "month", label: "Oylik Statistika" },
    { value: "year", label: "Yillik Statistika" },
  ];

  const handleSelectChange = (value: string) => {
    setSelected(value as Period);
  };

  return (
    <>
      {!showContent && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className={`flex flex-col gap-4 md:gap-6 transition-opacity duration-300 ${
          showContent ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <div className="w-full flex justify-center md:justify-end">
          <div className="w-[160px]">
            <Select
              options={options}
              onChange={handleSelectChange}
              defaultValue="day"
            />
          </div>
        </div>

        <EcommerceMetrics period={selected} />
        <StatisticsChart period={selected} />
      </div>
    </>
  );
}
