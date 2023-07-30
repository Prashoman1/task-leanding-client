import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";

export default function AllProduct() {
  const { user } = useContext(ContextProvider);
  const [products, setProducts] = useState([]);

  console.log("user", user.email);
  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);
  return (
    <div className="px-6 lg:px-24 py-7">
      <div className="text-center my-9">
        <h1 className="text-3xl font-sans font-bold">Our All Products</h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <div
            key={product._id}
            className="card card-compact flex-col justify-between w-100 bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="w-full h-60"
                src={product.productImage}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.productName}</h2>
              <div className="flex justify-center items-center">
                <p>Product Quentity: {product.productQuentity}</p>
                <p>Product Price: {product.productPrice}</p>
              </div>
              <div className="card-actions justify-end">
                <Link to={`${user.email ?`product/${product._id}` : '/login'}`}>
                  <button className="btn btn-sm btn-info">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
