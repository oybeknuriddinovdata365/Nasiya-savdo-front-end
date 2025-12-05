import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface User {
  id: number;
  full_name: string;
}

interface Bugaltery {
  user: User;
  money: number;
  date: string;
}

const bugalteryData: Bugaltery[] = [
  {
    user: { id: 1, full_name: "Lindsey Curtis" },
    money: 150000,
    date: "2025-01-12",
  },
  {
    user: { id: 2, full_name: "Kaiya George" },
    money: 280000,
    date: "2025-01-15",
  },
  {
    user: { id: 3, full_name: "Zain Geidt" },
    money: 95000,
    date: "2025-01-18",
  },
];

export default function BugalteryTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                User
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Money
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Date
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {bugalteryData.map((item) => (
              <TableRow key={item.user.id}>
                {/* User */}
                <TableCell className="px-5 py-4 text-gray-800 dark:text-gray-200">
                  {item.user.full_name}
                </TableCell>

                {/* Money */}
                <TableCell className="px-5 py-4 text-gray-800 dark:text-gray-200">
                  {item.money.toLocaleString()} so'm
                </TableCell>

                {/* Date */}
                <TableCell className="px-5 py-4 text-gray-800 dark:text-gray-200">
                  {item.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
