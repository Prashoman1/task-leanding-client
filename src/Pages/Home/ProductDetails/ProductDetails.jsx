import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/product/${id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);
  return (
    <div className="px-5 lg:px-24 py-8">
      <div className="card w-full h-full lg:card-side bg-base-100 shadow-xl">
        <div className="relative">
          <figure className="w-full h-full">
            <img
              className="w-full h-60"
              src={product.productImage}
              alt="Shoes"
            />
          </figure>
          {product.pertange ? (
            <div className="badge badge-secondary absolute top-2 right-1">
              -{product.pertange}%
            </div>
          ) : (
            ""
          )}
          {product.productQuentity ? (
            ""
          ) : (
            <div className="badge badge-primary absolute top-2 left-1">
              Stock Out
            </div>
          )}
        </div>
        <div className="card-body flex-col justify-between">
          <div className="space-y-5">
            <h2 className="card-title">{product.productName}</h2>
            <div>
              <p className="text-xl font-semibold">Author: {product.email}</p>
            </div>

            <div className="flex justify-center items-center">
              <p>Stock: {product.productQuentity}</p>
              {product.discountPrice ? (
                <p>
                  Price: ৳ <del>{product.productPrice}</del> {product.newPrice}
                </p>
              ) : (
                <p>Price: {product.newPrice}</p>
              )}
            </div>
            <div>
              <h1>Product Details:</h1>
              <p>{product.productDescription}</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button
              disabled={product.productQuentity === 0}
              className="btn btn-sm btn-primary"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
