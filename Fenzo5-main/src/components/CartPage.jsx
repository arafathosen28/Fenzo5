import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';

const CartPage = ({ 
  cart, 
  removeFromCart, 
  getTotalPrice, 
  getDeliveryCharge,
  getGrandTotal,
  setCurrentPage,
  settings
}) => {
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fadeIn">
        <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      <div className="space-y-4 mb-6">
        {cart.map((item) => {
          const itemImage = item.images && item.images.length > 0 
            ? item.images[0] 
            : 'https://via.placeholder.com/100x100?text=No+Image';
          
          const itemPrice = item.price || 0;
          const itemDeliveryCharge = item.deliveryCharge || 0;

          return (
            <div 
              key={item.cartId}
              className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/50 animate-slideInUp hover:shadow-xl transition-all"
            >
              <div className="flex gap-4">
                <img 
                  src={itemImage} 
                  alt={item.name || 'Product'}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                    {item.name || 'Unnamed Product'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {item.code || 'N/A'}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs sm:text-sm text-gray-700">
                    {item.selectedSize && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Color: {item.selectedColor}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-gray-900">৳{itemPrice}</span>
                    {itemDeliveryCharge > 0 && (
                      <span className="text-xs text-gray-500 ml-2">
                        +৳{itemDeliveryCharge} delivery
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all transform hover:scale-110"
                  aria-label="Remove from cart"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 animate-slideInUp">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal ({cart.length} items)</span>
            <span className="font-semibold">৳{getTotalPrice()}</span>
          </div>
          
          {getDeliveryCharge() > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Delivery Charge</span>
              <span className="font-semibold">৳{getDeliveryCharge()}</span>
            </div>
          )}

          {/* Free Delivery Message */}
          {getDeliveryCharge() === 0 && getTotalPrice() > 0 && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <span className="text-lg">🎉</span>
              <span className="text-sm font-semibold">Free Delivery!</span>
            </div>
          )}

          {/* Progress to Free Delivery */}
          {getDeliveryCharge() > 0 && settings && settings.freeDeliveryThreshold && (
            <div className="bg-blue-50 px-3 py-2 rounded-lg">
              <p className="text-xs text-blue-700">
                Add ৳{Math.max(0, settings.freeDeliveryThreshold - getTotalPrice()).toFixed(0)} more for free delivery! 🚚
              </p>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((getTotalPrice() / settings.freeDeliveryThreshold) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Grand Total</span>
            <span>৳{getGrandTotal()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex-1 bg-white border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => setCurrentPage('checkout')}
            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;