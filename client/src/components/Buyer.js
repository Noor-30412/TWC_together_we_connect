import React, { useState } from 'react';
import axios from 'axios';

const BuyerRegistration = () => {
    // Define state for form fields
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
        interestedItems: '',
        termsAndConditions: '',
        whatsappNumber: '',
        gstNumber: '',
        estimatedAnnualIncome: '',
    });

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle shipping address changes
    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            shippingAddress: {
                ...prevData.shippingAddress,
                [name]: value,
            },
        }));
    };

    // Handle form submission
    const handleBuyerRegistration = async (e) => {
        e.preventDefault();

        try {
            // Use the authenticated user's token for the request
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
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
            <h2>Buyer Registration</h2>
            <form onSubmit={handleBuyerRegistration}>
                {/* Shop Name */}
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleInputChange}
                />

                {/* Shipping Address */}
                <label htmlFor="shippingAddress">Shipping Address:</label>
                <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.shippingAddress.pincode}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    value={formData.shippingAddress.location}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.shippingAddress.city}
                    onChange={handleAddressChange}
                />
                <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.shippingAddress.landmark}
                    onChange={handleAddressChange}
                />

                {/* Establishment Years */}
                <label htmlFor="establishmentYears">Establishment Years:</label>
                <input
                    type="text"
                    id="establishmentYears"
                    name="establishmentYears"
                    placeholder="Establishment Years"
                    value={formData.establishmentYears}
                    onChange={handleInputChange}
                />

                {/* Alt Mobile Number */}
                <label htmlFor="altMobileNumber">Alt Mobile Number:</label>
                <input
                    type="text"
                    id="altMobileNumber"
                    name="altMobileNumber"
                    placeholder="Alt Mobile Number"
                    value={formData.altMobileNumber}
                    onChange={handleInputChange}
                />

                {/* Interested Items */}
                <label htmlFor="interestedItems">Interested Items:</label>
                <input
                    type="text"
                    id="interestedItems"
                    name="interestedItems"
                    placeholder="Interested Items"
                    value={formData.interestedItems}
                    onChange={handleInputChange}
                />

                {/* Terms And Conditions */}
                <label htmlFor="termsAndConditions">Terms And Conditions:</label>
                <input
                    type="text"
                    id="termsAndConditions"
                    name="termsAndConditions"
                    placeholder="Terms And Conditions"
                    value={formData.termsAndConditions}
                    onChange={handleInputChange}
                />

                {/* WhatsApp Number */}
                <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                <input
                    type="text"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    placeholder="WhatsApp Number"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                />

                {/* GST Number */}
                <label htmlFor="gstNumber">GST Number:</label>
                <input
                    type="text"
                    id="gstNumber"
                    name="gstNumber"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                />

                {/* Estimated Annual Income */}
                <label htmlFor="estimatedAnnualIncome">Estimated Annual Income:</label>
                <input
                    type="text"
                    id="estimatedAnnualIncome"
                    name="estimatedAnnualIncome"
                    placeholder="Estimated Annual Income"
                    value={formData.estimatedAnnualIncome}
                    onChange={handleInputChange}
                />

                <button type="submit">Register as Buyer</button>
            </form>
        </div>
    );
};

export default BuyerRegistration;
