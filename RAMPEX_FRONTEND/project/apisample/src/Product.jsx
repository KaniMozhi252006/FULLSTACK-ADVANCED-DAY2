import React,{useEffect,useState} from 'react';
import axios from 'axios'

const Product =()=>{
    const [product,setProduct]=useState([]);
        useEffect(()=>{
            axios.get('https://fakestoreapi.com/products')
            .then(response=>{
                console.log(response.data);
                setProduct(response.data);
            })
            .catch(error =>{
                console.error('There was an error fetching the products')
            });
        },[]);

    return(
        <div>
            <h2>Products List</h2>
            <ul>
                {product.map((product)=>(
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <p><img src={product.image} alt={product.title}/></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Product