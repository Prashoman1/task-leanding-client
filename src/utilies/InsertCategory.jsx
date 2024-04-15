import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function InsertCategory() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;

  const handleClose = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close();
  };

  const handleAddCategory = (data) => {
    //console.log(data);

    const formData = new FormData();
    formData.append("image", data.categoryPhoto[0]);
    fetch(hostUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          console.log(imgUrl);

          const { categoryName } = data;

          const categoryInfo = {
            categoryName,
            categoryImage: imgUrl,
          };
          //console.log(categoryInfo);
          // const insertCategory = {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(categoryInfo),
          // };

          axios
            .post("http://localhost:5000/addCategory", categoryInfo)
            .then((res) => {
              console.log(res);
              if (res.data.insertedId) {
                alert("Category Added Successfully");
                reset();
                handleClose();
              }
            });
        }
      });
  };

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_5.showModal()}>
        open modal
      </button> */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div method="dialog" className="modal-box">
          <div className="modal-action text-right">
            <button onClick={handleClose} className="btn btn-sm btn-info">
              Close
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-sans font-bold">Add an Category</h1>
          </div>
          <form onSubmit={handleSubmit(handleAddCategory)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Category Name:</span>
              </label>
              <input
                type="text"
                name="categoryName"
                {...register("categoryName", {
                  required: "category-name is required",
                })}
                placeholder="Type here"
                className="input !h-9 input-bordered w-full"
              />
            </div>
            <div className="from-control w-full">
              <label className="label">
                <span className="label-text">Category Photo</span>
              </label>
              <input
                type="file"
                name="categoryPhoto"
                {...register("categoryPhoto", {
                  required: "category-photo is required",
                })}
                className="file-input file-input-bordered file-input-xs w-full max-w-xs"
              />
            </div>
            <div className="my-3">
              <button type="submit" className="btn btn-sm btn-success">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
