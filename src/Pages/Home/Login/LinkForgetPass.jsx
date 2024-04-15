import React from "react";
import Lottie from "lottie-react";
import ForgetPass from "../../../../src/assets/forget.json";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LinkForgetPass() {
  const handleForgetPass = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (email.length === 0) {
      alert("Please Enter Your Email Address");
      return;
    }
    console.log(email);

    axios
      .get(`http://localhost:5000/forgetPasswordLink/${email}`)
      .then((res) => {
        if (res.data.info.id && res.data.randomBytes) {
          alert("Check Your Email Address");
          localStorage.setItem("tokenSecret", res.data.randomBytes);
          form.reset();
          return;
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
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
          </div>
        </div>
      </div>
    </div>
  );
}
