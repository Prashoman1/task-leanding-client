import React, { useContext, useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import WishListProduct from "../../../utilies/wishListProduct";
import Swal from "sweetalert2";

export default function () {
  const {
    user,
    setRefetch,
    cartLength,
    wishList,
    wishListProduct,
    setloading,
  } = useContext(ContextProvider);

  const navigate = useNavigate();
  // useEffect(() => {
  //   const wishList = JSON.parse(localStorage.getItem("wishList"));
  // }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure Logout?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes LogOut",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setRefetch((pre) => !pre);
        setloading(false);
        navigate("/login", { replace: true });

        Swal.fire("LogOut!", "LogOut successfully Done.", "success");
      }
    });
  };
  <button className="btn">open modal</button>;
  return (
    <div className="bg-gray-light px-28 py-2">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <a href="">SAVE MORE ON APP</a>
          </li>
          <li>
            <a href="">Demu Doneties</a>
          </li>
          <li>
            <a href="">Sell on Demu</a>
          </li>
          <li>
            <a href="">SAVE MORE ON APP</a>
          </li>

          <li className="flex  space-x-2 items-center">
            <Link to="/my-cart" className="flex">
              <HiShoppingCart className="h-4 w-4"></HiShoppingCart>
              <sup className="badge badge-sm badge-secondary">
                +{cartLength}
              </sup>
            </Link>

            <button
              onClick={() => window.my_modal_5.showModal()}
              className="flex"
            >
              {user.email ? (
                <>
                  <HiOutlineHeart className="text-xl text-[#FF0000]" />
                  <sup className="badge badge-sm badge-success">
                    +{wishList?.length}
                  </sup>
                </>
              ) : (
                <></>
              )}
            </button>
          </li>
          <div className="flex justify-center items-center">
            {user.email ? (
              <div className="avatar me-3">
                <div className="w-4 h-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.email ? <img src={user.image} /> : ""}
                </div>
              </div>
            ) : (
              ""
            )}
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
          </div>
        </ul>
      </nav>
      <WishListProduct wishListProduct={wishListProduct}></WishListProduct>
    </div>
  );
}
