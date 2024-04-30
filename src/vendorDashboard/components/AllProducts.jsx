import React, {useState, useEffect} from 'react';
import {API_URL} from '../data/apiPath'

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productsHandler = async()=>{
        const firmId = localStorage.getItem('firmId');
        try {

            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();
            setProducts(newProductData.products);
            console.log(newProductData)
            
        } catch (error) {
            console.error('failed to fetch products')
            alert('Failed to Fetch Products')
        }
    }

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')

    }, [])

    const deleteProductById= async(productId)=>{
            try {
                const response = await fetch(`${API_URL}/product/${productId}`,{
                    method: 'DELETE'
                })
                if(response.ok){
                    setProducts(products.filter(product =>product._id !== productId));
                    confirm("Are you sure, you want to delete?")
                    alert("Product Deleted Successfully")
                }
            } catch (error) {
                console.error("Failed to delete product");
                alert('Failed to delete product')
                
            }
    }

  return (
    <div>
      {!products ? (
        <p>No Products Added</p>
      ) : (
        <table className="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                    return(
                        <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                            <td>
                                {item.image && (
                                    <img src={`${API_URL}/uploads/${item.image}`} 
                                    alt={item.productName}
                                    style={{width: '50px', height: '50px'}} />
                                )}
                            </td>
                            <td>
                                <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                            </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts
