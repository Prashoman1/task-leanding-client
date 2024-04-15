import React from "react";

export default function FailPayment() {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title !text-red-500">Sorry</h2>
        <p className="text-red-400">Your payment is Failed</p>
      </div>
    </div>
  );
}
