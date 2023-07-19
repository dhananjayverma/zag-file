import React, { useContext } from 'react';
import { CartContext } from './context/CartContext';
import { RiDeleteBinLine } from 'react-icons/ri';
import './style/CartPage.css';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeItemFromCart, increaseQuantity, 
    decreaseQuantity, calculateSubTotal, calculateTotalPrice } =
    useContext(CartContext);

  const handleRemoveItem = (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (itemToRemove.quantity > 1) {
      decreaseQuantity(itemId);
    } else {
      removeItemFromCart(itemId);
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(itemId);
  };

  const handleCheckout = () => {
    alert('Congratulations! The products are yours!');
    navigate('/');
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={`${item.id}-${index}`} className="cart-item">
                <div className="item-details">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-info">
                    <span className="item-title">{item.title}</span>
                    <div className="quantity-controls">
                      <button className="quantity-button" onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button className="quantity-button" onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                    </div>
                    <span className="item-price">{item.price} INR</span>
                    <span className="item-subtotal">Subtotal: {calculateSubTotal(item)} INR</span>
                  </div>
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                  <RiDeleteBinLine className="remove-icon" />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="summary-row">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">{calculateTotalPrice()} INR</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">VAT (10%):</span>
              <span className="summary-value">{(calculateTotalPrice() * 0.1).toFixed(2)} INR</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{(calculateTotalPrice() * 1.1).toFixed(2)} INR</span>
            </div>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
