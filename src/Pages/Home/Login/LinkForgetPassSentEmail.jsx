import React from "react";
import Lottie from "lottie-react";
import ForgetPass from "../../../assets/forget.json";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function LinkForgetPass() {
  const { email, token } = useParams();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm()
  //console.log(email, token);
  const secretToke = localStorage.getItem("tokenSecret");
  const handleNewpass = (field) =>{
    trigger(field);
  }

  const handleSentPassword = (data) => {
   const {nPassword, rPassword} = data;
   console.log(data);

   if(nPassword !== rPassword){
     alert("Password not match");
     return;
   }
   const userInfo = {
    email,
    password:nPassword
}
   
   axios.patch(`http://localhost:5000/forgetPassword/${email}`,userInfo)
    .then((res) =>{
        console.log(res.data);
        if(res.data.modifiedCount){
            alert("Password Changed");
            localStorage.removeItem("tokenSecret");
            navigate("/login", { replace: true });
            return;
        }
    })
    .catch((err) =>{
        alert(err.response.data.message);
    })


  };
  return (
    <div>
      {secretToke == token ? (
        <>
          {" "}
          <div className="hero min-h-screen bg-base-200 px-4 lg:px-24 py-8">
            <div className="w-full lg:flex justify-center items-center">
              <div className="text-center w-full lg:w-1/2">
                <div className="w-full md:w-1/2 lg:w-3/5">
                  <Lottie animationData={ForgetPass} loop={true} />
                </div>
              </div>
              <div className="card flex-shrink-0 mt-2 w-full max-w-sm lg:min-w-[450px] shadow-2xl bg-base-100">
                <div className="card-body">
                  <form onSubmit={handleSubmit(handleSentPassword)}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Enter your new password :
                        </span>
                      </label>
                      <input
                        type="password"
                        name="nPassword"
                       
                        {...register("nPassword", { required: "New Password is required",
                        minLength: {
                          value: 8,
                          message: "Password should have at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-="'])(?=.*[A-Z]).{8,}$/,
                          message:
                            "Password should, one capital letter, and one special character",
                        },
                        
                      })}
                        placeholder="Enter Your new password"
                        className="input !h-9  input-bordered"
                        onBlur={()=>handleNewpass('nPassword')}
                      />
                      {errors.nPassword && (
                    <p className="text-[#FF0000]">{errors.nPassword.message}</p>
                  )}
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
                        {...register("rPassword", { required: "Retype Password is required"})}
                        placeholder="Enter Your retype password"
                        className="input !h-9  input-bordered"
                      />
                      {errors.rPassword && (
                    <p className="text-[#FF0000]">{errors.rPassword.message}</p>
                  )}
                    </div>
                    <div className="form-control mt-2">
                      <button type="submit" className="btn btn-sm btn-primary">Sent</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to="/"></Navigate>
        </>
      )}
    </div>
  );
}
