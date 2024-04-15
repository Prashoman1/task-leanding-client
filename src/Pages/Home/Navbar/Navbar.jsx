import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, redirect } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

export default function Navbar() {
  const { user, setRefetch, cartLength, setSearchProduct,setSearchRefetch, searchProductData } =
    useContext(ContextProvider);
  //console.log(searchProductData);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setRefetch((pre) => !pre);
    navigate("/login");
  };

  const handleChangeInput = (e) => {
    setSearchProduct(e.target.value);
    setSearchRefetch((pre) => !pre);
    
  };

  const items = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {user.role == "admin" && (
        <>
          <li>
            <NavLink to="/dashboard/add-product">dashbord</NavLink>
          </li>{" "}
        </>
      )}

      {user.role == "user" && (
        <li>
          <NavLink to="/my-payment-history">My Payment History</NavLink>
        </li>
      )}

      {user.email ? (
        <li>
          <NavLink to="/my-profile">My Profile</NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="flex justify-between items-center bg-base-300 px-3 lg:px-24">
      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-40 z-10"
          >
            {items}
            <li>
              <Link to="/my-cart" className="flex">
                <HiShoppingCart className="h-4 w-4"></HiShoppingCart>
                <sup className="badge badge-sm badge-secondary">
                  +{cartLength}
                </sup>
              </Link>
            </li>
            {user.email ? (
              <button onClick={handleLogOut} className="btn  btn-sm btn-info">
                LogOut
              </button>
            ) : (
              <li>
                <NavLink className="btn btn-sm btn-success" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl hidden lg:block"
        >
          Demu
        </Link>
      </div>
      <div className="flex">
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="w-40 lg:w-80 px-2 outline-none h-9 rounded-l-lg border border-gray"
            placeholder="Search Product"
            onChange={handleChangeInput}
          />
          <button className="btn !rounded-r-md !rounded-l-none !h-9 btn-sm btn-success me-2">
            Search
          </button>
        </div>
      </div>
      <div className="navbar-end hidden  lg:block">
        <div className="flex justify-center items-center ">
          <ul className="menu menu-horizontal px-1">{items}</ul>
        </div>
      </div>
    </div>
  );
}
