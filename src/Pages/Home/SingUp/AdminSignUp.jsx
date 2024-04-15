import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Adminanimation from "../../../../src/assets/adminRegistration.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { HiEye, HiEyeOff } from "react-icons/hi";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function AdminSignUp() {
  const [pMatch, setPmatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  
  const [error, setError] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
    photoImage: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cPassword: "",
    photoImage: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

  // const handleImage = (e) => {
  //     setImage(e.target.files[0]);
  //   };

  //validation all field

  const handleBlur = (name, value) => {
    let message = "";
    switch (name) {
      case "name":
        console.log(value);
        message = "";
        message = value.length === 0 ? "Name name is required" : "";
        setError({ ...error, name: message });
        break;
      case "email":
        if (value.length === 0) {
          message = "Email is required";
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          message = "Email is not valid";
        }
        setError({ ...error, email: message });
        break;
      case "phone":
        if (value.length === 0) {
          message = "Phone is required";
        }
        if (/^(?:\+8801|01)[3-9]\d{8}$/i.test(value) === false) {
          message = "Enter a valid Bd phone number";
        }
        setError({ ...error, phone: message });
        break;
      case "password":
        if (value.length === 0) {
          message = "Password is required";
        } else if (value.length < 8) {
          message = "Password must be at least 8 characters";
        } else if (!/\d{1}/.test(value)) {
          message = "Password must contain at least one digit";
        } else if (!/[!@#$%^&*]/.test(value)) {
          message = "Password must contain at least one special character";
        } else if (!/[A-Z]/.test(value)) {
          message = "Password must contain at least one uppercase letter";
        }
        setError({ ...error, password: message });
    }
  };

  const handleRegister = (data) => {
    setPmatch("");
    setLoading(true);
    console.log(data);
    if (data.password !== data.cPassword) {
      setPmatch("Password and confirm password not match");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", data.photoImage[0]);
    fetch(hostUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;

          const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: "admin",
            image: imgUrl,
          };
          console.log(userInfo);

          const requestUser = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userInfo),
          };
          fetch("http://localhost:5000/register", requestUser)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                setLoading(false);
                toast.success("Registration Successfull");
                navigate("/login");
                return;
              }
              if (data.message) {
                setLoading(false);
                toast.error(data.message);
                return;
              }
            });
        }
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200 lg:px-24 lg:py-8">
        <div className="w-full lg:flex justify-center items-center">
          <div className="text-center sm:w-full lg:w-1/2">
            <div className=" lg:w-3/4">
              <Lottie animationData={Adminanimation} loop={true} />
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 sm:mt-7 lg:mt-0">
            <div className="card-body">
              <div className="divider !mb-3">
                <h1 className="font-bold text-2xl">SignUp</h1>
              </div>
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="form-control">
                  <label className="label !pb-1">
                    <span className="label-text">Name*:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    className="input  !h-9 input-bordered"
                    onBlur={(e) => handleBlur("name", e.target.value)}
                  />
                </div>
                {errors.name ? (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                ) : (
                  error.name && (
                    <p className="text-red-500 text-xs">{error.name}</p>
                  )
                )}

                {/* {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )} */}
                <div className="form-control">
                  <label className="label !pb-1">
                    <span className="label-text">Email*:</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    placeholder="Enter your email"
                    className="input  !h-9 input-bordered"
                    onBlur={(e) => handleBlur("email", e.target.value)}
                  />
                </div>
                {errors.email ? (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                ) : (
                  error.email && (
                    <p className="text-red-500 text-xs">{error.email}</p>
                  )
                )}
                {/* {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )} */}

                <div className="form-control">
                  <label className="label !pb-1">
                    <span className="label-text">Phone*:</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    {...register("phone", {
                      required: "Phone is required",
                    })}
                    placeholder="Enter your Bd Phone Number"
                    className="input  !h-9 input-bordered"
                    onBlur={(e) => handleBlur("phone", e.target.value)}
                  />
                </div>
                {errors.phone ? (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                ) : (
                  error.phone && (
                    <p className="text-red-500 text-xs">{error.phone}</p>
                  )
                )}
                {/* {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )} */}
                <div className="form-control relative">
                  <label className="label !pb-1">
                    <span className="label-text">Password*:</span>
                  </label>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    name="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    placeholder="Enter your Password"
                    className="input  !h-9 input-bordered"
                    onBlur={(e) => handleBlur("password", e.target.value)}
                  />
                  {showPassword ? (
                    <p
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-11 right-3 cursor-pointer"
                    >
                      <HiEye />
                    </p>
                  ) : (
                    <p
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-11 right-3 cursor-pointer"
                    >
                      <HiEyeOff />
                    </p>
                  )}
                </div>
                {errors.password ? (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                ) : (
                  error.password && (
                    <p className="text-red-500 text-xs">{error.password}</p>
                  )
                )}
                {/* {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )} */}
                <div className="form-control relative">
                  <label className="label !pb-1">
                    <span className="label-text">Confirm Password*:</span>
                  </label>
                  <input
                    type={`${showCPassword ? "text" : "password"}`}
                    name="cPassword"
                    {...register("cPassword")}
                    placeholder="Enter your confirm password"
                    className="input  !h-9 input-bordered"
                  />
                  {showCPassword ? (
                    <p
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute top-11 right-3 cursor-pointer"
                    >
                      <HiEye />
                    </p>
                  ) : (
                    <p
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute top-11 right-3 cursor-pointer"
                    >
                      <HiEyeOff />
                    </p>
                  )}
                </div>
                {pMatch && <p className="text-red-500">{pMatch}</p>}
                <div className="form-control">
                  <label className="label !pb-1">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="file"
                    {...register("photoImage", {
                      required: "Photo is required",
                    })}
                    name="photoImage"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                  />
                </div>
                {errors.photoImage && (
                  <p className="text-red-500 text-xs">
                    {errors.photoImage.message}
                  </p>
                )}
                <p>
                  If you already have an account?
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </p>
                <div className="form-control mt-4">
                  <button type="submit" className="btn btn-sm btn-primary">
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
