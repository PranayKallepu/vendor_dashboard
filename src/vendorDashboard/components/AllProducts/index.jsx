import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';
import './index.css';
import { ThreeCircles } from 'react-loader-spinner';


const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
        } catch (error) {
            console.error("failed to fetch products", error);
            alert('failed to fetch products');
        } finally {
            setLoading(false); // Set loading to false when data fetching is complete
        }
    };

    useEffect(() => {
        productsHandler();
        console.log('this is useEffect');
    }, []);

    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProducts(products.filter(product => product._id !== productId));
                confirm("Are you sure you want to delete?");
                alert("Product deleted successfully");
            }
        } catch (error) {
            console.error('Failed to delete product');
            alert('Failed to delete product');
        }
    };

    return (
        <div className='productSection'>
            {loading ? ( // Display loading message while data is being fetched
                <div className="loader-section">
                    <p>Loading...</p>
                    <ThreeCircles visible={loading} height={100} width={100} color="#4fa94d" />
                </div>
            ) : !products.length ? ( // Display message if there are no products
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.productName}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => deleteProductById(item._id)}
                                        className='deleteBtn'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;
