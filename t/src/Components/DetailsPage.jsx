import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import "./style/DetailsPage.css"

export default function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItemToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      // const response = await axios.get(`http://localhost:5001/all/${id}`)
      const response = await axios.get(`https://eager-slacks-slug.cyclic.app/all/${id}`)

      setProduct(response.data);
      setPrice(response.data.price);
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    updatePrice(size);
  };

  const updatePrice = (size) => {
    
    let newSizePrice = product.price; 

    if (size === 'S') {
      newSizePrice += 10; // Add $10 for size S
    } else if (size === 'M') {
      newSizePrice += 15; // Add $15 for size M
    } else if (size === 'L') {
      newSizePrice += 20; // Add $20 for size L
    }

    setPrice(newSizePrice);
  };

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: price,
      quantity: 1,
      image: product.img,
    };
    addItemToCart(item);
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      <div className="product-image">
        <img src={product.img} alt={product.title} />
      </div>
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>Price: {price} INR</p>
        <h3>Select Size:</h3>
        <div className="size-options">
          {['S', 'M', 'L'].map((size) => (
            <button
              key={size}
              className={selectedSize === size ? 'selected' : ''}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
