import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";
import Swal from "sweetalert2";
import InsertProduct from "../../../utilies/InsertProduct";
import UpdatedProduct from "../../../utilies/UpdatedProduct";

export default function MyProduct() {
  const { user } = useContext(ContextProvider);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [refetchProducts, setRefetchProducts] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${user?.email}`).then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });

    axios.get("http://localhost:5000/categories").then((res) => {
      console.log(res.data);
      setCategory(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/products/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            const remainingProducts = products.filter(
              (product) => product._id !== id
            );
            setProducts(remainingProducts);
          }
        });
      }
    });
    console.log(id);
  };

  const handleUpdatedModal = (product) => {
    setUpdatedProduct(product);
    window.my_modal_3.showModal();
  };

  return (
    <div className="w-full h-full py-5 px-4 ">
      <div className="py-5">
        <button
          onClick={() => window.my_modal_5.showModal()}
          className="btn btn-sm btn-primary"
        >
          Insert Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SI</th>
              <th>ProductName</th>
              <th>ProductImage</th>
              <th>ProductCategory</th>
              <th>RegularPrice</th>
              <th>DiscountPrice</th>
              <th>ProductQuentity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>

                <td>{product.productName}</td>
                <td>
                  <img
                    src={product.productImage}
                    alt="Shoes"
                    className="w-14 h-12"
                  />
                </td>
                <td>{product.productCategory}</td>
                <td>${product.productPrice}</td>
                <td>${product.discountPrice}</td>
                <td>{product.productQuentity}</td>
                <th>
                  <div className="flex justify-start gap-3 items-center">
                    <button
                      onClick={() => handleUpdatedModal(product)}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Delete
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
          <UpdatedProduct
           category={category}
            setProducts={setProducts}
            updatedProduct={updatedProduct}
          ></UpdatedProduct>
          <InsertProduct
            category={category}
            setProducts={setProducts}
            refetchProducts={refetchProducts}
            setRefetchProducts={setRefetchProducts}
          ></InsertProduct>
        </table>
      </div>
    </div>
  );
}
