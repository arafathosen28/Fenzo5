import React from 'react';
import ProductCard from './ProductCard';

const HomePage = ({ products, setSelectedProduct, setCurrentPage }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fadeIn" 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard 
                product={product}
                setSelectedProduct={setSelectedProduct}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;