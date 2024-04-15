import React, { useContext } from "react";
import { ContextProvider } from "../Providers/Provider";
import "./custom.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function () {
  const { user, setCartRefetch, wishListProduct, setWishListRefetch } =
    useContext(ContextProvider);
  //console.log("data", wishListProduct);

  const handleClose = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close();
  };

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/deleteWishList/${id}`).then((res) => {
      //console.log(res.data);
      if (res.data.deletedCount > 0) {
        setWishListRefetch((prevWishListRefetch) => !prevWishListRefetch);
        //toast.success("WishList Deleted");
      }
    });
  };
  const handleCart = (product) => {
    const id = product._id;

    let shoppingCart = {};

    //get the shopping cart from local storage
    const storedCart = localStorage.getItem("shopping-cart");
    if (storedCart) {
      shoppingCart = JSON.parse(storedCart);
    }
    const quantity = shoppingCart[id];
    if (!quantity) {
      shoppingCart[id] = 1;
    } else {
      const newQuantity = quantity + 1;
      shoppingCart[id] = newQuantity;
    }
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
    toast.success("Product Added to cart");
    setCartRefetch((prevCartRefetch) => !prevCartRefetch);
  };
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box  min-w-[900px]">
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={handleClose} className="btn btn-sm btn-success">
              Close
            </button>
          </div>
          <div>
            {wishListProduct.length > 0 ? (
              <>
                {wishListProduct.map((item) => {
                  return (
                    <div className="flex justify-between items-center shadow-xl border border-gray-light mt-4 p-3">
                      <div>
                        <img
                          className="w-24 h-16"
                          src={item.productImage}
                          alt=""
                        />
                      </div>
                      <div>
                        <h1>{item.productName}</h1>
                        <h2>{item.productCategory}</h2>
                      </div>
                      <div>
                        <h2>${item.newPrice}</h2>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCart(item)}
                          className="btn btn-sm btn-success"
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm btn-error"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className="w-96 h-96"
                    src="https://i.ibb.co/dgS3mjV/2953962.jpg"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
