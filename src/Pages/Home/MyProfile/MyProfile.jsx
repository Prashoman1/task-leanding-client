import React, { useContext, useState } from "react";
import { ContextProvider } from "../../../Providers/Provider";
import axios from "axios";

const imgHostKey = "256b673c9efeb9c3ff7d892a8f3857fe";
export default function MyProfile() {
  const { user, setRefetch } = useContext(ContextProvider);
  const [image, setImage] = useState(null);

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
                  setRefetch(prev => !prev);
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

  return (
    <div className="py-9">
      <div className="my-8">
        <h1 className="text-3xl text-center font-sans font-bold">My Profile</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="card w-1/2 border border-gray-300 bg-base-100 shadow-md py-5">
          <div className="text-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.image} />
              </div>
            </div>
            <div>
              <h1 className="font-semibold  text-3xl ">{user?.name}</h1>
            </div>
          </div>
          <div className="card-body shadow-md mx-auto">
            <form onSubmit={handleUpdate}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">My Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user?.name}
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">My Email:</span>
                </label>
                <input
                  type="email"
                  name="email"
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
              </div>
              <div className="card-actions justify-end mt-4">
                <button type="submit" className="btn btn-sm btn-primary">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
