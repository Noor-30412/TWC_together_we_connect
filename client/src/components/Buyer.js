// frontend/components/BuyerRegistration.js
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
        termsAndConditions: false,
        whatsappNumber: '',
        gstNumber: '',
        estimatedAnnualIncome: '',
    });

    const commonInterestedItems = [
        'Electronics',
        'Clothing',
        'Home Appliances',
        'Books',
        'Toys',
        'Furniture',
        'Sporting Goods',
        'Jewelry',
        'Beauty Products',
        'Automotive Parts',
    ];

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        // Shop Name validation
        if (!formData.shopName.trim()) {
            errors.shopName = 'Shop Name is required';
        }
        if (!formData.termsAndConditions) {
            errors.termsAndConditions = 'Terms and Conditions must be accepted';
        }
        // Establishment Years validation
        if (!formData.establishmentYears.trim()) {
            errors.establishmentYears = 'Establishment Years is required';
        } else if (!/^\d+$/.test(formData.establishmentYears)) {
            errors.establishmentYears = 'Establishment Years must be a valid number';
        }

        // Alt Mobile Number validation
        if (!formData.altMobileNumber.trim()) {
            errors.altMobileNumber = 'Alt Mobile Number is required';
        } else if (!/^\d{10}$/.test(formData.altMobileNumber)) {
            errors.altMobileNumber = 'Alt Mobile Number must be a 10-digit number';
        }

        // Pincode validation
        if (!formData.shippingAddress.pincode.trim()) {
            errors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.shippingAddress.pincode)) {
            errors.pincode = 'Pincode must be a 6-digit number';
        }

        // Interested Items validation
        if (!formData.interestedItems.trim()) {
            errors.interestedItems = 'Interested Items is required';
        }

        // WhatsApp Number validation
        if (!formData.whatsappNumber.trim()) {
            errors.whatsappNumber = 'WhatsApp Number is required';
        } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
            errors.whatsappNumber = 'WhatsApp Number must be a 10-digit number';
        }

        // GST Number validation
        if (!formData.gstNumber.trim()) {
            errors.gstNumber = 'GST Number is required';
        } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[A-Z\d]{1}$/.test(formData.gstNumber)) {
            errors.gstNumber = 'Invalid GST Number format';
        }

        console.log('Errors:', errors);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Handle checkbox differently
        const inputValue = type === 'checkbox' ? checked : value;
    
        setFormData((prevData) => ({
          ...prevData,
          [name]: inputValue,
        }));
      };
    

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
            <div className='container'>
            <h2>Buyer Registration</h2>
            <form onSubmit={handleBuyerRegistration}>
                <label htmlFor="shopName">Shop Name:</label>
                <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    placeholder="Shop Name"
                    value={formData.shopName}
                    onChange={handleInputChange}
                />
                {errors.shopName && <p className="error">{errors.shopName}</p>}

                <label htmlFor="establishmentYears">Establishment Years:</label>
                <input
                    type="text"
                    id="establishmentYears"
                    name="establishmentYears"
                    placeholder="Establishment Years"
                    value={formData.establishmentYears}
                    onChange={handleInputChange}
                />
                {errors.establishmentYears && <p className="error">{errors.establishmentYears}</p>}

                <label htmlFor="altMobileNumber">Alt Mobile Number:</label>
                <input
                    type="text"
                    id="altMobileNumber"
                    name="altMobileNumber"
                    placeholder="Alt Mobile Number"
                    value={formData.altMobileNumber}
                    onChange={handleInputChange}
                />
                {errors.altMobileNumber && <p className="error">{errors.altMobileNumber}</p>}

                <label htmlFor="pincode">Pincode:</label>
                <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.shippingAddress.pincode}
                    onChange={handleAddressChange}
                />
                {errors.pincode && <p className="error">{errors.pincode}</p>}

                <label htmlFor="interestedItems">Interested Items:</label>
                <select
                    id="interestedItems"
                    name="interestedItems"
                    value={formData.interestedItems}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        Select Interested Items
                    </option>
                    {commonInterestedItems.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                {errors.interestedItems && <p className="error">{errors.interestedItems}</p>}

                <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                <input
                    type="text"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    placeholder="WhatsApp Number"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                />
                {errors.whatsappNumber && <p className="error">{errors.whatsappNumber}</p>}

                <label htmlFor="gstNumber">GST Number:</label>
                <input
                    type="text"
                    id="gstNumber"
                    name="gstNumber"
                    placeholder="GST Number"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                />
                {errors.gstNumber && <p className="error">{errors.gstNumber}</p>}
                <label>
          <input
            type="checkbox"
            name="termsAndConditions"
            checked={formData.termsAndConditions}
            onChange={handleInputChange}
          />
          Accept Terms and Conditions
        </label>
                {errors.termsAndConditions && <p className="error">{errors.termsAndConditions}</p>}

                <button type="submit">Register as Buyer</button>
            </form>
        </div>
        </div>
    );
};

export default BuyerRegistration;
