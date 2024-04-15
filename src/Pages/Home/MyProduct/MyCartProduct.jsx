import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ContextProvider } from "../../../Providers/Provider";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentInfo from "../../../utilies/PaymentInfo";

export default function MyCartProduct() {
  const { user, setCartRefetch,cartRefetch } = useContext(ContextProvider);
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [singleProducts, setSingleProducts] = useState({});
  const [localCart, setLocalCart] = useState(false);

  // const allPrice = selectCart.reduce(
  //   (total, item) => total + item.productPrice,
  //   0
  // );

  // const handleRemoveCart = (product) => {
  //   console.log(product);

  //   axios.delete(`http://localhost:5000/cart/${product._id}`).then((res) => {
  //     //console.log(res.data);
  //     if (res.data.deletedCount) {
  //
  //       alert("Product Removed");
  //     }
  //   });
  // };

  // const handleCheckOut = () => {
  //   const userId = localStorage.getItem("user");
  //   const checkOut = {
  //     userId,
  //     userEmail: user?.email,
  //     product: selectCart,
  //     totalPrice: allPrice,
  //   };
  //   console.log(checkOut);
  //   axios.post("http://localhost:5000/addCheckout", checkOut).then((res) => {
  //     console.log(res.data);
  //     if (
  //       res.data.result.insertedId &&
  //       res.data.result1.deletedCount > 0 &&
  //       res.data.result2.modifiedCount > 0
  //     ) {
  //       alert("Order Placed");
  //       navigate("/success");
  //     }
  //   });
  // };

  // const handlePlus = () => {

  //   setCount(count + 1);
  // };

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      console.log(res.data);
      setAllProduct(res.data);
    });
  }, []);

  useEffect(() => {
    const productCart = localStorage.getItem("shopping-cart");
    if (productCart) {
      const cartProduct = JSON.parse(productCart);
      let cartedProduct = [];
      for (const property in cartProduct) {
        //console.log(`${property}: ${cartProduct[property]}`);
        const findProduct = allProduct.find((item) => item._id === property);
        if (findProduct) {
          findProduct.productQuentity = cartProduct[property];
          cartedProduct.push(findProduct);
        }
        if (cartedProduct.length > 0) {
          setProduct(cartedProduct);
        }
      }

      // let arr = Object.keys(cartProduct);
      // for (let i = 0; i < arr.length; i++) {
      //
      //   // if(findProduct){
      //   //   findProduct.productQuentity =
      //   // }
      //   cartedProduct.push(findProduct);
      //   //console.log("find", arr[i]);
      // }

      // if (cartedProduct.length > 0) {
      //   setProduct(cartedProduct);
      // }
    } else {
      setProduct([]);
      setCartRefetch((prevCartRefetch) => !prevCartRefetch);
    }
  }, [allProduct, localCart,cartRefetch]);

  const handleRemoveCart = (product) => {
    //console.log(product);
    const productCart = localStorage.getItem("shopping-cart");

    if (productCart) {
      console.log(productCart);
      const cartProduct = JSON.parse(productCart);
      const arr = Object.keys(cartProduct);
      const findId = arr.find((item) => item === product._id);
      delete cartProduct[findId];
      console.log(cartProduct);
      localStorage.removeItem("shopping-cart");
      localStorage.setItem("shopping-cart", JSON.stringify(cartProduct));
      setCartRefetch((prevCartRefetch) => !prevCartRefetch);

      setLocalCart(!localCart);

      if (Object.keys(cartProduct).length === 0) {
        localStorage.removeItem("shopping-cart");
        setCartRefetch((prevCartRefetch) => !prevCartRefetch);
        setLocalCart(!localCart);
      }
    } else {
      localStorage.removeItem("shopping-cart");
      setCartRefetch((prevCartRefetch) => !prevCartRefetch);
      setLocalCart(!localCart);
    }
  };

  //console.log("product", product);

  let totalProductPrice = 0;
  for (const arr of product) {
    totalProductPrice += arr.newPrice * arr.productQuentity;
  }

  const handleCheckOut = () => {
    if (!user?.email) {
      alert("Please Login First");
      navigate("/login", { state: location.pathname });
      return;
    }
    window.my_modal_2.showModal();
  };

  ///item plus handelers

  const handlePlus = (id) => {
    axios.get(`http://localhost:5000/product/${id}`).then((res) => {
      setSingleProducts(res.data);
      const productCart = localStorage.getItem("shopping-cart");
      if (productCart) {
        const cartProduct = JSON.parse(productCart);
        const arr = Object.keys(cartProduct);
        const findId = arr.find((item) => item === id);
        cartProduct[findId] = cartProduct[findId] + 1;

        console.log("product", res.data.productQuentity);
        console.log("cart", cartProduct[findId]);
        if (res.data.productQuentity < cartProduct[findId]) {
          alert("Product Out of Stock");
          return;
        }
        localStorage.removeItem("shopping-cart");
        localStorage.setItem("shopping-cart", JSON.stringify(cartProduct));
        setCartRefetch((prevCartRefetch) => !prevCartRefetch);
        setLocalCart(!localCart);
      }
    });
    console.log(id);
  };

  const handleMinus = (id) => {
    const productCart = localStorage.getItem("shopping-cart");
    if (productCart) {
      const cartProduct = JSON.parse(productCart);
      const arr = Object.keys(cartProduct);
      const findId = arr.find((item) => item === id);
      if (cartProduct[findId] > 1) {
        cartProduct[findId] = cartProduct[findId] - 1;
        localStorage.removeItem("shopping-cart");
        localStorage.setItem("shopping-cart", JSON.stringify(cartProduct));
        setCartRefetch((prevCartRefetch) => !prevCartRefetch);
        setLocalCart(!localCart);
      } else {
        handleRemoveCart(id);
        setCartRefetch((prevCartRefetch) => !prevCartRefetch);
      }
    }
  };

  return (
    <div className="px-5 py-9 lg:px-24">
      <h1 className="text-3xl font-sans font-bold text-center">
        My Cart Product
      </h1>
      {product.length > 0 ? (
        <motion.div
        
        initial={{ opacity: 0, y: 100 }} // Initial state of the component
        animate={{ opacity: 1, y: 0 }}    // Animation state when it enters the screen
        exit={{ opacity: 0, y: 100 }}     // Animation state when it exits the screen
        transition={{ duration: 1 }}
        className="mt-3">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>SI</th>
                  <th>Product Name</th>
                  <th>ProductImage</th>
                  <th>ProductPrice</th>
                  <th>ProductQuentity</th>
                  <th>TotalProductPrice</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product?.map((product, index) => (
                  <tr key={product?._id}>
                    <th>{index + 1}</th>
                    <td>{product?.productName}</td>
                    <td>
                      <img
                        className="h-14 w-16"
                        src={product?.productImage}
                        alt=""
                      />
                    </td>
                    <td>${product?.newPrice}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleMinus(product?._id)}
                        className="text-xl font-bold bg-green-100 rounded-full px-1 ml-2"
                      >
                        -
                      </button>{" "}
                      <button>{product?.productQuentity}</button>
                      <button
                        onClick={() => handlePlus(product?._id)}
                        className="text-xl font-bold bg-green-100 rounded-full px-1 ms-2"
                      >
                        +
                      </button>
                    </td>
                    <td>{product.productQuentity * product.newPrice}</td>
                    <th>
                      <button
                        onClick={() => handleRemoveCart(product)}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <div className="py-4 space-y-3">
              <p className="text-2xl font-bold">
                Totol Price: ${totalProductPrice}
              </p>
              <button
                onClick={handleCheckOut}
                className="btn btn-sm btn-success"
              >
                CheckOut
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center">
          <img className="w-96 h-96" src="https://i.ibb.co/dgS3mjV/2953962.jpg" alt="" />
        </div>
      )}
      <PaymentInfo
        totalPrice={totalProductPrice}
        product={product}
      ></PaymentInfo>
    </div>
  );
}
