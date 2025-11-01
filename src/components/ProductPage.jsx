import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductPage = ({ product, setCurrentPage, addToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [errors, setErrors] = useState({ size: false, color: false });
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const successRef = useRef(null); // 👈 for smooth scroll to success message

  // Preload all product images
  useEffect(() => {
    if (product && product.images) {
      product.images.forEach((imgSrc, index) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [index]: true }));
        };
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const validateSelection = () => {
    const newErrors = {
      size: !selectedSize,
      color: !selectedColor
    };
    setErrors(newErrors);
    if (newErrors.size || newErrors.color) {
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (validateSelection()) {
      addToCart(product, selectedSize, selectedColor);
      setErrors({ size: false, color: false });
      setShowSuccess(true);

      // 👇 Scroll to top smoothly so mobile users can see the success alert
      if (successRef.current) {
        successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleOrderNow = () => {
    if (validateSelection()) {
      addToCart(product, selectedSize, selectedColor);
      setCurrentPage('cart');
      setErrors({ size: false, color: false });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 animate-fadeIn">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all hover:gap-3"
      >
        <ChevronLeft size={20} /> Back to Products
      </button>

      {/* ✅ Success Alert */}
      {showSuccess && (
        <div
          ref={successRef}
          className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-slideInDown flex items-center gap-2 sticky top-0 z-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Added to cart successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Product Images */}
        <div className="relative animate-slideInLeft">
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl relative">
            {!imagesLoaded[currentImageIndex] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={product.images[currentImageIndex]}
              alt={`${product.name} - Image ${currentImageIndex + 1}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imagesLoaded[currentImageIndex] ? 'opacity-100' : 'opacity-0'
              }`}
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all hover:scale-110 shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl animate-slideInRight">
          {/* Top Section: Price (left) and Code (right) */}
          <div className="flex justify-between items-start">
            <p className="text-3xl font-bold text-red-600">৳{product.price}</p>
            <p className="text-gray-500 text-sm">Code: {product.code}</p>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

          {/* Stock */}
          <p className="text-sm text-gray-600 mt-3">• Stock: {product.stock} prices</p>

          {/* Description */}
          <p className="text-gray-600 mt-3">{product.description}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Select Size {errors.size && <span className="text-red-500 text-sm ml-2">* Required</span>}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setErrors({ ...errors, size: false });
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all transform hover:scale-105 ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900 scale-105 shadow-md'
                      : errors.size
                      ? 'bg-white border-red-300 hover:border-red-500'
                      : 'bg-white border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Select Color {errors.color && <span className="text-red-500 text-sm ml-2">* Required</span>}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setErrors({ ...errors, color: false });
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all transform hover:scale-105 ${
                    selectedColor === color
                      ? 'bg-gray-900 text-white border-gray-900 scale-105 shadow-md'
                      : errors.color
                      ? 'bg-white border-red-300 hover:border-red-500'
                      : 'bg-white border-gray-300 hover:border-gray-900'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ Action Buttons (Two Separate Lines) */}
          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-white border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95"
            >
              Add to Cart
            </button>
            <button
              onClick={handleOrderNow}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
