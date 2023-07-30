import React, { useContext } from 'react'
import { ContextProvider } from '../Providers/Provider'
import { Navigate } from 'react-router-dom';
import Loading from '../Pages/Home/Loading/Loading';

export default function PrivateRoute({children}) {
    const {user,loading} = useContext(ContextProvider)
    console.log(user);
    if(loading){
        return <Loading></Loading>
    }
    if(user.email){
        return children;
    }
    return <Navigate to="/login" replace={true}></Navigate>
  
}
