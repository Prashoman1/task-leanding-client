import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const ContextProvider = createContext(null);

export default function Provider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(true);
  const [refetch, setRefetch] = useState(true);
  const [cartRefetch, setCartRefetch] = useState(true);

  const [cartLength, setCartLength] = useState(0);

  const [searchProduct, setSearchProduct] = useState("");
  const [searchProductData, setSearchProductData] = useState([]);
  const [searchRefech, setSearchRefetch] = useState(true);
  const [wishList, setWishList] = useState([]);
  const [wishListRefetch, setWishListRefetch] = useState(true);
  const [wishListProduct, setWishListProduct] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (userId) {
      fetch(`http://localhost:5000/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUser(data);
          setRefetch(true);
          setloading(false);
        });
    } else {
      setUser("");
      setloading(true);
    }
  }, [refetch]);

  useEffect(() => {
    if (searchProduct.length >= 3) {
      axios
        .get(`http://localhost:5000/getProduct/${searchProduct}`)
        .then((res) => {
          //console.log(res.data);
          if (Array.isArray(res.data)) {
            setSearchProductData(res.data);
          } else {
            setSearchProductData(res.data);
          }
        })
        .catch((error) => {
          console.error("API Request Error:", error); // Debugging
          setSearchProductData([]); // Handle error condition
        });
    } else {
      setSearchProductData([]);
    }
  }, [searchRefech]);

  useEffect(() => {
    const productCart = localStorage.getItem("shopping-cart");
    let count = 0;
    if (productCart) {
      const cartProduct = JSON.parse(productCart);
      for (const key in cartProduct) {
        //console.log("cart", cartProduct[key]);
        count = count + cartProduct[key];
      }
      //console.log("COunt", count);
    }
    setCartLength(count);
  }, [cartRefetch]);

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/wishList/${user?.email}`).then((res) => {
  //     console.log("wishlist", res.data);
  //     setWishList(res.data);
  //     localStorage.setItem("wishList", JSON.stringify(res.data.length));
  //   });
  // }, [user?.email, wishListRefetch]);

  //wishList data
  useEffect(() => {
    axios.get(`http://localhost:5000/wishList/${user?.email}`).then((res) => {
      //console.log("wishlist", res.data);
      setWishList(res?.data?.result);
      setWishListProduct(res?.data?.productAll);
    });
  }, [user?.email, wishListRefetch]);

  const userInfo = {
    user,
    setUser,
    setRefetch,
    loading,
    setloading,
    cartLength,
    searchRefech,
    setCartRefetch,
    setSearchProduct,
    setSearchRefetch,
    searchProductData,
    wishList,
    setWishList,
    wishListRefetch,
    setWishListRefetch,
    wishListProduct,
    setloading,
  };

  return (
    <ContextProvider.Provider value={userInfo}>
      {children}
    </ContextProvider.Provider>
  );
}
