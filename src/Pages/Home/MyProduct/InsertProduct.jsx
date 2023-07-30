import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ContextProvider } from "../../../Providers/Provider";
import axios from "axios";
import { Link } from "react-router-dom";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function InsertProduct() {
  const { user, setUser } = useContext(ContextProvider);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
  const handleAddProduct = (data) => {
    //console.log(data);
    const formData = new FormData();
    formData.append("image", data.productImage[0]);
    fetch(hostUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          //console.log(imgUrl);

          const {
            productName,
            productImage,
            productQuentity,
            productPrice,
            productDescription,
          } = data;
          const productInfo = {
            productName,
            productImage: imgUrl,
            productQuentity,
            productPrice,
            productDescription,
            email: user?.email,
          };
          axios
            .post("http://localhost:5000/addProduct", productInfo)
            .then((response) => {
              console.log(response);
              if (response.data.insertedId) {
                reset();
                alert("Product Inserted");
              }
            });
          console.log(productInfo);
        }
      });
  };
  return (
    <div className="py-8 px-6 lg:px-24">
      <div className="my-6">
        <h1 className="text-2xl font-sans text-center font-bold">
          Insert an Product
        </h1>
      </div>
      <div className="my-5">
        <Link to="/my-product" className="btn btn-sm btn-info">
          Back
        </Link>
      </div>
      <div className="shadow-2xl p-8 border-t-2 border-gray-100">
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product Name:</span>
            </label>
            <input
              type="text"
              name="productName"
              {...register("productName", { required: "name is required" })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          {errors.productName && (
            <p className="text-red-500">{errors.productName.message}</p>
          )}
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Product Quentity:</span>
            </label>
            <input
              type="number"
              {...register("productQuentity", {
                required: "Quentity is required",
              })}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          {errors.productQuentity && (
            <p className="text-red-500">{errors.productQuentity.message}</p>
          )}

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Image:</span>
            </label>
            <input
              type="file"
              {...register("productImage", { required: "Image is required" })}
              className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            />
          </div>
          {errors.productImage && (
            <p className="text-red-500">{errors.productImage.message}</p>
          )}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Price:</span>
            </label>
            <input
              type="number"
              {...register("productPrice", { required: "Price is required" })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              className="textarea   textarea-bordered h-24"
              {...register("productDescription", {
                required: "Description is required",
              })}
              placeholder="Bio"
            ></textarea>
          </div>

          <div className="my-4">
            <input type="submit" className="btn btn-primary" value="Add" />
          </div>
        </form>
      </div>
    </div>
  );
}
