import React, { useContext } from 'react'
import { Link, NavLink, redirect } from 'react-router-dom'
import { ContextProvider } from '../../../Providers/Provider'
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const {user,setRefetch} = useContext(ContextProvider);
  console.log(user);
  const navigate = useNavigate();

  const handleLogOut = ()=>{
    localStorage.removeItem("user");
    setRefetch(pre=>!pre)
    navigate("/login");
  }

    const items =
        <>
        <li><NavLink to="/">Home</NavLink></li>
        {
          user.email ?<><li><NavLink to="/my-product">My Product</NavLink></li> <li><NavLink to="/my-profile">My Profile</NavLink></li></>:''
        }
        

      </>
    
  return (
    <div className="navbar bg-base-300 px-3 lg:px-24">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {items}
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost normal-case text-xl">Demu</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {items}
    </ul>
  </div>
  <div className="navbar-end">
  {
    user.email ? <div className="avatar me-3">
    <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      {
        user.email ? <img src={user.image} /> : ''
      }
  
      
    </div>
  </div> : ''
  }
  </div>
  {
          user.email ? <button onClick={handleLogOut} className='btn btn-sm btn-info'>LogOut</button> :<li>
          <NavLink className="btn btn-sm btn-success" to="/login">Login</NavLink>
      </li>
        }
</div>
  )
}
