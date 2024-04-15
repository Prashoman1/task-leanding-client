import React, { useContext, useState } from "react";
import { ContextProvider } from "../../../Providers/Provider";
import axios from "axios";
import ChangeUserInfo from "../../../utilies/ChangeUserInfo";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function MyProfile() {
  const { user, setRefetch } = useContext(ContextProvider);
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const nPassword = form.nPassword.value;
    const phone = form.phone.value;

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
            const userInfo = {
              name,
              email,
              password,
              newPassword: nPassword,
              image: imgUrl,
              phone,
            };

            // const requestUser = {
            //     method: "PATCH",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(userInfo),
            // }
            axios
              .patch(`http://localhost:5000/users/${user?.email}`, userInfo)
              .then((res) => {
                console.log(res);
                if (res.data.modifiedCount) {
                  setRefetch((prev) => !prev);
                  alert("Profile Updated");
                }
              });
          }
        });
    } else {
      const userInfo = {
        name,
        email,
        password,
        newPassword: nPassword,
        phone,
      };

      // const requestUser = {
      //     method: "PATCH",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(userInfo),
      // }

      axios
        .patch(`http://localhost:5000/users/${user?.email}`, userInfo)
        .then((res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            setRefetch(false);
            alert("Profile Updated");
          }
        });
    }
  };

  const handleImageClick = () => {
    const file = document.getElementById("fileInput");
    if (file) {
      file.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // const handleImageClick = () => {
  //   // Trigger the click event of the file input
  //   const fileInput = document.getElementById("fileInput");
  //   if (fileInput) {
  //     fileInput.click();
  //   }
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // You can perform additional validation or processing here
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  console.log("image url", selectedImage);

  return (
    <div className="py-9">
      <div className="my-8">
        <h1 className="text-3xl text-center font-sans font-bold">My Profile</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="card w-1/2  bg-base-100 border border-gray-light shadow-2xl py-5">
          <div className="text-center">
            <div>
              <h1 className="font-semibold my-3 text-3xl uppercase">
                {user?.name}
              </h1>
            </div>
            <form>
              <div className="avatar" onClick={handleImageClick}>
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={selectedImage || user?.image} />
                </div>
              </div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input hidden file-input-bordered file-input-xs w-full max-w-[200px]"
                  onChange={handleImageChange}
                />
              </div>
              <div className="my-2">
                <button type="submit" className="btn btn-sm btn-success">
                  Update Photo
                </button>
              </div>
            </form>
            {/* <div>
                <div className="avatar" onClick={handleImageClick}>
                  <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={selectedImage || user?.image} alt="Avatar" />
                  </div>
                </div>
                <div>
                  <input
                    id="fileInput"
                    type="file"
                    className="file-input hidden file-input-bordered file-input-xs w-full max-w-[200px]"
                    onChange={handleImageChange}
                  />
                </div>
              </div> */}
          </div>
          <div className="card-body">
            <form>
              <div className="flex justify-between items-center gap-4">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">My Name:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.name}
                    readOnly
                    className="px-2 rounded-lg focus:outline-none border border-b-neutral-700 !h-9 w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">My Email:</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user?.email}
                    readOnly
                    className="px-2 rounded-lg focus:outline-none border border-b-neutral-700 !h-9 w-full max-w-xs"
                  />
                </div>
              </div>

              {/* <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">My Email:</span>
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">My Phone:</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={user?.phone}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Change Password:</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Old Password"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="my-3">
                <input
                  type="password"
                  name="nPassword"
                  placeholder="New Password"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">My Photo:</span>
                </label>
                <img className="w-14 h-12" src={user.image} alt="" />
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                />
              </div> */}
            </form>

            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => window.my_modal_1.showModal()}
                className="btn btn-sm btn-primary"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        <ChangeUserInfo></ChangeUserInfo>
      </div>
      
    </div>
  );
}
