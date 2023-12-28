// // src/components/VerifyEmail.js
// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const VerifyEmail = () => {
//     const { token } = useParams();

//     useEffect(() => {
//         const verifyEmail = async () => {
//             try {
//                 const response = await axios.post(`/api/auth/email-verification/${token}`);
//                 console.log(response.data);
//                 // Handle successful email verification
//             } catch (error) {
//                 console.error('Email verification error:', error.response.data.message);
//                 // Handle error in email verification
//             }
//         };

//         verifyEmail();
//     }, [token]);

//     return (
//         <div>
//             <h2>Email Verification</h2>
//             {/* Add loading spinner or message here */}
//         </div>
//     );
// };

// export default VerifyEmail;
