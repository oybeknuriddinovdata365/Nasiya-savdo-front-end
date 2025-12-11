import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

export default function NotAccess() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />

        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[450px]">
          <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            ERROR
          </h1>
          <h1 className="sm:text-[150px] text-[100px] font-extrabold dark:hidden text-blue-500 ">
            4 0 3
          </h1>
          <h1 className=" hidden dark:block text-[100px] sm:text-[150px] font-extrabold text-gray-500 ">
            4 0 3
          </h1>

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Ushbu sahifaga kirishga sizda ruxsat mavjud emas.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 
            text-sm font-medium text-gray-700 shadow-theme-xs 
            hover:bg-gray-50 hover:text-gray-800 
            dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
            dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            Asosiy Sahifaga Qaytish
          </Link>
        </div>
      </div>
    </>
  );
}
