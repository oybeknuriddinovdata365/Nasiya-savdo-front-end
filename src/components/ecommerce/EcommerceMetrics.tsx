import axios, { all } from "axios";
import { ArrowDownIcon, BoxIconLine, GroupIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { useEffect, useState } from "react";
type Store = {
  id?: number;
  name?: string;
};

type Debtor = {
  id?: number;
  name?: string;
};

type Debt = {
  id?: number;
  amount?: number;
};

type DashboardResponse = {
  total_users: number;
  stores: Store[];
  totalDebtors: number;
  debtors: Debtor[];
  debts: Debt[];
  closed_debts: Debt[];
  total_closed_debts: number;
};

export default function EcommerceMetrics() {
  const [allStores, setAllStores] = useState<DashboardResponse>();
  const token = localStorage.getItem("access_token");

  const handleGetUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/statistics`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      setAllStores(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Foydalanuvchilar
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {allStores?.total_users}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6  dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Umumiy Qarzdorlar
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {allStores?.totalDebtors}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
