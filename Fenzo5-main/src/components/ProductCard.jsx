import React, { useState, useEffect } from 'react';

const ProductCard = ({ product, setSelectedProduct, setCurrentPage }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = product.images[0];
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [product.images]);

  const handleClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/50 transform hover:scale-105 hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Actual Image */}
        <img 
          src={product.images[0]} 
          alt={product.name}
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover hover:scale-110 transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ 
            transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
            willChange: 'transform, opacity'
          }}
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.code}</p>
        <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mt-2">
          ৳{product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
