import React from "react";
import { Link, useParams } from "react-router-dom";

export default function Successfullpage() {
  const { id } = useParams();
  //console.log(transaction);
  return (
    <div className="flex justify-center">
      <div className="px-24 py-5">
        <Link to="/" className="btn btn-sm btn-success">
          GO to Home
        </Link>
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <img src="https://i.ibb.co/jbvwVdB/images-2.png" alt="" />
            <h1 className="text-3xl text-green-500">Your payment was successful</h1>
            <h1>Your Transaction id: <span className="text-green-500">{id}</span></h1>
            <p>
              We received your purchase request;
              <br /> we'll be in touch shortly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
