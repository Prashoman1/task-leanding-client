import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function AllOrder() {
  const [order, setOrder] = useState([]);
  const [active, setActive] = useState("all");
  useEffect(() => {
    axios.get(`http://localhost:5000/allOrder`).then((res) => {
      console.log(res.data);
      setOrder(res.data);
    });
  }, []);

  const handleDelivery = (id) => {
    axios.patch(`http://localhost:5000/updateOrder/${id}`).then((res) => {
      //console.log(res.data);
      if (res.data) {
        alert("Order Delivery Successfully");
        axios.get(`http://localhost:5000/allOrder`).then((res) => {
          //console.log(res.data);
          setOrder(res.data);
        });
      }
    });
  };

  const handleAll = () => {
    axios.get(`http://localhost:5000/allOrder`).then((res) => {
      //console.log(res.data);
      setActive("all");
      setOrder(res.data);
    });
  };

  const handleDeliver = () => {
    axios.get("http://localhost:5000/deliverdOrder").then((res) => {
      //console.log(res.data);
      setActive("delivery");
      setOrder(res.data);
    });
  };

  const handlePanding = () => {
    axios.get("http://localhost:5000/pandingOrder").then((res) => {
      //console.log(res.data);
      setActive("pending");
      setOrder(res.data);
    });
  };

  const handleConfirm = (id) => {
    axios.post(`http://localhost:5000/updateOrder/${id}`)
    .then((res) => {
      if(res.data.info.id && res.data.result2.modifiedCount>0){
        alert("Order Confirmed Successfully");
        axios.get(`http://localhost:5000/allOrder`).then((res) => {
          //console.log(res.data);
          setOrder(res.data);
        });
      }
    })
  };

  return (
    <div className="w-full h-full px-2">
      <div className="text-center my-4">
        <h1 className="text-2xl font-sans font-bold">All Orders</h1>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleAll}
          className={`${
            active === "all"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-outline btn-success"
          }`}
        >
          All
        </button>
        <button
          onClick={handleDeliver}
          className={`${
            active === "delivery"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-outline btn-success"
          }`}
        >
          Delivery
        </button>
        <button
          onClick={handlePanding}
          className={`${
            active === "pending"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-outline btn-success"
          }`}
        >
          Pending
         </button>
        {/* <button
          onClick={handlePanding}
          className={`${
            active === "pending"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-outline btn-success"
          }`}
        >
          Confirm
        </button>
        <button
          onClick={handlePanding}
          className={`${
            active === "pending"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-outline btn-success"
          }`}
        >
          UnConfirm
        </button>  */}
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SI</th>
                <th>userName</th>
                <th>userEmail</th>
                <th>userPhone</th>
                <th>Address</th>
                <th>PostCode</th>
                <th>TotalPrice</th>
                <th>date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item?.userName}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.address}</td>
                  <td>{item?.postCode}</td>
                  <td>{item?.totalPrice}</td>
                  <td>{moment(item.date).add(0, "days").calendar()}</td>
                  <td className="flex gap-3">
                    <button
                    disabled={item.paymentStatus === "delivered"}
                      onClick={() => handleDelivery(item._id)}
                      className="btn btn-sm btn-success"
                    >
                      {item.paymentStatus}
                    </button>
                    <button
                      onClick={() => handleConfirm(item._id)}
                      disabled={item.consfirmationStatus === "confirmed"}
                      className="btn btn-sm btn-secondary"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
