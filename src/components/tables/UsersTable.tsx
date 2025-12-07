import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnvelopeIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { useState } from "react";
import PhoneInput from "../form/group-input/PhoneInput";
import FileInput from "../form/input/FileInput";
import Switch from "../form/switch/Switch";

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
  const [formData, setFormData] = useState<{
    login: string;
    password: string;
    full_name: string;
    email: string;
    phone: string;
    image: File | null;
    pin_code: string;
    active: boolean;
    blocked: boolean;
  }>({
    login: "",
    password: "",
    full_name: "",
    email: "",
    phone: "",
    image: null,
    pin_code: "",
    active: true,
    blocked: false,
  });
  const pustoyForm = {
    login: "",
    password: "",
    full_name: "",
    email: "",
    phone: "",
    image: null,
    pin_code: "",
    active: true,
    blocked: false,
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(pustoyForm);
    closeModal();

    console.log("Data: ", formData);
  };
  const countries = [
    { code: "UZ", label: "+998" },
    { code: "RU", label: "+7" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    setFormData({ ...formData, phone: phoneNumber });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };
  const [isactive, setIsActive] = useState(true);
  const handleActiveChange = (checked: boolean) => {
    setIsActive(checked);
    setFormData({ ...formData, active: checked });
  };

  const [isBlocked, setisBlocked] = useState(false);
  const handleBlockChange = (checked: boolean) => {
    setisBlocked(checked);
    setFormData({ ...formData, blocked: checked });
  };
  return (
    <div className="flex  flex-col gap-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] dark:text-white">Users</h1>
        <Button onClick={openModal} size="sm">
          User qo'shish
        </Button>
      </div>
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
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            className="max-w-[700px] m-4"
          >
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <form className="flex flex-col">
                <div className="custom-scrollbar h-[452px] overflow-y-auto px-2 pb-3">
                  <div className="mt-3">
                    <h5 className="mb-5 text-lg md:text-[25px] font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                      Yangi User qo'shish
                    </h5>
                    <div className="grid grid-cols-1  sm:grid-cols-2 gap-3 sm:space-y-3">
                      <div>
                        <Label htmlFor="login">Login</Label>
                        <Input
                          type="text"
                          id="login"
                          onChange={(e) =>
                            setFormData({ ...formData, login: e.target.value })
                          }
                        />
                      </div>
                      <div className="w-full">
                        <Label>Parol</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                          >
                            {showPassword ? (
                              <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            ) : (
                              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="w-full">
                        <Label htmlFor="full_name">Ism Familiya</Label>
                        <Input
                          type="text"
                          id="full_name"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              full_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="w-full">
                        <Label>Email</Label>
                        <div className="relative">
                          <Input
                            type="text"
                            className="pl-[62px]"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                            <EnvelopeIcon className="size-6" />
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <PhoneInput
                          selectPosition="start"
                          countries={countries}
                          onChange={handlePhoneNumberChange}
                        />
                      </div>
                      <div>
                        <Label>Profile Rasm</Label>
                        <FileInput
                          onChange={handleFileChange}
                          className="custom-class"
                        />
                      </div>

                      <div className="w-full">
                        <Label>Pin-Code</Label>
                        <div className="relative">
                          <Input
                            type={showPinCode ? "text" : "password"}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pin_code: e.target.value,
                              })
                            }
                          />
                          <button
                            type="button"
                            onClick={() => setShowPinCode(!showPinCode)}
                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                          >
                            {showPassword ? (
                              <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            ) : (
                              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between sm:justify-center sm:gap-4">
                        <div className="flex flex-col gap-2 sm:border-2 sm:rounded-lg sm:p-2 w-full dark:border-gray-700">
                          <h1 className="dark:text-[#8e878c] text-[16px]">
                            Active
                          </h1>
                          <Switch
                            label={isactive ? "ON" : "OFF"}
                            defaultChecked={true}
                            onChange={handleActiveChange}
                          />
                        </div>

                        <div className="flex flex-col gap-2 sm:border-2 sm:rounded-lg sm:p-2 w-full dark:border-gray-700">
                          <h1 className="dark:text-[#8e878c] text-[16px]">
                            Blocked
                          </h1>
                          <Switch
                            label={isBlocked ? "ON" : "OFF"}
                            defaultChecked={false}
                            onChange={handleBlockChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}>
                    Yopish
                  </Button>

                  <Button size="sm" onClick={handleSave}>
                    Saqlash
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
