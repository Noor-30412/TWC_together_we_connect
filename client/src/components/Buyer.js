import React, { useState } from 'react';
import axios from 'axios';
import { FaShopify, FaMapMarkerAlt, FaPhoneAlt, FaAddressCard, FaMobileAlt } from 'react-icons/fa';
import '../styles/buyerreg.css';
import Navbar from '../components/navbar';

const BuyerRegistration = () => {
    const [formData, setFormData] = useState({
        shopName: '',
        shippingAddress: {
            pincode: '',
            location: '',
            city: '',
            landmark: '',
        },
        establishmentYears: '',
        altMobileNumber: '',
        interestedItems: '', // This will be selected from a dropdown
        whatsappNumber: '',
        gstNumber: '',
        estimatedAnnualIncome: '',
        termsAndConditions: false,
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.shopName.trim()) {
            errors.shopName = 'Shop Name is required';
        }

        if (!formData.shippingAddress.pincode.trim()) {
            errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.shippingAddress.pincode)) {
            errors.pincode = 'Pincode must be a 6-digit number';
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

        if (!formData.interestedItems) {
            errors.interestedItems = 'Interested Items are required';
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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        if (name.startsWith('shippingAddress.')) {
            const addressField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                shippingAddress: {
                    ...prevData.shippingAddress,
                    [addressField]: inputValue,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: inputValue,
            }));
        }
    };

    const handleBuyerRegistration = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/buyers/register', formData, {
                headers: {
                    Authorization: token,
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error('Buyer registration error:', error.response.data.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="BuyerRegistration">
                <h2><FaShopify /> Buyer Registration</h2>
                <form onSubmit={handleBuyerRegistration}>
                    {/* Shop Name */}
                    <div className="input-group">
                        <label htmlFor="shopName"><FaShopify /> Shop Name:</label>
                        <input
                            type="text"
                            id="shopName"
                            name="shopName"
                            placeholder="Shop Name"
                            value={formData.shopName}
                            onChange={handleInputChange}
                        />
                        {errors.shopName && <div className="error">{errors.shopName}</div>}
                    </div>
                    {/* Shipping Address - Pincode */}
                    <div className="input-group">
                        <label htmlFor="pincode"><FaMapMarkerAlt /> Pincode:</label>
                        <input
                            type="text"
                            id="pincode"
                            name="shippingAddress.pincode"
                            placeholder="Pincode"
                            value={formData.shippingAddress.pincode}
                            onChange={handleInputChange}
                        />
                        {errors.pincode && <div className="error">{errors.pincode}</div>}
                    </div>
                    {/* Shipping Address - Location */}
                    <div className="input-group">
                        <label htmlFor="location"><FaMapMarkerAlt /> Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="shippingAddress.location"
                            placeholder="Location"
                            value={formData.shippingAddress.location}
                            onChange={handleInputChange}
                        />
                        {errors.location && <div className="error">{errors.location}</div>}
                    </div>
                    {/* Shipping Address - City */}
                    <div className="input-group">
                        <label htmlFor="city"><FaMapMarkerAlt /> City:</label>
                        <input
                            type="text"
                            id="city"
                            name="shippingAddress.city"
                            placeholder="City"
                            value={formData.shippingAddress.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <div className="error">{errors.city}</div>}
                    </div>
                    {/* Shipping Address - Landmark */}
                    <div className="input-group">
                        <label htmlFor="landmark"><FaMapMarkerAlt /> Landmark:</label>
                        <input
                            type="text"
                            id="landmark"
                            name="shippingAddress.landmark"
                            placeholder="Landmark"
                            value={formData.shippingAddress.landmark}
                            onChange={handleInputChange}
                        />
                        {errors.landmark && <div className="error">{errors.landmark}</div>}
                    </div>
                    {/* Establishment Years */}
                    <div className="input-group">
                        <label htmlFor="establishmentYears"><FaAddressCard /> Establishment Years:</label>
                        <input
                            type="text"
                            id="establishmentYears"
                            name="establishmentYears"
                            placeholder="Establishment Years"
                            value={formData.establishmentYears}
                            onChange={handleInputChange}
                        />
                        {errors.establishmentYears && <div className="error">{errors.establishmentYears}</div>}
                    </div>
                    {/* Alt Mobile Number */}
                    <div className="input-group">
                        <label htmlFor="altMobileNumber"><FaMobileAlt /> Alt Mobile Number:</label>
                        <input
                            type="text"
                            id="altMobileNumber"
                            name="altMobileNumber"
                            placeholder="Alt Mobile Number"
                            value={formData.altMobileNumber}
                            onChange={handleInputChange}
                        />
                        {errors.altMobileNumber && <div className="error">{errors.altMobileNumber}</div>}
                    </div>
                    {/* Interested Items - Dropdown */}
                    <div className="input-group">
                        <label htmlFor="interestedItems"><FaAddressCard /> Interested Items:</label>
                        <select
                            id="interestedItems"
                            name="interestedItems"
                            value={formData.interestedItems}
                            onChange={handleInputChange}
                        >
                            <option value="">Select an option</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Home Appliances">Home Appliances</option>
                            {/* Add more options as needed */}
                        </select>
                        {errors.interestedItems && <div className="error">{errors.interestedItems}</div>}
                    </div>
                    {/* WhatsApp Number */}
                    <div className="input-group">
                        <label htmlFor="whatsappNumber"><FaPhoneAlt /> WhatsApp Number:</label>
                        <input
                            type="text"
                            id="whatsappNumber"
                            name="whatsappNumber"
                            placeholder="WhatsApp Number"
                            value={formData.whatsappNumber}
                            onChange={handleInputChange}
                        />
                        {errors.whatsappNumber && <div className="error">{errors.whatsappNumber}</div>}
                    </div>
                    {/* GST Number */}
                    <div className="input-group">
                        <label htmlFor="gstNumber"><FaAddressCard /> GST Number:</label>
                        <input
                            type="text"
                            id="gstNumber"
                            name="gstNumber"
                            placeholder="GST Number"
                            value={formData.gstNumber}
                            onChange={handleInputChange}
                        />
                        {errors.gstNumber && <div className="error">{errors.gstNumber}</div>}
                    </div>
                    {/* Estimated Annual Income */}
                    <div className="input-group">
                        <label htmlFor="estimatedAnnualIncome"><FaAddressCard /> Estimated Annual Income:</label>
                        <input
                            type="text"
                            id="estimatedAnnualIncome"
                            name="estimatedAnnualIncome"
                            placeholder="Estimated Annual Income"
                            value={formData.estimatedAnnualIncome}
                            onChange={handleInputChange}
                        />
                        {errors.estimatedAnnualIncome && <div className="error">{errors.estimatedAnnualIncome}</div>}
                    </div>
                    {/* Terms and Conditions */}
                    <div className="input-group">
                        <label>
                            <input
                                type="checkbox"
                                name="termsAndConditions"
                                checked={formData.termsAndConditions}
                                onChange={handleInputChange}
                                required
                            />
                            Accept Terms and Conditions
                        </label>
                    </div>
                    {/* Submit Button */}
                    <button type="submit">Register as Buyer</button>
                </form>
            </div>
        </div>
    );
};

export default BuyerRegistration;
