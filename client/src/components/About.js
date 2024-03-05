import React from 'react';
import '../styles/about.css'
import '../styles/navbar.css';
import Navbar from '../components/navbar'
const About = () => {
    return (
        <div><Navbar/>
        <div className="about-page">
            <h2>About Page</h2>
            <p>
                "Together We Connect" (TWC) is a dynamic online marketplace that redefines
                the e-commerce experience. In a world where the trustworthiness of online
                sellers is a growing concern, TWC emerges as a beacon, providing a unique
                blend of trust, variety, and security.
            </p>
            <p>
                At TWC, we understand that many customers are concerned about the
                trustworthiness of online sellers. That's why we thoroughly vet and verify
                all sellers on our platform, offering our customers peace of mind. Our
                platform offers a wide variety of products and services from multiple
                sellers, giving our customers a broader range of choices than they might
                find on individual seller websites.
            </p>
            <p>
                TWC serves as an online marketplace that facilitates the interaction
                between wholesalers and retailers. Wholesalers, who typically sell products
                in bulk quantities, can easily create listings for their products on our
                platform. These listings include comprehensive information such as product
                descriptions, pricing, and available quantities.
            </p>
            <p>
                Retailers, on the other hand, gain access to a wide variety of products
                from different wholesalers, all within a single platform. This means they
                don't have to spend significant time and effort searching for suitable
                suppliers. The convenience of having numerous product options in one place is
                a significant advantage for retailers.
            </p>
        </div>
        </div>
    );
};

export default About;