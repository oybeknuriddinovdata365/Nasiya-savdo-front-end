import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Room {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  full_name: string;
}

interface Group {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  room: Room;
  course: Course;
  teacher: Teacher;
}

// Mock data
const groupsData: Group[] = [
  {
    id: 1,
    name: "Frontend Bootcamp",
    start_time: "09:00",
    end_time: "12:00",
    start_date: "2025-02-01",
    end_date: "2025-05-20",
    room: { id: 1, name: "Room 101" },
    course: { id: 1, name: "Front-End Development" },
    teacher: { id: 1, full_name: "Lindsey Curtis" },
  },
  {
    id: 2,
    name: "UI/UX Design",
    start_time: "14:00",
    end_time: "17:00",
    start_date: "2025-03-10",
    end_date: "2025-06-18",
    room: { id: 2, name: "Room 202" },
    course: { id: 2, name: "UI/UX Design Pro" },
    teacher: { id: 2, full_name: "Kaiya George" },
  },
  {
    id: 3,
    name: "Digital Marketing",
    start_time: "10:00",
    end_time: "13:00",
    start_date: "2025-01-15",
    end_date: "2025-04-01",
    room: { id: 3, name: "Room 305" },
    course: { id: 3, name: "Digital Marketing Basics" },
    teacher: { id: 3, full_name: "Zain Geidt" },
  },
];

export default function GroupsTable() {
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
                Group Name
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Start (Date | Time)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                End (Date | Time)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Room
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Course
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500"
              >
                Teacher
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {groupsData.map((group) => (
              <TableRow key={group.id}>
                {/* Group Name */}
                <TableCell className="px-5 py-4 text-gray-800 dark:text-gray-200">
                  {group.name}
                </TableCell>

                {/* Start (date + time) */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {group.start_date} | {group.start_time}
                </TableCell>

                {/* End (date + time) */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {group.end_date} | {group.end_time}
                </TableCell>

                {/* Room */}
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {group.room.name}
                </TableCell>

                {/* Course */}
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {group.course.name}
                </TableCell>

                {/* Teacher */}
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {group.teacher.full_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
