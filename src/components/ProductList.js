import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <section className="Product-list">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}

            {/* Engage: Friendly messaging when no products */}
            {products.length === 0 && (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.1em' }}>
                    We couldn't find any items matching your filters. Try adjusting your selection to discover more great pieces!
                </p>
            )}
        </section>
    );
};

export default ProductList;
