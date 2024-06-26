import React from 'react';
import './ListProduct.css';
import cart_cross_icon from '../../assets/cart_cross_icon.png';
import { useState,useEffect } from 'react';

const ListProduct = () => {
    const  [allproducts,setAllProducts] = useState([]);

const fetchInfo =async ()=>{
    await fetch('http://localhost:4000/allproducts')
    // await fetch('https://itemcatalogpjtbe.onrender.com/allproducts')
    .then((res)=>res.json()).then((data)=>{setAllProducts(data)});
}
useEffect(()=>{
    fetchInfo();
},[])
const remove_product =async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
        // await fetch('https://itemcatalogpjtbe.onrender.com/removeproduct',{

       method:'post',
       headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
       },
       body:JSON.stringify({id:id}) 
    })
   await fetchInfo();
}


    return (
        <div className='list-product'>
          <h1>All Product List</h1> 
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>

            <p>New Price</p>

            <p>Category</p>

            <p>Remove</p>

          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product,index)=>{
    return(
    <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p> {/* Use curly braces to access the value */}
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cart_cross_icon}alt="" className="listproduct-remove-icon" />
        </div>
        <hr /></>
    );
})}

          </div>
        </div>
    );
};

export default ListProduct;




