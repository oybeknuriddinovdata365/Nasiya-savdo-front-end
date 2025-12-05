import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

// USERS (mock — as if data comes from /users)
const usersData = [
  {
    id: 1,
    full_name: "Lindsey Curtis",
    email: "LindseyCurtis@gmail.com",
    login: "lindsey.curtis",
    image: "/images/user/user-17.jpg",
  },
  {
    id: 2,
    full_name: "Kaiya George",
    email: "KaiyaGeorge@gmail.com",
    login: "kaiya.george",
    image: "/images/user/user-18.jpg",
  },
  {
    id: 3,
    full_name: "Zain Geidt",
    email: "ZainGeidt@gmail.com",
    login: "zain.geidt",
    image: "/images/user/user-17.jpg",
  },
];

// TEACHERS — userId orqali join bo‘ladi
const teachersData = [
  {
    id: 1,
    userId: 1,
    phone: "+1 202 555 0188",
    passport: "AB1234567",
    groups: ["Web Design", "UI/UX"],
    status: "Active",
    cv: "/cv/lindsey.pdf",
  },
  {
    id: 2,
    userId: 2,
    phone: "+1 202 555 0144",
    passport: "AC9876543",
    groups: ["Project Management"],
    status: "Active",
    cv: "/cv/kaiya.pdf",
  },
  {
    id: 3,
    userId: 3,
    phone: "+1 202 555 0166",
    passport: "AA1122334",
    groups: ["Content Writing"],
    status: "Active",
    cv: "/cv/zain.pdf",
  },
];

// JOIN — user + teacher maʼlumotlari birlashtiriladi
const tableData = teachersData.map((t) => {
  const user = usersData.find((u) => u.id === t.userId);
  return {
    ...t,
    ...user,
  };
});

export default function TeachersTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Teacher
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Phone
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Passport
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Groups
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Login
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                CV
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((teacher) => (
              <TableRow key={teacher.id}>
                {/* Teacher avatar + name */}
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={teacher.image}
                      alt={teacher.full_name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <span className="block font-medium text-gray-800 dark:text-white">
                        {teacher.full_name}
                      </span>
                      <span className="text-gray-500 text-theme-xs">
                        Teacher
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {teacher.email}
                </TableCell>

                {/* Phone */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {teacher.phone}
                </TableCell>

                {/* Passport */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {teacher.passport}
                </TableCell>

                {/* Groups */}
                <TableCell className="px-4 py-3">
                  <div className="flex gap-2 flex-wrap">
                    {teacher.groups.map((group, i) => (
                      <Badge key={i} size="sm" color="primary">
                        {group}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                {/* Login */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {teacher.login}
                </TableCell>

                {/* CV */}
                <TableCell className="px-4 py-3">
                  <a
                    href={teacher.cv}
                    className="text-blue-500 underline text-sm"
                    target="_blank"
                  >
                    View CV
                  </a>
                </TableCell>

                {/* Status */}
                <TableCell className="px-4 py-3">
                  <Badge
                    size="sm"
                    color={
                      teacher.status === "Active"
                        ? "success"
                        : teacher.status === "Pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {teacher.status}
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
