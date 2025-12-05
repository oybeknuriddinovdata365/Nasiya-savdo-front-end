import DefaultUserIcon from "../../assets/defUserIcon.png";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";

export default function UserMetaCard() {
  // const { user } = useAuth();
  // const { isOpen, openModal, closeModal } = useModal();

  const mockUser = {
    username: "AdminN1",
    phoneNumber: "+998976505902",
    role: "SuperAdmin",
  };

  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
    username: mockUser.username,
    phoneNum: mockUser.phoneNumber,
    role: mockUser.role,
    current_password: "",
    new_password: "",
  });

  // const handleSave = async () => {
  //   await axios.put("/api/user/update", formData);
  // };

  const handleSave = () => {
    console.log("Saved (mock):", formData);
    closeModal();
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src={DefaultUserIcon} alt="user" />
            </div>

            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {mockUser.username} | {mockUser.role}
              </h4>
              <h1 className="text-sm text-gray-600">{mockUser.phoneNumber}</h1>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              {/* PERSONAL INFO */}
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Tahrirlash
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Username</Label>
                    <Input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telefon Raqam</Label>
                    <Input
                      type="text"
                      value={formData.phoneNum}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNum: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>
                      Hozirgi parol
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Parolingizni kiriting"
                        value={formData.current_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            current_password: e.target.value,
                          })
                        }
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>
                      Yangi Parol
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Parolingizni kiriting"
                        value={formData.new_password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            new_password: e.target.value,
                          })
                        }
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>

              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
