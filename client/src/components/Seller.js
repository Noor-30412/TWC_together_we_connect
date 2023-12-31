import React, { useState } from 'react';
import axios from 'axios';

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
        interestedItems: '',
        whatsappNumber: '',
        gstNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            address: {
                ...prevData.address,
                [name]: value,
            },
        }));
    };

    const handleSellerRegistration = async (e) => {
        e.preventDefault();

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
    };

    return (
        <div>
            <h2>Seller Registration</h2>
            <form onSubmit={handleSellerRegistration}>
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleInputChange}
                />

                <label htmlFor="typeOfItemsSold">Type of Items Sold:</label>
                <input
                    type="text"
                    id="typeOfItemsSold"
                    name="typeOfItemsSold"
                    placeholder="Type of Items Sold"
                    value={formData.typeOfItemsSold}
                    onChange={handleInputChange}
                />

                <label htmlFor="descriptionOfItemsSold">Description of Items Sold:</label>
                <input
                    type="text"
                    id="descriptionOfItemsSold"
                    name="descriptionOfItemsSold"
                    placeholder="Description of Items Sold"
                    value={formData.descriptionOfItemsSold}
                    onChange={handleInputChange}
                />

                <label htmlFor="establishmentYears">Establishment Years:</label>
                <input
                    type="text"
                    id="establishmentYears"
                    name="establishmentYears"
                    placeholder="Establishment Years"
                    value={formData.establishmentYears}
                    onChange={handleInputChange}
                />

                <label htmlFor="altMobileNumber">Alt Mobile Number:</label>
                <input
                    type="text"
                    id="altMobileNumber"
                    name="altMobileNumber"
                    placeholder="Alt Mobile Number"
                    value={formData.altMobileNumber}
                    onChange={handleInputChange}
                />

                <label htmlFor="pincode">Pincode:</label>
                <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.address.pincode}
                    onChange={handleAddressChange}
                />

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Location"
                    value={formData.address.location}
                    onChange={handleAddressChange}
                />

                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                />

                <label htmlFor="landmark">Landmark:</label>
                <input
                    type="text"
                    id="landmark"
                    name="landmark"
                    placeholder="Landmark"
                    value={formData.address.landmark}
                    onChange={handleAddressChange}
                />

                <label htmlFor="interestedItems">Interested Items:</label>
                <input
                    type="text"
                    id="interestedItems"
                    name="interestedItems"
                    placeholder="Interested Items"
                    value={formData.interestedItems}
                    onChange={handleInputChange}
                />

                <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                <input
                    type="text"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    placeholder="WhatsApp Number"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                />

                <label htmlFor="gstNumber">GST Number:</label>
                <input
                    type="text"
                    id="gstNumber"
                    name="gstNumber"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                />

                <button type="submit">Register as Seller</button>
            </form>
        </div>
    );
};

export default SellerRegistration;
