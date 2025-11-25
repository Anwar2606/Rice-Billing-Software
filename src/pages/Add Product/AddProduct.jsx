import React, { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import Sidebar from '../Sidebar/Sidebar';
import './Addproduct.css';

const AddProduct = () => {
  const [sno, setSno] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState('');
  const [inStock, setInStock] = useState('');
  const [saleprice, setSalePrice] = useState('');
  const [regularprice, setRegularPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [bill, setBill] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'products'), {
        sno,
        name,
        inStock,
        saleprice: parseFloat(saleprice),
        regularprice: parseFloat(regularprice),
        quantity: parseInt(quantity),
        category,
        discount: 0,
        bill
      });

      setSno('');
      setName('');
      setSalePrice('');
      setRegularPrice('');
      setQuantity('');
      setInStock('');
      setCategory('');
      setBill('');

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product-page">

      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="add-product-container">
        
        <div className="form-card">
          <h2 className="form-title">Add New Product</h2>

          <form onSubmit={handleAddProduct} className="product-form">

            <input 
              type="text"
              placeholder="Product Code"
              value={sno}
              onChange={(e) => setSno(e.target.value)}
              required
            />

            <input 
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <select
              className="custom-select"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              required
            >
              <option value="">Select Stock Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <input 
              type="number"
              placeholder="Sale Price"
              value={saleprice}
              onChange={(e) => setSalePrice(e.target.value)}
              required
            />

            <input 
              type="number"
              placeholder="Regular Price"
              value={regularprice}
              onChange={(e) => setRegularPrice(e.target.value)}
              required
            />

            <input 
              type="number"
              placeholder="Stock Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <input 
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <button type="submit" className="submit-btn">
              Add Product
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;
