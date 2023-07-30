import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Home/Login/Login";
import SingUp from "../Pages/Home/SingUp/SingUp";
import Home from "../Pages/Home/Home";
import MyProduct from "../Pages/Home/MyProduct/MyProduct";
import InsertProduct from "../Pages/Home/MyProduct/InsertProduct";
import UpdateProduct from "../Pages/Home/MyProduct/UpdateProduct";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Pages/Home/MyProfile/MyProfile";
import ProductDetails from "../Pages/Home/ProductDetails/ProductDetails";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <SingUp></SingUp>,
      },
      {
        path: "/my-product",
        element: (
          <PrivateRoute>
            <MyProduct></MyProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
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
        path: "/add-product",
        element: <InsertProduct></InsertProduct>,
      },
      {
        path: "/product-update/:id",
        element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>,
      },
    ],
  },
]);

export default router;
