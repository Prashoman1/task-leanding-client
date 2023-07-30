import Lottie from "lottie-react";
import React, { useContext, useState } from 'react'
import LoginAnimation from "../../../../src/assets/login.json"
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";
import { toast } from 'react-toastify';

export default function () {
const {user,setRefetch, refetch} = useContext(ContextProvider);
const [loading,setLoading] = useState(false);
const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);
    const userInfo={
      email,password
    }
    const requestUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    }
    fetch("http://localhost:5000/login",requestUser)
    .then(res=>res.json())
    .then((data) =>{
      console.log(data);
      if(data.message){
        toast.error(data.message);
        return;
      }
      setRefetch((prevRefetch)=>!prevRefetch)
      localStorage.setItem("user",data._id);
      navigate("/");
      toast.success("Login Successfully");
    })
  }

  return (
    <div>
        <div className="hero min-h-screen bg-base-200 px-4 lg:px-24 py-8">
  <div className="w-full lg:flex justify-center items-center">
    <div className="text-center w-full lg:w-1/2">
      <div className="w-full lg:w-3/4">
      <Lottie animationData={LoginAnimation}  loop={true} />
      </div>
    </div>
    <div className="card flex-shrink-0 mt-2 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        
        <div className="divider">
            <h1 className="font-bold text-2xl">Login First</h1>
        </div>
        <form onSubmit={handleLogin}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="email" placeholder="email" className="input !h-9  input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input !h-9  input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <p className="py-1">Don't have an account?<Link to="/register" className="text-blue-400">SingUp</Link></p>
        <div className="form-control">
          <button className="btn btn-sm btn-primary">Login</button>
        </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
