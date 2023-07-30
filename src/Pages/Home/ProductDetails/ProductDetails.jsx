import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/product/${id}`)
        .then(res=>{
            console.log(res.data);
            setProduct(res.data);
        })
    },[])
  return (
    <div className="px-5 lg:px-24 py-8">
      <div className="card w-full h-full lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
          className="w-full h-60"
            src={product.productImage}
            alt="Album"
          />
        </figure>
        <div className="card-body flex-col justify-between">
         <div className="space-y-5">
         <h2 className="card-title">{product.productName}</h2>
          <div>
            <p className="text-xl font-semibold">Author: {product.email}</p>
          </div>
          
          <div className="flex justify-center items-center">
            <p>Quentity: {product.productQuentity}</p>
            <p>Price: {product.productPrice}</p>
          </div>
          <div>
            <h1>Product Details:</h1>
            <p>{product.productDescription}</p>
          </div>
         </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}
