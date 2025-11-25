import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/annakshi-logo.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* Top Row = Brand + Menu Icon */}
      <div className="navbar-header">
       <h1 className="navbar-title">
  <Link to="/home">
    <img src={logo} alt="Billing Logo" className="navbar-logo" />
  </Link>
</h1>


        {/* Mobile Menu Toggle */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </div>
      </div>

      {/* MENU LIST */}
      <ul className={`navbar-list ${menuOpen ? "open" : ""}`}>
        <li className="navbar-item">
          <Link to="/newhome" className="navbar-link">Dashboard</Link>
        </li>
        <li className="navbar-item">
          <Link to="/invoicecopy" className="navbar-link">All Bills</Link>
        </li>
        <li className="navbar-item">
          <Link to="/editbill" className="navbar-link">Edit Bills</Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/showcustomers" className="navbar-link">Customers</Link>
        </li>
        <li className="navbar-item">
          <Link to="/wholesalebill" className="navbar-link">Wholesale Bill</Link>
        </li>
        <li className="navbar-item">
          <Link to="/retailcalculator" className="navbar-link">Retail Bill</Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/invoicebill" className="navbar-link">Invoice</Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/waybill" className="navbar-link">Way Bill</Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/invoice" className="navbar-link">Invoice Number</Link>
        </li>
        <li className="navbar-item">
          <Link to="/products" className="navbar-link">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
