import React from 'react';

const Homepage = ({ onSectionChange, featuredProducts, onAddToCart }) => {
    const handleExploreSection = (section) => {
        onSectionChange(section);
    };

    return (
        <div className="homepage">
            <section className="hero-section">
                <div className="hero-content">
                    <h2>Discover Your Perfect Style</h2>
                    <p className="hero-subtitle">
                        Welcome to Wardrobe & Co.! From everyday essentials to statement pieces,
                        we've curated the perfect collection just for you.
                    </p>
                    <div className="hero-actions">
                        <button
                            onClick={() => handleExploreSection('sale')}
                            className="btn-primary hero-btn"
                        >
                            Shop Sale - Up to 50% Off! 🔥
                        </button>
                        <button
                            onClick={() => handleExploreSection('all')}
                            className="btn-secondary hero-btn"
                        >
                            Explore All Products
                        </button>
                    </div>
                </div>
            </section>

            <section className="featured-categories">
                <h3>Shop by Category</h3>
                <div className="category-grid">
                    <div
                        className="category-card"
                        onClick={() => handleExploreSection('women-all')}
                    >
                        <div className="category-icon">👗</div>
                        <h4>Women</h4>
                        <p>Discover the latest trends</p>
                    </div>
                    <div
                        className="category-card"
                        onClick={() => handleExploreSection('men-all')}
                    >
                        <div className="category-icon">👔</div>
                        <h4>Men</h4>
                        <p>Classic & contemporary styles</p>
                    </div>
                    <div
                        className="category-card"
                        onClick={() => handleExploreSection('kids-all')}
                    >
                        <div className="category-icon">👶</div>
                        <h4>Kids</h4>
                        <p>Fun & comfortable wear</p>
                    </div>
                    <div
                        className="category-card sale-category"
                        onClick={() => handleExploreSection('sale')}
                    >
                        <div className="category-icon">🏷️</div>
                        <h4>Sale</h4>
                        <p>Amazing deals await!</p>
                    </div>
                </div>
            </section>

            {featuredProducts && featuredProducts.length > 0 && (
                <section className="featured-products">
                    <h3>Trending Now</h3>
                    <p className="section-subtitle">Pieces our customers can't stop talking about</p>
                    <div className="featured-products-grid">
                        {featuredProducts.slice(0, 4).map(product => (
                            <div key={product.id} className="featured-product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="featured-product-image"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/200x250?text=No+Image';
                                    }}
                                />
                                <div className="featured-product-info">
                                    <h5>{product.name}</h5>
                                    <div className="featured-product-price">
                                        {product.salePrice ? (
                                            <>
                                                <span className="original-price">${product.price.toFixed(2)}</span>
                                                <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="regular-price">${product.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        className="btn-primary featured-add-btn"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="why-choose-us">
                <h3>Why Shop With Us?</h3>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <div className="benefit-icon">🚚</div>
                        <h4>Free Shipping</h4>
                        <p>On orders over $50</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">↩️</div>
                        <h4>Easy Returns</h4>
                        <p>30-day return policy</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">💬</div>
                        <h4>Customer Support</h4>
                        <p>We're here to help!</p>
                    </div>
                    <div className="benefit-item">
                        <div className="benefit-icon">✨</div>
                        <h4>Quality Guarantee</h4>
                        <p>Premium materials & craftsmanship</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
