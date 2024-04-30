import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const AddFirm = () => {
  const [firmName, setfirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImageUpload = (event)=>{
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not Authenticated");
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file)

      category.forEach((value) => {
        formData.append("category", value);
      });

      region.forEach((val) => {
        formData.append("region", val);
      });

      // formData.append("image", file);

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: loginToken,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Firm Added Successfully");
        setfirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }else if(data.message === "vendor can have only one firm"){
        alert("Firm Exits. Only 1 firm can added")
      }else{
        alert("failed to add firm")
      }

      const firmId = data.firmId;
      localStorage.setItem('firmId', firmId);

    } catch (error) {
      console.error("Failed to add Firm", error);
    }

  };

  return (
    <div className="firmSection">
      <form className="tableForm" onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>

        <label htmlFor="">Firm Name</label>
        <input
          type="text"
          name="firmName"
          placeholder="Enter Restaurant Name"
          value={firmName}
          onChange={(e) => setfirmName(e.target.value)}
        />

        <label htmlFor="">Area</label>
        <input
          type="text"
          name="area"
          placeholder="Enter Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <div className="checkInp">
          <label>Category</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label>Veg:</label>
              <input
                type="checkbox"
                checked={category.includes("veg")}
                value="veg"
                onChange={handleCategoryChange}
                className="inputBox"
              />
            </div>

            <div className="checkboxContainer">
              <label>Non-Veg:</label>
              <input
                type="checkbox"
                checked={category.includes("non-veg")}
                value="non-veg"
                onChange={handleCategoryChange}
                className="inputBox"
              />
            </div>
          </div>
        </div>

        <div className="checkInp">
          <label>Region</label>
          <div className="inputsContainer">
            <div className="checkboxContainer">
              <label htmlFor="south">South Indian</label>
              <input 
                id="south"
                type="checkbox"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label htmlFor="north">North Indian</label>
              <input  id="north"
                type="checkbox"
                value="north-indian"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label htmlFor="chinese">Chinese</label>
              <input id="chinese"
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkboxContainer">
              <label htmlFor="bakery">Bakery</label>
              <input id="bakery"
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>

        <label htmlFor="">Offer</label>
        <input
          type="text"
          placeholder="Enter Offer"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

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

export default AddFirm;
