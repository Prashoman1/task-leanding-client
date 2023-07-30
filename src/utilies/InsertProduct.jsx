import React, { useContext } from "react";
import { ContextProvider } from "../Providers/Provider";
import { useForm } from "react-hook-form";
import axios from "axios";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function InsertProduct({setRefetchProduct,refetchProducts,setProducts}) {
  const { user, setUser, setRefetch } = useContext(ContextProvider);

    //console.log(refetchProducts);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const modelClose = () =>{
    const modal = document.getElementById('my_modal_5');
    modal.close();
    
  }

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
                
                axios.get(`http://localhost:5000/products/${user?.email}`)
                .then(res=>{
                    setProducts(res.data)
                })
               // setRefetchProduct(prevRefetchProducts => !prevRefetchProducts);
                alert("Product Inserted");
                reset();
              }
            });
          console.log(productInfo);
        }
      });
  };
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        
        <form method="dialog" className="modal-box" onSubmit={handleSubmit(handleAddProduct)}>
        <div className="text-right">
          <button onClick={modelClose} className="btn btn-sm btn-info">Close</button>
          </div>
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

        
      </dialog>
    </div>
  );
}
