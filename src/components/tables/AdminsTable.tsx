import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import {
  EyeCloseIcon,
  EyeIcon,
  InfoIcon,
  PencilIcon,
  TrashBinIcon,
} from "../../icons";
import { useEffect, useState } from "react";
import PhoneInput from "../form/group-input/PhoneInput";
import toast from "react-hot-toast";
import axios from "axios";
import { SkeletonRow } from "../common/SkeletonRow";
import { Admin } from "../common/types";
interface ErrorType {
  username?: string;
  password?: string;
  phone?: string;
}

export default function UsersTable() {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    phone_number: string;
  }>({
    username: "",
    password: "",
    phone_number: "",
  });

  const pustoyForm = {
    username: "",
    password: "",
    phone_number: "",
  };
  const close = () => {
    closeModal();
    setErrors({});
    setEditUserId(null);
    setFormData(pustoyForm);
  };

  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const handleCreateUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await axios.post(`${API}/admin/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.data;
      const newAdmin: Admin = {
        id: data.id,
        username: data.username,
        role: "admin",
        phone_number: data.phone_number,
      };
      setUsersData((prev) => [...prev, newAdmin]);
      toast.success("Admin muvaffaqiyatli qo'shildi!");
      setFormData(pustoyForm);
      closeModal();
    } catch (err) {
      console.error("Create admin error:", err);
      toast.error("Admin qo'shishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || !editUserId) return;

      toast.success("Admin muvaffaqqiyatli yangilandi!");

      closeModal();
    } catch (error: any) {
      toast.error("Yangilashda xatolik yuz berdi!");
      console.error("Update error:", error);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editUserId) {
      if (!FetchValidate()) return;
      handleUpdateUser();
    } else {
      if (!CreateValidate()) return;
      handleCreateUser();
    }
    setErrors({});
    setEditUserId(null);
    setFormData(pustoyForm);
    closeModal();
  };
  const countries = [{ code: "UZ", label: "+998" }];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    setFormData({ ...formData, phone_number: phoneNumber });
  };

  const [errors, setErrors] = useState<ErrorType>({});
  const [usersData, setUsersData] = useState<Admin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const closeModalMain = () => {
    closeModal();
    setErrors({});
  };
  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("access_token");
      await axios.delete(`${API}/admin/${deleteUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Admin muvaffaqiyatli o'chirildi!");
      setUsersData((prev) => prev.filter((u) => u.id !== deleteUserId));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Adminni o'chirishda xatolik yuz berdi");
    } finally {
      setDeleteUserId(null);
      closeDeleteModal();
      setIsLoading(false);
    }
  };

  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await axios.get(`${API}/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let usersArray = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];

        usersArray = usersArray.filter((user: Admin) => user.role?.toLowerCase() !== "superadmin");

        setUsersData(usersArray);
      } catch (err) {
        console.error("Fetch users error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [API]);

  const CreateValidate = () => {
    const newErrors: ErrorType = {};
    const isEdit = editUserId !== null;

    if (!isEdit || formData.password.trim().length > 0) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Parol kamida 8 ta belgidan va Kuchli bo'lishi kerak. Masalan: Pass1!";
      }
    }
    console.log(formData);
    if (
      !formData.phone_number.startsWith("+998") ||
      formData.phone_number.length !== 13
    ) {
      newErrors.phone = "Telefon raqam noto'g'ri formatda kiritildi";
    } else if (
      usersData.some(
        (u) => u.phone_number === formData.phone_number && u.id !== editUserId
      )
    ) {
      newErrors.phone = "Telefon raqam allaqachon mavjud";
    }

    if (
      usersData.some(
        (u) => u.username === formData.username && u.id !== editUserId
      )
    ) {
      newErrors.username = "Login allaqachon mavjud";
    }
    if (!formData.username) {
      newErrors.username = "Login kiritilmadi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const FetchValidate = () => {
    const newErrors: ErrorType = {};

    if (formData.password && formData.password.trim().length > 0) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Parol kamida 8 ta belgidan va kuchli bo'lishi kerak. Masalan: Pass111!";
      }
    }

    if (formData.phone_number) {
      if (
        !formData.phone_number.startsWith("+998") ||
        formData.phone_number.length !== 13
      ) {
        newErrors.phone = "Telefon raqam noto'g'ri formatda kiritildi";
      } else if (
        usersData.some((u) => u.phone_number === formData.phone_number)
      ) {
        newErrors.phone = "Telefon raqam allaqachon mavjud";
      }
    }

    if (formData.username) {
      if (formData.username.length < 3) {
        newErrors.username = "Login kamida 3 ta belgidan iborat bo'lishi kerak";
      }
      if (usersData.some((u) => u.username === formData.username)) {
        newErrors.username = "Login allaqachon mavjud";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [editUserId, setEditUserId] = useState<number | null>(null);
  const handleEdit = (user: Admin) => {
    setEditUserId(user.id);
    setFormData({
      username: "",
      password: "",
      phone_number: "",
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
        <h1 className="text-[20px] dark:text-white">Userlar</h1>
        <Button onClick={openModal} size="sm">
          User qo'shish
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="w-full">
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </div>
          ) : (
            <Table>
              {/* Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-theme-xs"
                  >
                    Username
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
                    Role
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
                {usersData.length > 0 ? (
                  usersData.map((user: Admin) => (
                    <TableRow key={user.id}>
                      {/* Login */}
                      <TableCell className="text-gray-800 dark:text-white px-5 py-4 text-center">
                        {user.username}
                      </TableCell>

                      {/* phone */}
                      <TableCell className="text-gray-800 dark:text-white px-5 py-4 text-center">
                        {user.phone_number}
                      </TableCell>

                      {/* role */}
                      <TableCell className="text-gray-800 dark:text-white px-5 py-4 text-center">
                        {user.role}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="flex mt-4 px-5 justify-center">
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
                  ))
                ) : (
                  <TableRow className="p-4 w-full flex justify-center items-center">
                    <TableCell className="text-center text-gray-500">
                      Adminlar mavjud emas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
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
                        <Label htmlFor="login">Username</Label>
                        <Input
                          type="text"
                          id="login"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                        {errors.username && (
                          <p className="text-red-500 text-[12px] mt-1">
                            * {errors.username}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <Label>Parol</Label>
                        <div>
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
                          {errors.password && (
                            <p className="text-red-500 text-[12px] mt-1 items-center">
                              * {errors.password}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label>Telefon Raqam</Label>
                        <PhoneInput
                          selectPosition="start"
                          countries={countries}
                          onChange={handlePhoneNumberChange}
                        />
                        <p className="dark:text-gray-400 text-gray-600 text-[13px] flex gap-2 items-center">
                          <InfoIcon className="text-[25px]" /> Telefon Raqam
                          Kodlari togri kiritilishi kerak (masalan: 97, 93, 94)
                        </p>
                        {errors.phone && (
                          <p className="text-red-500 text-[12px] mt-1">
                            * {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModalMain}>
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
                  Agar hozir bu buyruqni tasdiqlasangiz tanlangan ma'lumot
                  o'chib ketadi va uni orqaga qaytarishni iloji yo'q bo'ladi.
                  Rostdan ham buni tasdiqlaysizmi?
                </p>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button size="sm" variant="outline" onClick={closeDeleteModal}>
                  Bekor qilish
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (!deleteUserId) return;
                    handleDeleteUser();

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
