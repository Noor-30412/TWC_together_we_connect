import React from 'react';
import { Component } from 'react';
import '../styles/navbar.css';

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const {
      isAuthenticated,
      handleLogout,
      switchToBuyerRegistration,
      switchToSellerRegistration,
    } = this.props;

    return (
      <>
        <nav>
          <a href="index.html">
            <svg
              id="logo-35"
              width="50"
              height="39"
              viewBox="0 0 50 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                className="ccompli1"
                fill="#007AFF"
              ></path>{' '}
              <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                className="ccustom"
                fill="#312ECB"
              ></path>{' '}
            </svg>
          </a>
          <div>
            <ul id="navbar" className={this.state.clicked ? 'active' : ''}>
              <li>
                <a className="active" href="/home">
                  Home
                </a>
              </li>
              <li>
                <a href="index.html">About Us</a>
              </li>
              <li>
                <a href="index.html">Contact Us</a>
              </li>
              <li>
                <a href="index.html">Product</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                  <>
                    <div className="dropdown">
                      <a className="dropbtn">Register Shop</a>
                      <div className="dropdown-content">
                        <a onClick={switchToBuyerRegistration}>Register as Buyer</a>
                        <a onClick={switchToSellerRegistration}>Register as Seller</a>
                      </div>
                    </div>
                    <a href="/home" onClick={handleLogout}>
                      Logout
                    </a>

                  </>
                ) : (
                  <li>
                    <a href="/login">Login/Signup</a>
                  </li>
                )}
              </li>
            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;