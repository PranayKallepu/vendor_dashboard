import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate, useNavigate } from "react-router-dom";
import './index.css';

const AddFirm = () => {
  const navigate = useNavigate();

  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('loginToken'));
  const [restName, setRestName] = useState(localStorage.getItem('firmName'));
  const [alertsShown, setAlertsShown] = useState(false);

  useEffect(() => {
    if (restName && !alertsShown) {
      setAlertsShown(true);
      alert('Firm Added Already!');
      alert('Please Add the Products.');
      navigate('/');
    }
  }, [restName, navigate, alertsShown]);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value])
    }
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
        alert('Please Register')
        return <Navigate to='/register' />
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file)

      category.forEach((value) => {
        formData.append('category', value)
      });
      region.forEach((value) => {
        formData.append('region', value)
      })

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json()
      if (response.ok) {
        console.log(data);
        setFirmName("");
        setArea("")
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null)
        alert("Firm added Successfully")
        navigate('/')
        
      } else if (data.message === "vendor can have only one firm") {
        alert("Firm Exists 🥗. Only 1 firm can be added  ")
      } else {
        alert('Failed to add Firm')
      }
      //FIRM SET TO LOCAL STORAGE
      const mongo = data.firmId;
      localStorage.setItem('firmId', mongo);

      const vendorRestuarant = data.vendorFirmName;
      localStorage.setItem('firmName', vendorRestuarant)
      const address = data.vendorArea;
      localStorage.setItem('address', address);

      window.location.reload()

    } catch (error) {
      console.error("failed to add Firm")
      alert("failed to add Firm")
    } finally {
      setLoading(false);
    }
  }

  if(!jwtToken){
    return <Navigate to='/login'/>
  }

  return (
    <div className="firm-section">
      {loading && <div className="loaderSection">
        <ThreeCircles
          visible={loading}
          height={100}
          width={100}
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>}
      {!loading &&
        <form className="table-form" onSubmit={handleFirmSubmit}>
          <h3>Restaurant Details</h3>
          <label >Restaurant:</label>
          <input placeholder='Enter Restaurant Name' type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
          <label >Area:</label>
          <input placeholder='Enter Area' type="text" name='area' value={area} onChange={(e) => setArea(e.target.value)} />
         
          <label >Offer:</label>
          <input placeholder='10% off on above 200/-' type="text" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />

          <div className="checkInp">
            <label >Category:</label>
            <div className="inputsContainer">
              <div className="checboxContainer">
                <label className='category-label'>Veg:</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
              </div>
              <div className="checboxContainer">
                <label className='category-label'>Non-Veg:</label>
                <input className='catergory-input' type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
              </div>
            </div>

          </div>

          <div className="checkInp">
            <label >Region:</label>
            <div className="inputsContainer">
              <div className="regBoxContainer">
                <label>South Indian</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>North-Indian</label>
                <input type="checkbox" value="north-indian" checked={region.includes('north-indian')}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>Chinese</label>
                <input type="checkbox" value="chinese" checked={region.includes('chinese')}
                  onChange={handleRegionChange}
                />
              </div>
              <div className="regBoxContainer">
                <label>Bakery</label>
                <input type="checkbox" value="bakery" checked={region.includes('bakery')}
                  onChange={handleRegionChange}
                />
              </div>
            </div>

          </div>

          <label >Restaurant Image:</label>
          <input type="file" onChange={handleImageUpload} />
          <br />
          <div className="btnSubmit">
            <button type='submit'>Submit</button>
          </div>
        </form>}
    </div>
  )
}

export default AddFirm
