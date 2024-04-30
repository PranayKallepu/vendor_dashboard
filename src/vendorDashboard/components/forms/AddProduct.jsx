import React, {useState} from "react";
import { API_URL } from "../../data/apiPath";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestSeller, setBestSeller] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSeller= (event)=>{
    const value = event.target.value === 'true'
    setBestSeller(value)
  }

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  }

  const handleAddProduct = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.error('user not authenticated')
      }

      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image)

      category.forEach((value) => {
        formData.append("category", value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method:'POST',
        body: formData
      })
        const data = await response.json()

        if(response.ok){
          alert('Product added succesfully')
          setProductName("")
          setPrice("");
          setCategory([])
          setBestSeller(false);
          setImage(null);
          setDescription("")
        }
  }

       catch (error) {
        console.error("Error:", error);
      alert('Failed to Add Product')
    }
  }
  
  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
            <label htmlFor="">Product Name</label>
            <input type="text" onChange={(e)=>setProductName(e.target.value)} placeholder="Enter Product Name" />
            <label htmlFor="">Price</label>
            <input type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" />

        {/* cATERGORY */}
        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg</label>
              <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handleCategoryChange} className="inputBox" />
            </div>
            <div className="checkboxContainer">
              <label>Non-Veg</label>
              <input type="checkbox" value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange} className="inputBox" />
            </div>
          </div>
        </div>
        
        {/* BEST SELLER */}
        <div className="checkInp">
          <label>Best Seller</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Yes</label>
              <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSeller}  className="inputBox" />
            </div>
            <div className="checkboxContainer">
              <label>No</label>
              <input type="radio" value="false" checked={bestSeller===false} onChange={handleBestSeller}  className="inputBox" />
            </div>
          </div>
        </div>

         {/* DESCRIPTION */}
        <label htmlFor="">Description</label>
        <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Description" />
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={handleImageUpload} />
        <br />
        <div >
          <button type="submit" className="btnSubmit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
