import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ContextProvider } from "../Providers/Provider";
import { HiOutlineViewGrid } from "react-icons/hi";

export default function Dashboard() {
  const { user } = useContext(ContextProvider);
  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer Toggle */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>

        {/* Mobile Drawer Button */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>

      {/* Side Drawer */}
      <div className="drawer-side lg:drawer-side-open  bg-gray">
        {/* Drawer Header */}
        <h1 className="text-2xl text-center font-semibold">Welcome Admin</h1>
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        {/* Sidebar Content */}
        <ul className="menu p-4 w-80 h-full text-white">
          {/* Sidebar content here */}
          {user.role === "admin" ? (
            <>
              <li>
                <NavLink
                  className="btn btn-sm btn-outline"
                  to="/dashboard/add-product"
                >
                  Add-Product
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink
                  className="btn btn-sm btn-outline"
                  to="/dashboard/all-orders"
                >
                  All-Orders
                </NavLink>
              </li>
              <li className="my-2">
                <NavLink
                  className="btn btn-sm btn-outline"
                  to="/dashboard/all-category"
                >
                  <HiOutlineViewGrid className="w-8 h-auto" />
                  All Category
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="btn btn-sm btn-outline" to={"/my-order"}>
                  My Order
                </NavLink>
              </li>
            </>
          )}
          <li className="mt-2">
            <NavLink className="btn btn-sm btn-outline" to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
