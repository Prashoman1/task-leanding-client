import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextProvider } from "../Providers/Provider";
import axios from "axios";

export default function PaymentInfo({ product, totalPrice }) {
  const { user } = useContext(ContextProvider);
  //console.log(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleModalClose = () => {
    const modal = document.getElementById("my_modal_2");
    modal.close();
  };

  const handlePay = (data) => {
    const { address, userEmail, postCode, paymentOption } = data;
    const checkOut = {
      address,
      userName: user?.name || "unknown",
      userEmail,
      userPhone: user?.phone || "unknown",
      postCode,
      paymentOption,
      product,
      totalPrice,
      orderTime: new Date(),
      orderStatus: "pending",
    };
    console.log(checkOut);

    axios.post("http://localhost:5000/order", checkOut).then((res) => {
      console.log(res.data);
      localStorage.removeItem("shopping-cart");
      window.location.replace(res.data.url);
    });
  };
  return (
    <div className="w-ful h-full">
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button> */}

      <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box">
          <div className="modal-action text-right">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={handleModalClose}
              className="btn btn-sm btn-secondary"
            >
              Close
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-center">
              Please filUp Your Information
            </h1>
          </div>
          <form onSubmit={handleSubmit(handlePay)}>
            <div className="form-control">
              <label className="label !pb-1">
                <span className="label-text">Address:</span>
              </label>
              <input
                type="text"
                name="address"
                {...register("address", { required: "address is required" })}
                placeholder="Enter your address"
                className="input  !h-9 input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label !pb-1">
                <span className="label-text">Email*:</span>
              </label>
              <input
                type="text"
                name="userEmail"
                defaultValue={user.email}
                {...register("userEmail", { required: "address is required" })}
                className="input  !h-9 input-bordered"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label !pb-1">
                <span className="label-text">Post Code*:</span>
              </label>
              <input
                type="text"
                name="postCode"
                {...register("postCode", { required: "postCode is required" })}
                className="input  !h-9 input-bordered"
                placeholder="Enter your post code"
              />
            </div>
            <div className="form-control">
              <label className="label !pb-1">
                <span className="label-text">Currency*:</span>
              </label>
              <select
                className="input  !h-9 input-bordered"
                name="payment"
                id=""
                {...register("paymentOption", {
                  required: "address is required",
                })}
              >
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
                <option value="RMB">RMB</option>
                <option value="EURO">EURO</option>
              </select>
            </div>

            <div className="mt-3">
              <input
                type="submit"
                value="Pay"
                className="btn btn-sm btn-primary"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
