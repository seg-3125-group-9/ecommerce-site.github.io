import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const ProductCard = ({
  product,
  onAddToCart,
  cartQuantity = 0,
  onUpdateQuantity
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(product.id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity > 0) {
      onUpdateQuantity(product.id, cartQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const displayPrice = product.salePrice !== undefined ? product.salePrice : product.price;
  const hasDiscount = product.salePrice !== undefined;
  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="h-100" style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease'
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}>

      {hasDiscount && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'linear-gradient(135deg, var(--accent-color), #ff4757)',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '0.8em',
          zIndex: 1
        }}>
          {discountPercentage}% OFF
        </div>
      )}

      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover'
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title style={{
          color: 'var(--primary-color)',
          fontSize: '1.1em',
          marginBottom: '10px'
        }}>
          {product.name}
        </Card.Title>

        <div style={{ marginBottom: '10px' }}>
          <small style={{ color: 'var(--text-color)', opacity: 0.8 }}>
            {product.material} • Sizes: {product.sizes.join(', ')}
          </small>
        </div>

        <div style={{ marginBottom: '15px' }}>
          {hasDiscount ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                textDecoration: 'line-through',
                color: 'gray',
                fontSize: '0.9em'
              }}>
                ${product.price.toFixed(2)}
              </span>
              <span style={{
                color: 'var(--sale-highlight)',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}>
                ${product.salePrice.toFixed(2)}
              </span>
            </div>
          ) : (
            <span style={{
              fontWeight: 'bold',
              color: 'var(--primary-color)',
              fontSize: '1.1em'
            }}>
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-auto">
          {cartQuantity === 0 ? (
            <Button
              variant="primary"
              onClick={handleAddToCart}
              style={{
                width: '100%',
                backgroundColor: 'var(--primary-color)',
                borderColor: 'var(--primary-color)',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: '600',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-color)';
                e.target.style.borderColor = 'var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--primary-color)';
                e.target.style.borderColor = 'var(--primary-color)';
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '8px',
                backgroundColor: '#f8f9fa',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <span style={{
                  color: 'var(--accent-color)',
                  fontWeight: '600',
                  fontSize: '0.85em'
                }}>
                  {cartQuantity} in cart
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                border: '1px solid #e9ecef',
                borderRadius: '6px',
                overflow: 'hidden',
                backgroundColor: 'white'
              }}>
                <button
                  onClick={handleDecrement}
                  style={{
                    border: 'none',
                    backgroundColor: '#f8f9fa',
                    color: 'var(--text-color)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    margin: '0'

                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--accent-color)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = 'var(--text-color)';
                  }}
                >
                  −
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  color: 'var(--primary-color)',
                  fontSize: '16px',
                  flex: '1',
                  minWidth: '40px',
                  borderLeft: '1px solid #e9ecef',
                  borderRight: '1px solid #e9ecef'
                }}>
                  {cartQuantity}
                </div>

                <button
                  onClick={handleIncrement}
                  style={{
                    border: 'none',
                    backgroundColor: '#f8f9fa',
                    color: 'var(--text-color)',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    margin: '0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--accent-color)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.color = 'var(--text-color)';
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
