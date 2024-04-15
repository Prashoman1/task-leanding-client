import React from "react";
import Home from "../Pages/Home/Home";
import Navbar from "../Pages/Home/Navbar/Navbar";
import Footer from "../Pages/Home/Footer/Footer";
import { Outlet } from "react-router-dom";
import UperrNav from "../Pages/Home/Navbar/UperrNav";

export default function Main() {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-40">
        <div className="hidden lg:block ">
          <UperrNav></UperrNav>
        </div> 
        <Navbar></Navbar>
      </div>

      <div className="mt-[49px] lg:mt-[120px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
