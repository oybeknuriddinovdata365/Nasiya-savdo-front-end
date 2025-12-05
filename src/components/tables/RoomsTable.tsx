import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface Room {
  id: number;
  name: string;
  number: string;
  width: number; // sig'imi
  status: string;
}

const roomsData: Room[] = [
  {
    id: 1,
    name: "Lecture Room A",
    number: "101",
    width: 30,
    status: "Active",
  },
  {
    id: 2,
    name: "Computer Lab",
    number: "202",
    width: 25,
    status: "Active",
  },
  {
    id: 3,
    name: "Conference Hall",
    number: "305",
    width: 80,
    status: "Maintenance",
  },
  {
    id: 4,
    name: "Design Studio",
    number: "410",
    width: 20,
    status: "Closed",
  },
];

export default function RoomsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Room Name
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Number
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Capacity
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {roomsData.map((room) => (
              <TableRow key={room.id}>
                {/* Name */}
                <TableCell className="px-5 py-4 text-start">
                  <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {room.name}
                  </span>
                </TableCell>

                {/* Number */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {room.number}
                </TableCell>

                {/* Width / Capacity */}
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {room.width} people
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3 text-start">
                  <Badge
                    size="sm"
                    color={
                      room.status === "Active"
                        ? "success"
                        : room.status === "Maintenance"
                        ? "warning"
                        : "error"
                    }
                  >
                    {room.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
