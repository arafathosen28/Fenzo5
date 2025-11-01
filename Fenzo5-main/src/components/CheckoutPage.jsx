import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';

const CheckoutPage = ({ 
  cart, 
  checkoutData, 
  setCheckoutData, 
  getTotalPrice, 
  getDeliveryCharge,
  getGrandTotal,
  handleCheckout 
}) => {
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    address: false,
    paymentMethod: false
  });

  const paymentMethods = [
    { id: 'bKash', name: 'bKash', icon: '📱' },
    { id: 'Nagad', name: 'Nagad', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' }
  ];

  const validateForm = () => {
    const newErrors = {
      name: !checkoutData.name.trim(),
      phone: !checkoutData.phone.trim(),
      address: !checkoutData.address.trim(),
      paymentMethod: !checkoutData.paymentMethod
    };
    
    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleCheckout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 animate-slideInLeft">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name {errors.name && <span className="text-red-500">*Required</span>}
                </label>
                <input
                  type="text"
                  value={checkoutData.name}
                  onChange={(e) => {
                    setCheckoutData({ ...checkoutData, name: e.target.value });
                    setErrors({ ...errors, name: false });
                  }}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.name 
                      ? 'border-red-300 bg-red-50 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number {errors.phone && <span className="text-red-500">*Required</span>}
                </label>
                <input
                  type="tel"
                  value={checkoutData.phone}
                  onChange={(e) => {
                    setCheckoutData({ ...checkoutData, phone: e.target.value });
                    setErrors({ ...errors, phone: false });
                  }}
                  placeholder="01XXXXXXXXX"
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone 
                      ? 'border-red-300 bg-red-50 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-gray-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Address {errors.address && <span className="text-red-500">*Required</span>}
                </label>
                <textarea
                  value={checkoutData.address}
                  onChange={(e) => {
                    setCheckoutData({ ...checkoutData, address: e.target.value });
                    setErrors({ ...errors, address: false });
                  }}
                  placeholder="Enter your complete delivery address"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.address 
                      ? 'border-red-300 bg-red-50 focus:ring-red-400' 
                      : 'border-gray-300 focus:ring-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Payment Method {errors.paymentMethod && <span className="text-red-500">*Required</span>}
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setCheckoutData({ ...checkoutData, paymentMethod: method.name });
                    setErrors({ ...errors, paymentMethod: false });
                  }}
                  className={`p-4 rounded-lg border-2 font-medium transition-all transform hover:scale-105 ${
                    checkoutData.paymentMethod === method.name
                      ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                      : errors.paymentMethod
                      ? 'bg-red-50 border-red-300 text-gray-700 hover:bg-red-100'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="text-sm">{method.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 sticky top-24 animate-slideInRight">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
              {cart.map((item) => {
                const itemImage = item.images && item.images.length > 0 
                  ? item.images[0] 
                  : 'https://via.placeholder.com/50x50?text=No+Image';
                
                return (
                  <div key={item.cartId} className="flex gap-3 text-sm">
                    <img 
                      src={itemImage} 
                      alt={item.name || 'Product'}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 line-clamp-1">
                        {item.name || 'Unnamed Product'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.selectedSize} · {item.selectedColor}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        ৳{item.price || 0}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">৳{getTotalPrice()}</span>
              </div>
              
              {getDeliveryCharge() > 0 && (
                <div className="flex justify-between text-gray-700">
                  <span>Delivery</span>
                  <span className="font-semibold">৳{getDeliveryCharge()}</span>
                </div>
              )}
              
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>৳{getGrandTotal()}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;