import DefaultUserIcon from "../../assets/defUserIcon.png";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState, useEffect } from "react";
import { EyeCloseIcon, EyeIcon, InfoIcon } from "../../icons";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  phone_number: string;
  password: string;
}

interface ErrorType {
  username?: string;
  phone_number?: string;
  password?: string;
}

export default function UserMetaCard() {
  const API = import.meta.env.VITE_API_URL;
  const { isOpen, openModal, closeModal } = useModal();
  const { user } = useAuth();
  const [localUser, setLocalUser] = useState({
    username: user?.username ?? "",
    phone_number: user?.phone_number ?? "+998",
  });

  const [formData, setFormData] = useState<FormData>({
    username: localUser.username,
    phone_number: localUser.phone_number,
    password: "",
  });

  const [errors, setErrors] = useState<ErrorType>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        username: "",
        phone_number: "",
        password: "",
      });
      setErrors({});
    }
  }, [isOpen, localUser]);

  const validate = (): boolean => {
    const newErrors: ErrorType = {};
    if (formData.username) {
      if (formData.username.length < 3) {
        newErrors.username = "Login kamida 3 ta belgidan iborat bo'lishi kerak";
      }
    }
    if (formData.phone_number) {
      if (
        !formData.phone_number.startsWith("+998") ||
        formData.phone_number.length !== 13
      ) {
        newErrors.phone_number = "Telefon raqam noto'g'ri formatda kiritildi";
      }
    }
    if (formData.password.trim().length > 0) {
      const strongPass = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!strongPass.test(formData.password)) {
        newErrors.password =
          "Parol kamida 8 ta belgi, katta harf, raqam va maxsus belgi o'z ichiga olishi kerak";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateUser = async (): Promise<void> => {
    if (!validate()) return;

    try {
      const id = localStorage.getItem("user_id");

      const payload: Partial<FormData> = {};

      if (formData.username.trim()) {
        payload.username = formData.username.trim();
      }

      if (
        formData.phone_number.trim() &&
        formData.phone_number !== localUser.phone_number
      ) {
        payload.phone_number = formData.phone_number.trim();
      }

      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }
      closeModal();
      if (Object.keys(payload).length === 0) {
        toast.error("Hech qanday o'zgarish kiritilmadi");
        return;
      }

      await axios.patch(`${API}/admin/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setLocalUser({
        username: payload.username ?? localUser.username,
        phone_number: payload.phone_number ?? localUser.phone_number,
      });

      toast.success("Admin ma'lumotlari yangilandi");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error("Update error:", err);
      toast.error(
        err?.response?.data?.message || "Kiritilgan Admin ma'lumotlari mavjud"
      );
    }
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateUser();
  };

  return (
    <>
      {/* CARD */}
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src={DefaultUserIcon} alt="user" />
            </div>

            <div>
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {localUser.username} |{" "}
                {user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  : "UserRole"}
              </h4>
              <h1 className="text-sm text-gray-600 text-center xl:text-start">
                {localUser.phone_number}
              </h1>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <h5 className="mb-1 text-lg font-medium text-gray-800 dark:text-white/90">
                Tahrirlash
              </h5>
              <span className="text-gray-600 dark:text-gray-400 flex gap-2 text-sm mb-6">
                <InfoIcon /> Yangilanmaydigan ustunni bo'sh qoldiring!
              </span>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    placeholder="Yangi username"
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>

                <div>
                  <Label>Telefon Raqam</Label>
                  <Input
                    placeholder="yangi telefon raqam"
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm">
                      {errors.phone_number}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <Label>Parol</Label>
                  <div className="relative">
                    <Input
                      mask={!showPassword}
                      placeholder="Yangi parol kiriting"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="size-5 fill-gray-500" />
                      ) : (
                        <EyeCloseIcon className="size-5 fill-gray-500" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Yopish
              </Button>

              <Button size="sm" onClick={handleSaveClick}>
                Saqlash
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
