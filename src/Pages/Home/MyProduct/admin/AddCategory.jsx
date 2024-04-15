import React, { useEffect, useState } from "react";
import InsertCategory from "../../../../utilies/InsertCategory";
import axios from "axios";

export default function AddCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => setCategory(res.data));
  }, []);

  return (
    <div className="w-full h-full px-4 py-9">
      <div className="text-center">
        <h2 className="text-2xl font-sans font-bold">All Category</h2>
      </div>

      <div>
        <button
          onClick={() => window.my_modal_5.showModal()}
          className="btn btn-sm btn-success"
        >
          add Category
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>CategoryName</th>
              <th>CategoryImage</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {category.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.categoryName}</td>
                <td>
                  <img className="h-6 w-10" src={item.categoryImage} alt="" />
                </td>

                <th>
                  <button className="btn btn-sm btn-success">Edit</button>
                  <button className="ms-2 btn btn-sm btn-error">delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <InsertCategory></InsertCategory>
      </div>
    </div>
  );
}
