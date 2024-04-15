import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import ForgetPass from "../../../../src/assets/forget.json";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "react-hook-form";

export default function ForggetPassword() {
  const [showSetEmail, setShowSetEmail] = useState(true);
  const [showSetToken, setShowSetToken] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const initialTime = 120; // 2 minutes in seconds
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [token, setToken] = useState(["", "", "", ""]);

  const inputRefs = useRef([]);

  const [error, setError] = useState({
    email: "",
  });

  const [storeEmail, setStoreEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (showSetToken) {
      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setRemainingTime(remainingTime - 1);
        }, 1000); // Decrease time every second
        return () => clearTimeout(timer); // Clear timeout on unmount or when time reaches 0
      }
    }
  }, [remainingTime, showSetToken]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleForgetPass = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (email.length === 0) {
      setError((prevError) => ({
        ...prevError,
        email: "Please Enter Your Email Address",
      }));
      return;
    }
    console.log(email);

    axios
      .get(`http://localhost:5000/forgetPassword/${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.info.messageId) {
          alert("Check Your Email Address");
          setStoreEmail(res.data.user.email);
          form.reset();
          setShowSetEmail(false);
          setShowSetToken(true);
          setShowSetPassword(false);
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleSentToken = (e) => {
    e.preventDefault();
    const form = e.target;
    const token = form.token.value;

    if (token.length === 0) {
      alert("Please Enter Your Token");
      return;
    }

    if (token.length > 4 || token.length < 4) {
      alert("Please Enter Your Correct Token");
      return;
    }

    axios
      .get(`http://localhost:5000/forgetPassword/${storeEmail}/${token}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.deletedCount > 0) {
          form.reset();
          setShowSetEmail(false);
          setShowSetToken(false);
          setShowSetPassword(true);
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleSentPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const nPassword = form.nPassword.value;
    const rPassword = form.rPassword.value;

    if (nPassword.length === 0) {
      alert("Please Enter Your New Password");
      return;
    }

    if (rPassword.length === 0) {
      alert("Please Enter Your Retype Password");
      return;
    }

    if (nPassword !== rPassword) {
      alert("Password Not Match");
      return;
    }

    const userInfo = {
      email: storeEmail,
      password: nPassword,
    };

    axios
      .patch(`http://localhost:5000/forgetPassword/${storeEmail}`, userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          alert("Password Changed");
          form.reset();
          setShowSetEmail(true);
          setShowSetToken(false);
          setShowSetPassword(false);
          navigate("/login", { replace: true });
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleResend = () => {
    axios.delete(`http://localhost:5000/token/${storeEmail}`).then((res) => {
      if (res.data.deletedCount > 0) {
        setShowSetEmail(true);
        setRemainingTime(initialTime);
        setShowSetToken(false);
        setShowSetPassword(false);
      }
    });
  };

  useEffect(() => {
    inputRefs[0]?.focus();
  }, [showSetToken]);

  const handleChange = (el, e) => {
    console.log(e);
    const value = e.target.value;
    console.log(value);
    if (value) {
      const newToken = [...token];
      newToken[el] = value;
      setToken(newToken);
      inputRefs[el]?.readOnly;
      if (el < 3) {
        inputRefs[el + 1]?.focus();
      } else {
        const finalToken = newToken.join("");
        console.log(finalToken);
        if (finalToken.length === 4) {
          axios
            .get(
              `http://localhost:5000/forgetPassword/${storeEmail}/${finalToken}`
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.deletedCount > 0) {
                setShowSetEmail(false);
                setShowSetToken(false);
                setShowSetPassword(true);
              }
            })
            .catch((err) => {
              alert(err.response.data.message);
            });
        }
      }
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 px-4 lg:px-24 py-8">
        <div className="w-full lg:flex justify-center items-center">
          <div className="text-center w-full lg:w-1/2">
            <div className="w-full md:w-1/2 lg:w-3/5">
              <Lottie animationData={ForgetPass} loop={true} />
            </div>
          </div>
          <div className="card flex-shrink-0 mt-2 w-full max-w-sm lg:min-w-[450px] shadow-2xl bg-base-100">
            {showSetToken && (
              <div className="card-body">
                <form onSubmit={handleSentToken}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Please Enter your verify Token
                      </span>
                    </label>
                    <input
                      type="text"
                      name="token"
                      placeholder="Enter Your verify token"
                      className="input !h-9  input-bordered"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <button
                      disabled={remainingTime == 0}
                      className={`${
                        remainingTime == 0
                          ? "cursor-not-allowed"
                          : "btn btn-sm btn-primary"
                      }`}
                    >
                      verify
                    </button>
                  </div>
                  {remainingTime == 0 && (
                    <p className="text-[#FF0000]">Token Expired</p>
                  )}
                </form>
                {remainingTime == 0 && (
                  <button onClick={handleResend} className="text-orange">
                    Resend Token
                  </button>
                )}
                <div>
                  <form>
                    <div className="flex justify-between items-center">
                      {["0", "1", "2", "3"].map((el, index) => (
                        <div key={el}>
                          <input
                            disabled={remainingTime == 0}
                            ref={(input) => (inputRefs[parseInt(el)] = input)}
                            type="text"
                            className="border px-4 border-gray-light shadow-lg h-16 w-16 rounded-lg"
                            onInput={(e) => handleChange(parseInt(el), e)}
                          />
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
                <p>Time Remaining: {formatTime(remainingTime)}Sec.</p>
              </div>
            )}

            {showSetEmail && (
              <div className="card-body">
                <form onSubmit={handleForgetPass}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Enter your email address :
                      </span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      className="input !h-9  input-bordered"
                    />
                  </div>

                  <div className="form-control mt-2">
                    <button className="btn btn-sm btn-primary">Reset</button>
                  </div>
                </form>

                <Link to="/login" className="text-orange">
                  Go Back
                </Link>
              </div>
            )}
            {showSetPassword && (
              <div className="card-body">
                <form onSubmit={handleSentPassword}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Enter your new password :
                      </span>
                    </label>
                    <input
                      type="password"
                      name="nPassword"
                      placeholder="Enter Your new password"
                      className="input !h-9  input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Enter your Retype password :
                      </span>
                    </label>
                    <input
                      type="password"
                      name="rPassword"
                      placeholder="Enter Your retype password"
                      className="input !h-9  input-bordered"
                    />
                  </div>
                  <div className="form-control mt-2">
                    <button className="btn btn-sm btn-primary">Sent</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
