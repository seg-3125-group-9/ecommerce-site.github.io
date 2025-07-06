import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    const discountPercent = product.salePrice
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    const handleAddToCart = () => {
        onAddToCart(product);
    };

    return (
        <div className="Product-card">
            <img
                src={product.image}
                alt={product.name}
                className="Product-img"
                loading="lazy"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x250?text=No+Image';
                }}
            />

            <h3>{product.name}</h3>

            {/* Informative: Clear product details */}
            <p style={{ fontSize: '0.9em', color: 'var(--text-color)', opacity: 0.8 }}>
                {product.material} • {product.sizes?.join(', ')}
            </p>

            <p className="Product-price">
                {product.salePrice ? (
                    <>
                        <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                            ${product.price.toFixed(2)}
                        </span>{' '}
                        <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                    </>
                ) : (
                    <span>${product.price.toFixed(2)}</span>
                )}
            </p>

            {/* Incite to Action: Urgent sale messaging */}
            {product.salePrice && (
                <p className="discount-badge">
                    {discountPercent}% OFF - Limited Time!
                </p>
            )}

            {/* Incite to Action: Clear call-to-action */}
            <button onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
