import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onAddToCart }) => {
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : null;

  return (
    <Card className={styles.productCard}>
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className={styles.productImg}
        loading="lazy"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x250?text=No+Image';
        }}
      />
      <Card.Body>
        <Card.Title as="h3">{product.name}</Card.Title>

        {discountPercentage && (
          <div className={styles.discountBadge}>
            {discountPercentage}% OFF
          </div>
        )}

        <div className={styles.productDetails}>
          <div className={styles.productMaterial}>{product.material}</div>
          {product.sizes && (
            <div className={styles.productSizes}>
              Sizes: {product.sizes.join(', ')}
            </div>
          )}
        </div>

        <div className={styles.productPrice}>
          {product.salePrice ? (
            <>
              <span className={styles.originalPrice}>
                ${product.price.toFixed(2)}
              </span>
              <span className={styles.salePrice}>
                ${product.salePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-primary-custom">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          variant="primary"
          className={styles.addToCartBtn}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
