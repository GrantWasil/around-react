import React from 'react';
import logo from "../images/logo.svg"

function Header() {
    return (
      <header className="header container">
        <img className="logo" src={logo} alt="Around the US Logo" />
      </header>
    )
}

export default Header;