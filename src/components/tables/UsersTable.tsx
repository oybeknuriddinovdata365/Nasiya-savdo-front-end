import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

interface User {
  id: number;
  full_name: string;
  image: string;
  passport: string;
  email: string;
  login: string;
  role: "teacher" | "manager" | "student" | "admin";
}

// MOCK DATA
const usersData: User[] = [
  {
    id: 1,
    full_name: "Sardor Akhmedov",
    image: "/images/user/user-17.jpg",
    passport: "AA1234567",
    email: "sardor@gmail.com",
    login: "sardor.akhmedov",
    role: "admin",
  },
  {
    id: 2,
    full_name: "Mohira Xolmatova",
    image: "/images/user/user-18.jpg",
    passport: "AB7654321",
    email: "mohira@gmail.com",
    login: "mohira.xolmatova",
    role: "manager",
  },
  {
    id: 3,
    full_name: "Jasur Karimov",
    image: "/images/user/user-21.jpg",
    passport: "AC3344557",
    email: "jasur@gmail.com",
    login: "jasur.karimov",
    role: "teacher",
  },
  {
    id: 4,
    full_name: "Nodira To‘xtaeva",
    image: "/images/user/user-20.jpg",
    passport: "AD9988776",
    email: "nodira@gmail.com",
    login: "nodira.toxtaeva",
    role: "student",
  },
];

export default function UsersTable() {
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
                User
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
                Email
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
                Role
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {usersData.map((user) => (
              <TableRow key={user.id}>
                
                {/* FULL NAME + IMAGE */}
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={user.image}
                        alt={user.full_name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <span className="block text-theme-sm font-medium text-gray-800 dark:text-white">
                        {user.full_name}
                      </span>
                      <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                        User
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* PASSPORT */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {user.passport}
                </TableCell>

                {/* EMAIL */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {user.email}
                </TableCell>

                {/* LOGIN */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  {user.login}
                </TableCell>

                {/* ROLE */}
                <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      user.role === "admin"
                        ? "error"
                        : user.role === "manager"
                        ? "warning"
                        : user.role === "teacher"
                        ? "info"
                        : "success"
                    }
                  >
                    {user.role}
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
