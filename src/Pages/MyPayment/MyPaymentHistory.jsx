import React, { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../Providers/Provider";
import axios from "axios";
import moment from 'moment';

export default function MyPaymentHistory() {
  const { user } = useContext(ContextProvider);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/myOrder/${user?.email}`).then((res) => {
      //console.log(res.data);
      setPaymentHistory(res.data);
    });
  }, []);
  return (
    <div className="py-9 px-5 lg:px-24">
      <div>
        {paymentHistory.map((item) => (
          <div className="my-6 py-4  bg-base-100 shadow-xl border border-gray-100">
            <div className="lg:flex justify-between items-center lg:px-9">
              <div>
                {item?.product.map((pro) => (
                  <>
                    <div key={pro._id} className="lg:flex justify-start items-center">
                      <figure className="my-3">
                        <img
                          className="w-36 h-20"
                          src={pro.productImage}
                          alt="Movie"
                        />
                      </figure>
                      <div className="ms-2">
                        <h2>{pro.productName}</h2>
                        <h1>Quentity:{pro.productQuentity}</h1>
                        <h2>totalPrice:{pro.productQuentity * pro.newPrice}</h2>
                       
                      </div>
                    </div>
                  </>
                ))}
              </div>

              <div>
                <h1>Total Payment : {item.totalPrice}</h1>
                <h1>
                  Payment Status :
                  <div className="badge badge-primary ms-2">
                    {item.paymentStatus}
                  </div>
                </h1>
                <h2>Date : {moment(item.date).format("MMM Do YY")}</h2>
              </div>
              <div>
                <button className="btn btn-sm btn-success">
                  Invoice Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
