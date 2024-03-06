import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sellerreg.css';
import Navbar from '../components/navbar'
const SellerRegistration = () => {
  
  const [formData, setFormData] = useState({
    shopName: '',
    typeOfItemsSold: '',
    descriptionOfItemsSold: '',
    establishmentYears: '',
    altMobileNumber: '',
    address: {
      pincode: '',
      location: '',
      city: '',
      landmark: '',
    },
    whatsappNumber: '',
    gstNumber: '',
    estimatedAnnualIncome: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.shopName.trim()) {
      errors.shopName = 'Shop Name is required';
    }

    if (!formData.typeOfItemsSold.trim()) {
      errors.typeOfItemsSold = 'Type of Items Sold is required';
    }

    if (!formData.descriptionOfItemsSold.trim()) {
      errors.descriptionOfItemsSold = 'Description of Items Sold is required';
    }

    if (!formData.establishmentYears.trim()) {
      errors.establishmentYears = 'Establishment Years is required';
    } else if (!/^\d+$/.test(formData.establishmentYears)) {
      errors.establishmentYears = 'Establishment Years must be a valid number';
    }

    if (!formData.altMobileNumber.trim()) {
      errors.altMobileNumber = 'Alt Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.altMobileNumber)) {
      errors.altMobileNumber = 'Alt Mobile Number must be a 10-digit number';
    }

    if (!formData.address.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.address.pincode)) {
      errors.pincode = 'Pincode must be a 6-digit number';
    }

    if (!formData.address.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!formData.address.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.address.landmark.trim()) {
      errors.landmark = 'Landmark is required';
    }

    if (!formData.whatsappNumber.trim()) {
      errors.whatsappNumber = 'WhatsApp Number is required';
    } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      errors.whatsappNumber = 'WhatsApp Number must be a 10-digit number';
    }

    if (!formData.gstNumber.trim()) {
      errors.gstNumber = 'GST Number is required';
    } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
      errors.gstNumber = 'Invalid GST Number format';
    }

    if (!formData.estimatedAnnualIncome.trim()) {
      errors.estimatedAnnualIncome = 'Estimated Annual Income is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSellerRegistration = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/sellers/register', formData, {
        headers: {
          Authorization: token,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Seller registration error:', error.response.data.message);
    }
  };return (
    <div><Navbar/>
    <div className="SellerRegistration">
      <h2>Seller Registration</h2>
      <form onSubmit={handleSellerRegistration}>
        <div className="form-group">
          <label htmlFor="shopName"><i className="fas fa-store-alt"></i> Shop Name:</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleInputChange}
          />
          {errors.shopName && <p className="error">{errors.shopName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="typeOfItemsSold"><i className="fas fa-tags"></i> Type of Items Sold:</label>
          <input
            type="text"
            id="typeOfItemsSold"
            name="typeOfItemsSold"
            placeholder="Type of Items Sold"
            value={formData.typeOfItemsSold}
            onChange={handleInputChange}
          />
          {errors.typeOfItemsSold && <p className="error">{errors.typeOfItemsSold}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="descriptionOfItemsSold"><i className="fas fa-file-alt"></i> Description of Items Sold:</label>
          <input
            type="text"
            id="descriptionOfItemsSold"
            name="descriptionOfItemsSold"
            placeholder="Description of Items Sold"
            value={formData.descriptionOfItemsSold}
            onChange={handleInputChange}
          />
          {errors.descriptionOfItemsSold && <p className="error">{errors.descriptionOfItemsSold}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="establishmentYears"><i className="fas fa-calendar-alt"></i> Establishment Years:</label>
          <input
            type="text"
            id="establishmentYears"
            name="establishmentYears"
            placeholder="Establishment Years"
            value={formData.establishmentYears}
            onChange={handleInputChange}
          />
          {errors.establishmentYears && <p className="error">{errors.establishmentYears}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="altMobileNumber"><i className="fas fa-phone-alt"></i> Alt Mobile Number:</label>
          <input
            type="text"
            id="altMobileNumber"
            name="altMobileNumber"
            placeholder="Alt Mobile Number"
            value={formData.altMobileNumber}
            onChange={handleInputChange}
          />
          {errors.altMobileNumber && <p className="error">{errors.altMobileNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="pincode"><i className="fas fa-map-pin"></i> Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="address.pincode"
            placeholder="Pincode"
            value={formData.address.pincode}
            onChange={handleInputChange}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="location"><i className="fas fa-map-marker-alt"></i> Location:</label>
          <input
            type="text"
            id="location"
            name="address.location"
            placeholder="Location"
            value={formData.address.location}
            onChange={handleInputChange}
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="city"><i className="fas fa-city"></i> City:</label>
          <input
            type="text"
            id="city"
            name="address.city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleInputChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div><div className="form-group">
          <label htmlFor="landmark"><i className="fas fa-map-pin"></i> Landmark:</label>
          <input
            type="text"
            id="landmark"
            name="address.landmark"
            placeholder="Landmark"
            value={formData.address.landmark}
            onChange={handleInputChange}
          />
          {errors.landmark && <p className="error">{errors.landmark}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="whatsappNumber"><i className="fab fa-whatsapp"></i> WhatsApp Number:</label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            placeholder="WhatsApp Number"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
          />
          {errors.whatsappNumber && <p className="error">{errors.whatsappNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gstNumber"><i className="fas fa-id-card"></i> GST Number:</label>
          <input
            type="text"
            id="gstNumber"
            name="gstNumber"
            placeholder="GST Number"
            value={formData.gstNumber}
            onChange={handleInputChange}
          />
          {errors.gstNumber && <p className="error">{errors.gstNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="estimatedAnnualIncome"><i className="fas fa-dollar-sign"></i> Estimated Annual Income:</label>
          <input
            type="text"
            id="estimatedAnnualIncome"
            name="estimatedAnnualIncome"
            placeholder="Estimated Annual Income"
            value={formData.estimatedAnnualIncome}
            onChange={handleInputChange}
          />
          {errors.estimatedAnnualIncome && <p className="error">{errors.estimatedAnnualIncome}</p>}
        </div>

        <button type="submit" className="register-button">
          <i className="fas fa-user-plus"></i> Register as Seller
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default SellerRegistration;