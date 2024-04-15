import axios from "axios";
import { parse } from "postcss";
import React, { useState } from "react";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function UpdatedProduct({
  updatedProduct,
  setProducts,
  category,
}) {
  console.log(updatedProduct);

  const [image, setImage] = useState("");
  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const productCategory = form.productCategory.value;
    const productQuentity = parseInt(form.productQuentity.value);
    const productImage = form.productImage.value;
    const productPrice = parseInt(form.productPrice.value);
    const productDescription = form.productDescription.value;
    const discountPrice = parseInt(form.discountPrice.value) || 0;

    const newPrice = parseInt(productPrice - discountPrice);
    const pertange = parseFloat(
      ((discountPrice / productPrice) * 100).toFixed(2)
    );

    // console.log(
    //   productName,
    //   productQuentity,
    //   productImage,
    //   productPrice,
    //   productDescription,
    //   discountPrice,
    //   newPrice,
    //   pertange
    // );
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      fetch(hostUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          if (imgResponse.success) {
            const imgUrl = imgResponse.data.display_url;
            const updatedProducts = {
              productName,
              productCategory,
              productImage: imgUrl,
              productQuentity,
              productPrice,
              discountPrice,
              productDescription,
              newPrice,
              pertange,
            };
            //console.log(updatedProducts);
            axios
              .patch(
                `http://localhost:5000/products/${updatedProduct?._id}`,
                updatedProducts
              )
              .then((res) => {
                //console.log(res.data);
                if (res.data.modifiedCount) {
                  axios
                    .get(
                      `http://localhost:5000/products/${updatedProduct?.email}`
                    )
                    .then((res) => {
                      //console.log(res.data);
                      setProducts(res.data);
                    });
                  alert("Product Updated");
                }
              });
          }
        });
    } else {
      const updatedProducts = {
        productName,
        productCategory,
        productQuentity,
        productPrice,
        discountPrice,
        productDescription,
        newPrice,
        pertange,
      };
      axios
        .patch(
          `http://localhost:5000/products/${updatedProduct?._id}`,
          updatedProducts
        )
        .then((res) => {
          //console.log(res.data);
          if (res.data.modifiedCount) {
            axios
              .get(`http://localhost:5000/products/${updatedProduct?.email}`)
              .then((res) => {
                //console.log(res.data);
                setProducts(res.data);
              });
            alert("Product Updated");
          }
        });
    }
  };

  const modelClose = () => {
    const modal = document.getElementById("my_modal_3");
    modal.close();
  };
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => }>
        open modal
      </button> */}
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box">
          <div className="modal-action text-right">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={modelClose} className="btn btn-sm btn-secondary">
              Close
            </button>
          </div>
          <h1 className="text-2xl font-bold text-center">Update Product</h1>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Product Name:</span>
              </label>
              <input
                type="text"
                name="productName"
                defaultValue={updatedProduct?.productName}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Product Quentity:</span>
              </label>
              <input
                type="number"
                name="productQuentity"
                defaultValue={updatedProduct?.productQuentity}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Image:</span>
              </label>
              <img
                className="w-16 h-12"
                src={updatedProduct?.productImage}
                alt=""
              />
              <input
                type="file"
                onChange={handleImage}
                name="productImage"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Selected Category:</span>
              </label>
              <select
                defaultValue={updatedProduct?.productCategory}
                name="productCategory"
                className="input !h-9 input-bordered w-full"
              >
                {/* <option value={updatedProduct?.productCategory}>
                  {updatedProduct?.productCategory}
                </option> */}
                {category.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Regular Price:</span>
              </label>
              <input
                type="number"
                name="productPrice"
                defaultValue={updatedProduct?.productPrice}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Discount Price:</span>
              </label>
              <input
                type="number"
                name="discountPrice"
                defaultValue={updatedProduct?.discountPrice}
                placeholder="Type here"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                name="productDescription"
                className="textarea  textarea-bordered h-24"
                defaultValue={updatedProduct?.productDescription}
                placeholder="Bio"
              ></textarea>
            </div>

            <div className="my-4">
              <input
                type="submit"
                className="btn btn-sm btn-primary"
                value="Update"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
