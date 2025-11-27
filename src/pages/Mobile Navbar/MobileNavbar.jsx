import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNavbar.css"; // Make sure to create/add CSS file
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const [lastInvoiceNumber, setLastInvoiceNumber] = useState(null);
  useEffect(() => { 
 const fetchLastInvoice = async () => {
     try {
       const q = query(
         collection(db, "invoicebilling"),
         orderBy("createdAt", "desc"),
         limit(1)
       );
 
       const snap = await getDocs(q);
 
       if (!snap.empty) {
         setLastInvoiceNumber(snap.docs[0].data().invoiceNumber);
       }
     } catch (error) {
       console.error("Error fetching last invoice:", error);
     }
   };
 
   fetchLastInvoice();
 }, []);
  return (
    <>
      {/* 📱 Top Mobile Navbar */}
      <div className="mobile-navbar">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-nav-btn"
        >
          ☰ Menu
        </button>
      </div>

      {/* 📲 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <ul>
            <li>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/invoicecopy" onClick={() => setIsOpen(false)}>
                All Bill
              </Link>
            </li>

            <li>
              <Link to="/invoiceeditbill" onClick={() => setIsOpen(false)}>
                Edit Bill
              </Link>
            </li>

            <li>
              <Link to="/invoicebill" onClick={() => setIsOpen(false)}>
                Generate Bill
              </Link>
            </li>

            {/* <li>
              <Link to="/showcustomers" onClick={() => setIsOpen(false)}>
                Customer Details
              </Link>
            </li> */}
            <li>
              <Link to="/invoice">
               
                {isOpen && (
                  <span style={{ fontWeight: "600", marginLeft: "6px" }}>
                    Last Bill Number: {lastInvoiceNumber ?? "Loading..."}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
