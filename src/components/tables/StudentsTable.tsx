import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

// USERS (mock)
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

// GROUPS (mock)
const groupsData = [
  { id: "G-12", name: "Web Design Group" },
  { id: "G-9", name: "English Beginner" },
  { id: "G-11", name: "Marketing PRO" },
  { id: "G-7", name: "Graphic Design" },
  { id: "G-10", name: "Frontend Juniors" },
];

// Students (user join + group join)
const studentsRaw = [
  {
    id: 1,
    user_id: 1,
    phone: "+1 202 555 0188",
    passport: "AB1234567",
    group_id: "G-12",
  },
  {
    id: 2,
    user_id: 2,
    phone: "+1 202 555 0144",
    passport: "AC9876543",
    group_id: "G-9",
  },
  {
    id: 3,
    user_id: 3,
    phone: "+1 202 555 0166",
    passport: "AA1122334",
    group_id: "G-11",
  },
];

const tableData = studentsRaw.map((st) => {
  const user = usersData.find((u) => u.id === st.user_id);
  const group = groupsData.find((g) => g.id === st.group_id);

  return {
    ...st,
    ...user,
    groupName: group?.name || "N/A",
  };
});

export default function StudentsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>

          {/* HEADER */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">Student</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">Phone</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">Passport</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">Group</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500">Login</TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((student) => (
              <TableRow key={student.id}>

                {/* Student */}
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={student.image}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-medium text-gray-800 dark:text-white">
                      {student.full_name}
                    </span>
                  </div>
                </TableCell>

                {/* Phone */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {student.phone}
                </TableCell>

                {/* Passport */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {student.passport}
                </TableCell>

                {/* Group (JOIN) */}
                <TableCell className="px-4 py-3">
                  <Badge color="primary" size="sm">
                    {student.groupName}
                  </Badge>
                </TableCell>

                {/* Login */}
                <TableCell className="px-4 py-3 text-gray-500">
                  {student.login}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>
    </div>
  );
}
