import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Sidebar from '../Sidebar/Sidebar';
import './Addproduct.css';
import MobileNavbar from '../Mobile Navbar/MobileNavbar';

const AddCustomer = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Only 3 fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'customers'), {
        name,
        address,
        phone,
        createdAt: new Date()
      });

      setName('');
      setAddress('');
      setPhone('');

      alert('Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer: ', error);
      alert('Failed to add customer.');
    }
  };

  return (
    
    <div className="add-product-page">
        
      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
     
      <div className="add-product-container">
         
        <div className="form-card">
        
          <h2 className="form-title">Add New Customer</h2>

          <form onSubmit={handleAddCustomer} className="product-form">

            <input
              type="text"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">
              Add Customer
            </button>

          </form>

        </div>
      </div>

    </div>
  );
};

export default AddCustomer;
