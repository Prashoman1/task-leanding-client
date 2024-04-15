import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../../../Providers/Provider";
import { toast } from "react-toastify";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

export default function AllProduct() {
  const {
    user,
    setCartRefetch,
    searchProductData,
    searchRefech,
    wishList,
    setWishListRefetch,
    setWishList,
    wishListRefetch,
  } = useContext(ContextProvider);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState("All");
  //const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();

  //console.log("user all data", searchProductData);
  useEffect(() => {
    if (searchProductData.length > 0) {
      setProducts(searchProductData);
    } else if (typeof searchProductData === "string") {
      setProducts([]);
    } else {
      axios.get("http://localhost:5000/products").then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      });
    }

    axios.get("http://localhost:5000/categories").then((res) => {
      //console.log(res.data);
      setCategories(res.data);
    });
  }, [searchProductData]);

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

    // axios.post("http://localhost:5000/addCart", cartProduct).then((res) => {
    //   console.log(res.data);
    //   if (res.data.insertedId) {
    //
    //     alert("Product Added to cart");
    //   }
    // });
  };

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/wishList/${user?.email}`).then((res) => {
  //     console.log("wishlist", res.data);
  //     setWishList(res.data);
  //   });
  // }, [user?.email, wishListRefetch]);

  const handleFilter = (categoryName) => {
    if (categoryName === "All") {
      axios.get("http://localhost:5000/products").then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      });
    } else {
      axios
        .get(`http://localhost:5000/category/${categoryName}`)
        .then((res) => {
          //console.log(res.data);
          setProducts(res.data);
        });
    }
    setActive(categoryName);
  };

  // console.log("products", products);

  //wishList

  const handleAddWishList = (id) => {
    if (!user._id) {
      toast.error("Please Login First");
      navigate("/login", { replace: true });
      return;
    }
    const wishListInfo = {
      userId: user?._id,
      userEmail: user?.email,
      productId: id,
    };
    console.log(wishListInfo);

    axios
      .post("http://localhost:5000/addWishList", wishListInfo)
      .then((res) => {
        //console.log(res.data);
        if (res.data.insertedId) {
          setWishListRefetch((prevWishListRefetch) => !prevWishListRefetch);
          toast.success("Product Added to wishList");
        }
      });
  };

  const handleDeleteWishList = (id) => {
    console.log(id);
    axios.delete(`http://localhost:5000/deleteWishList/${id}`).then((res) => {
      //console.log(res.data);
      if (res.data.deletedCount > 0) {
        setWishListRefetch((prevWishListRefetch) => !prevWishListRefetch);
        //toast.success("WishList Deleted");
      }
    });
  };

  return (
    <div className="px-6 lg:px-24 py-7">
      <div className="text-center my-9">
        <h1 className="text-3xl font-sans font-bold">Our All Products</h1>
      </div>
      <div className=" space-x-3  space-y-2 md:flex lg:flex relative justify-center items-center  pb-8">
        <button
          onClick={() => handleFilter("All")}
          className={`${
            active === "All"
              ? "mt-2 btn btn-sm btn-primary"
              : "mt-2 btn btn-sm btn-outline btn-primary"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            onClick={() => handleFilter(category.categoryName)}
            key={category._id}
            className={`${
              active === category.categoryName
                ? "mt-2 btn btn-sm btn-primary"
                : "mt-2 btn btn-sm btn-outline btn-primary"
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(products) ? (
          <>
            {products?.map((product) => (
              <div
                key={product._id}
                className="card card-compact sm:h-full lg:h-[410px] xl:h-[500px]  w-100 bg-base-100 shadow-xl"
              >
                <div className="relative">
                  <figure>
                    <img
                      className=" h-52 lg:h-60 w-full transition duration-300 ease-in-out hover:scale-110"
                      src={product.productImage}
                      alt="Shoes"
                    />
                  </figure>
                  {product.pertange ? (
                    <div className="badge sm:badge-sm badge-secondary absolute top-2 right-1">
                      -{product.pertange}% Off
                    </div>
                  ) : (
                    ""
                  )}
                  {product.productQuentity ? (
                    ""
                  ) : (
                    <div className="badge badge-primary absolute top-2 left-1">
                      Stock Out
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    {wishList?.some(
                      (wish) => wish.productId === product._id
                    ) ? (
                      <button onClick={() => handleDeleteWishList(product._id)}>
                        <HiHeart className="text-[#FF0000] text-2xl" />
                      </button>
                    ) : (
                      <button onClick={() => handleAddWishList(product._id)}>
                        <HiOutlineHeart className="text-2xl"></HiOutlineHeart>
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <h2 className="card-title">{product.productName}</h2>
                  <div className="md:flex flex-row lg:flex !justify-between items-center">
                    <div className="badge sm:badge-sm badge-primary cursor-pointer">
                      {product.productCategory}
                    </div>
                    <p className="lg:ms-2">
                      Quentity: {product.productQuentity}
                    </p>
                    {product.discountPrice ? (
                      <p>
                        Price: ৳ <del>{product.productPrice}</del>{" "}
                        {product.newPrice}
                      </p>
                    ) : (
                      <p>Price: {product.newPrice}</p>
                    )}
                  </div>
                  <div className="card-actions lg:absolute lg:bottom-4 lg:left-17 justify-between">
                    <button
                      onClick={() => handleCart(product)}
                      disabled={product.productQuentity === 0}
                      className="btn btn-sm btn-info"
                    >
                      Add To Cart
                    </button>
                    <Link
                      to={`${
                        user?.email ? `product/${product._id}` : "/login"
                      }`}
                    >
                      <button className="btn btn-sm btn-success">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-center text-2xl  font-bold">
                No Product Found
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
