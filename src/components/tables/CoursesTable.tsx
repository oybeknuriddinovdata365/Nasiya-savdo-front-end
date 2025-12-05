import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Course {
  id: number;
  name: string;
  date: string;
  price: number;
}

// Mock data
const coursesData: Course[] = [
  {
    id: 1,
    name: "Front-End Development",
    date: "2025-01-15",
    price: 1200,
  },
  {
    id: 2,
    name: "UI/UX Design",
    date: "2025-02-01",
    price: 1500,
  },
  {
    id: 3,
    name: "Digital Marketing",
    date: "2025-02-20",
    price: 900,
  },
  {
    id: 4,
    name: "Project Management",
    date: "2025-03-05",
    price: 1000,
  },
];

export default function CoursesTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>

          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Course Name
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Date
              </TableCell>

              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">
                Price
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {coursesData.map((course) => (
              <TableRow key={course.id}>
                
                {/* Course Name */}
                <TableCell className="px-5 py-4 text-gray-800 dark:text-gray-200">
                  {course.name}
                </TableCell>

                {/* Date */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {course.date}
                </TableCell>

                {/* Price */}
                <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  ${course.price}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}
