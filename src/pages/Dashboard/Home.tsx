import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12">
          <StatisticsChart />
        </div>
      </div>
    </>
  );
}
