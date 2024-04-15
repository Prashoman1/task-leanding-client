import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Home/Login/Login";
import SingUp from "../Pages/Home/SingUp/SingUp";
import Home from "../Pages/Home/Home";
import MyProduct from "../Pages/Home/MyProduct/MyProduct";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/Home/MyProfile/MyProfile";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";
import MyCartProduct from "../Pages/Home/MyProduct/MyCartProduct";
import Successfullpage from "../../src/SuccesfullPage/Successfullpage";
import Dashboard from "../Layouts/Dashboard";
import AdminSignUp from "../Pages/Home/SingUp/AdminSignUp";
import FailPayment from "../Pages/FailPayment/FailPayment";
import AdminRoute from "./AdminRoute";
import MyPaymentHistory from "../Pages/MyPayment/MyPaymentHistory";
import AllOrder from "../Pages/AllOrder/AllOrder";
import BothRoute from "./BothRoute";
import AddCategory from "../Pages/Home/MyProduct/admin/AddCategory";
import ForggetPassword from "../Pages/Home/Login/ForggetPassword";
import LinkForgetPassSentEmail from "../Pages/Home/Login/LinkForgetPassSentEmail";
import LinkForgetPass from "../Pages/Home/Login/LinkForgetPass";

const token = "2abcd";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/payment/success/:id",
        element: <Successfullpage></Successfullpage>,
      },
      {
        path: "/payment/fail/:id",
        element: <FailPayment></FailPayment>,
      },
      {
        path: "/my-payment-history",
        element: (
          <PrivateRoute>
            <MyPaymentHistory></MyPaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SingUp></SingUp>,
      },
      {
        path: "/forget-password",
        element: <ForggetPassword></ForggetPassword>,
      },
      {
        path: "/forgetPassword/:email/:token",
        element: <LinkForgetPassSentEmail></LinkForgetPassSentEmail>,
      },
      {
        path: "/forget-password-link",
        element: <LinkForgetPass></LinkForgetPass>,
      },
      // {
      //   path: "/my-product",
      //   element: (
      //     <PrivateRoute>
      //       <MyProduct></MyProduct>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/my-cart",
        element: <MyCartProduct></MyCartProduct>,
      },
      {
        path: "/my-profile",
        element: (
          <BothRoute>
            {" "}
            <MyProfile></MyProfile>
          </BothRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/register/:token",
        element: <AdminSignUp></AdminSignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/add-product",
        element: (
          <AdminRoute>
            <MyProduct></MyProduct>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-orders",
        element: (
          <AdminRoute>
            <AllOrder></AllOrder>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-category",
        element: (
          <AdminRoute>
            <AddCategory></AddCategory>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
