import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'


const imgHostKey = '256b673c9efeb9c3ff7d892a8f3857fe';
export default function UpdateProduct() {
    const [product,setProduct] = useState({})
    const[image,setImage] = useState('');
    const hostUrl = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/product/${id}`)
        .then(res=>{
            console.log(res.data)
            setProduct(res.data);
        })
    },[])

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productQuentity = form.productQuentity.value;
        const productImage = form.productImage.value;
        const productPrice = form.productPrice.value;
        const productDescription = form.productDescription.value;
        console.log(productName,productQuentity,productImage,productPrice,productDescription);

        if(image){
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
                const updatedProduct = {
                    productName,productImage:imgUrl,productQuentity,productPrice,productDescription
                }
                console.log(updatedProduct);
                axios.patch(`http://localhost:5000/products/${id}`,updatedProduct)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.modifiedCount){
                        alert("Product Updated");
                    }
                })
                }
            })
        }else{
            const updatedProduct = {
                productName,productQuentity,productPrice,productDescription
            }
           axios.patch(`http://localhost:5000/products/${id}`,updatedProduct)
           .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount){
                alert("Product Updated");
            }
           })
        }
    }
  return (
    <div className='py-8 px-4 lg:px-24'>
        <div className='my-6'>
            <h1 className='text-2xl font-sans  text-center font-bold'>Updated This Product</h1>
        </div>
        <div className='my-5'>
            <Link to="/my-product" className='btn btn-sm btn-info'>Back</Link>
        </div>
        <div className='shadow-2xl p-8 border-t-2 border-gray-100'>
            <form onSubmit={handleUpdate}>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Product Name:</span>
                   
                </label>
                <input type="text" name="productName" defaultValue={product?.productName}   placeholder="Type here" className="input input-bordered w-full" />
                
            </div>
            
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Product Quentity:</span>
                    
                </label>
                <input type="number" name='productQuentity' defaultValue={product?.productQuentity}  placeholder="Type here" className="input input-bordered w-full" />
           
            </div>
            
            <div className="form-control w-full">
                    <label className="label">
                    <span className="label-text">Product Image:</span>
                    
                    </label>
                    <img className='w-16 h-12' src={product?.productImage} alt="" />
                    <input type="file" onChange={handleImage} name='productImage'  className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                
                </div>
                
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product Price:</span>
                        
                    </label>
                    <input type="number" name='productPrice' defaultValue={product?.productPrice} placeholder="Type here" className="input input-bordered w-full " />
                    
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                        
                    </label>
                    <textarea name='productDescription' className="textarea  textarea-bordered h-24" defaultValue={product?.productDescription}  placeholder="Bio"></textarea>
                
                </div>
                
                <div className='my-4'>
                    <input type="submit" className='btn btn-primary' value="Update"/>
                </div>
            </form>
        </div>
    </div>
  )
}
