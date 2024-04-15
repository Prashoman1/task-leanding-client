import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ContextProvider } from "../Providers/Provider";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function ChangeUserInfo() {
  const { user } = useContext(ContextProvider);
  const [showPassword, setShowPassword] = useState(false);
  const [showNPassword, setShowNPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    const modal = document.getElementById("my_modal_1");
    modal.close();
  };
  const handleNewpass = (field) => {
    trigger(field);
  };

  const handleChangePass = (data) => {
    console.log(data);
    const { oldPassword, nPassword, rPassword } = data;
    if (nPassword !== rPassword) {
      alert("Password not match");
      return;
    }
    const updatedPass = {
      password: oldPassword,
      newPassword: nPassword,
    };

    axios
      .patch(
        `http://localhost:5000/users/passwordChange/${user?.email}`,
        updatedPass
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          reset();
          alert("Password Changed");
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div>
      {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button> */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box">
          <div className="modal-action absolute top-0 right-2">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={handleClose} className="btn btn-sm btn-secondary">
              X
            </button>
          </div>

          <div>
            <h1 className="text-2xl  font-semibold">Change Password</h1>
          </div>
          <form onSubmit={handleSubmit(handleChangePass)}>
            <div className="form-control w-full max-w-xs my-3">
              <input
                type={`${showPassword ? "text" : "password"}`}
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
                placeholder="Current Password"
                className="px-2  rounded-lg focus:outline-none border border-gray-light shadow-lg !h-8 w-full max-w-xs"
                onBlur={() => handleNewpass("oldPassword")}
              />
              {showPassword ? (
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[75px] right-44 cursor-pointer"
                >
                  <HiEye />
                </p>
              ) : (
                <p
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[75px] right-44 cursor-pointer"
                >
                  <HiEyeOff />
                </p>
              )}
              {errors.oldPassword && (
                <p className="text-[#FF0000] text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="form-control w-full max-w-xs relative">
                <input
                  type={`${showNPassword ? "text" : "password"}`}
                  {...register("nPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should have at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-="'])(?=.*[A-Z]).{8,}$/,
                      message:
                        "Password should, one capital letter, and one special character",
                    },
                  })}
                  placeholder="New Password"
                  className="px-2 rounded-lg focus:outline-none border border-gray-light shadow-lg !h-8 w-full max-w-xs"
                  onBlur={() => handleNewpass("nPassword")}
                />
                {showNPassword ? (
                  <p
                    onClick={() => setShowNPassword(!showNPassword)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <HiEye />
                  </p>
                ) : (
                  <p
                    onClick={() => setShowNPassword(!showNPassword)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <HiEyeOff />
                  </p>
                )}
                {errors.nPassword && (
                  <p className="text-[#FF0000] text-sm">
                    {errors.nPassword.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full max-w-xs relative">
                <input
                  type={`${showCPassword ? "text" : "password"}`}
                  {...register("rPassword", {
                    required: "Confirm Password is required",
                  })}
                  placeholder="Retype Password"
                  className="px-2 rounded-lg focus:outline-none border border-gray-light shadow-lg !h-8 w-full max-w-xs"
                  onBlur={() => handleNewpass("rPassword")}
                />
                {showCPassword ? (
                  <p
                    onClick={() => setShowCPassword(!showCPassword)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <HiEye />
                  </p>
                ) : (
                  <p
                    onClick={() => setShowCPassword(!showCPassword)}
                    className="absolute top-2 right-2 cursor-pointer"
                  >
                    <HiEyeOff />
                  </p>
                )}
                {errors.rPassword && (
                  <p className="text-[#FF0000] text-sm">
                    {errors.rPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-sm btn-success">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
