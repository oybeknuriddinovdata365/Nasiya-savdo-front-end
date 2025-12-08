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
import {
  EnvelopeIcon,
  EyeCloseIcon,
  EyeIcon,
  PencilIcon,
  TrashBinIcon,
} from "../../icons";
import { useState } from "react";
import PhoneInput from "../form/group-input/PhoneInput";
import FileInput from "../form/input/FileInput";
import Switch from "../form/switch/Switch";
import toast from "react-hot-toast";

interface User {
  id: number;
  login: string;
  full_name: string;
  email: string;
  phone: string;
  avatar: string | null;
  active: boolean;
  blocked: boolean;
}

const usersData: User[] = [
  {
    id: 1,
    login: "sardor.akhmedov",
    full_name: "Sardor Akhmedov",
    email: "sardor@gmail.com",
    phone: "+998901234567",
    avatar: null,
    active: true,
    blocked: false,
  },
  {
    id: 2,
    login: "mahira.xolmatova",
    full_name: "Mohira Xolmatova",
    email: "mohira@gmail.com",
    phone: "+998977654321",
    avatar: "/images/user/mohira.jpg",
    active: true,
    blocked: false,
  },
  {
    id: 3,
    login: "jasur.karimov",
    full_name: "Jasur Karimov",
    email: "jasur@gmail.com",
    phone: "+998909998877",
    avatar: null,
    active: false,
    blocked: true,
  },
];

interface ErrorType {
  login?: string;
  password?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  image?: string;
  pin_code?: string;
}

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
  const close = () => {
    closeModal();
    setEditUserId(null);
    setFormData(pustoyForm);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (editUserId) {
      toast.success("User ma'lumotlari yangilandi!");
    } else {
      toast.success("User muvaffaqiyatli qo'shildi!");
    }

    setEditUserId(null);
    setFormData(pustoyForm);
    closeModal();
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

  const [errors, setErrors] = useState<ErrorType>({});

  const validate = () => {
    const newErrors: ErrorType = {};
    const isEdit = editUserId !== null;

    if (!isEdit || formData.password.trim().length > 0) {
      if (formData.password.length < 8) {
        newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email formati noto'g'ri kiritildi";
    }

    if (!formData.phone.startsWith("+998") || formData.phone.length !== 13) {
      newErrors.phone = "Telefon raqam noto'g'ri formatda kiritildi";
    }

    if (!isEdit || formData.pin_code.trim().length > 0) {
      const pinRegex = /^[0-9]{4}$/;
      if (!pinRegex.test(formData.pin_code)) {
        newErrors.pin_code = "Pin kod 4 ta raqamdan iborat bo'lishi kerak";
      }
    }

    if (formData.image) {
      const allowed = ["image/png", "image/jpeg", "image/webp"];
      if (!allowed.includes(formData.image.type)) {
        newErrors.image = "Noto'g'ri formatdagi rasm yuklandi";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [editUserId, setEditUserId] = useState<number | null>(null);

  const handleEdit = (user: User) => {
    setEditUserId(user.id);

    setFormData({
      login: user.login,
      password: "",
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      image: null,
      pin_code: "",
      active: true,
      blocked: false,
    });

    openModal();
  };
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
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
                  Ism Familiya
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
                  Email
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
                >
                  Telefon Raqam
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
                >
                  Access
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
                >
                  Control
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  {/* Avatar + Fullname */}
                  <TableCell className="px-7 py-4 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "/images/default-user.png"}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-800 dark:text-white">
                        {user.full_name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Login */}
                  <TableCell className="text-gray-800 dark:text-white px-5 py-4">
                    {user.login}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-gray-800 dark:text-white px-5 py-4">
                    {user.email}
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="text-gray-800 dark:text-white px-5 py-4">
                    {user.phone}
                  </TableCell>

                  {/* Active */}
                  <TableCell className="px-5 py-4">
                    <Badge color={user.active ? "success" : "error"}>
                      {user.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  {/* Blocked */}
                  <TableCell className="px-5 py-4">
                    <Badge color={user.blocked ? "error" : "success"}>
                      {user.blocked ? "Blocked" : "Open"}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="flex mt-4 px-5 ">
                    <Button size="sm" onClick={() => handleEdit(user)}>
                      <PencilIcon fontSize={18} />
                    </Button>
                    <Button
                      size="sm"
                      className="ml-2"
                      onClick={() => {
                        setDeleteUserId(user.id);
                        openDeleteModal();
                      }}
                    >
                      <TrashBinIcon fontSize={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal isOpen={isOpen} onClose={close} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
              <form className="flex flex-col">
                <div className="custom-scrollbar h-[500px] overflow-y-auto px-2 pb-3">
                  <div className="mt-3">
                    <h5 className="mb-5 text-lg md:text-[25px] font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                      {editUserId ? "Userni tahrirlash" : "Yangi User qo'shish"}
                    </h5>
                    <div className="grid grid-cols-1  sm:grid-cols-2 gap-3 sm:space-y-2.5">
                      <div>
                        <Label htmlFor="login">Login</Label>
                        <Input
                          type="text"
                          value={formData.login}
                          id="login"
                          onChange={(e) =>
                            setFormData({ ...formData, login: e.target.value })
                          }
                        />
                      </div>
                      <div className="w-full">
                        <Label>Parol</Label>
                        <div>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
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
                          {errors.password && (
                            <p className="text-red-500 text-[12px] mt-1 items-center">
                              * {errors.password}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full">
                        <Label htmlFor="full_name">Ism Familiya</Label>
                        <Input
                          type="text"
                          id="full_name"
                          value={formData.full_name}
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
                        <div>
                          <div className="relative">
                            <Input
                              type="text"
                              className="pl-[62px]"
                              value={formData.email}
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
                          {errors.email && (
                            <p className="text-red-500 text-[12px] mt-1">
                              * {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <PhoneInput
                          value={formData.phone}
                          selectPosition="start"
                          countries={countries}
                          onChange={handlePhoneNumberChange}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[12px] mt-1">
                            * {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label>Profile Rasm</Label>
                        <FileInput
                          onChange={handleFileChange}
                          className="custom-class"
                        />
                        {errors.image && (
                          <p className="text-red-500 text-[12px] mt-1">
                            * {errors.image}
                          </p>
                        )}
                      </div>

                      <div className="w-full">
                        <Label>Pin-Code</Label>
                        <div>
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
                              {showPinCode ? (
                                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                              ) : (
                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                              )}
                            </button>
                          </div>
                          {errors.pin_code && (
                            <p className="text-red-500 text-[12px] mt-1">
                              * {errors.pin_code}
                            </p>
                          )}
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
                  <Button size="sm" variant="outline" onClick={close}>
                    Yopish
                  </Button>

                  <Button size="sm" onClick={handleSave}>
                    Saqlash
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            isOpen={isDeleteOpen}
            onClose={closeDeleteModal}
            className="max-w-[450px]"
          >
            <div className="p-5 flex flex-col">
              <div className="text-[22px] font-medium dark:text-white">
                Ishonchingiz komilimi ?
              </div>
              <div className="mt-5">
                <p className="dark:text-white/70 text-sm text-black/70">
                  Agar hozir bu buyruqni tasdiqlasangiz tanlangan ma'lumot o'chib ketadi va
                  uni orqaga qaytarishni iloji yo'q bo'ladi. Rostdan ham buni
                  tasdiqlaysizmi?
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button size="sm" variant="outline" onClick={closeDeleteModal}>
                  Bekor qilish
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // delete logic
                    console.log("User deleted:", deleteUserId);
                    closeDeleteModal();
                  }}
                >
                  Tasdiqlash
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
