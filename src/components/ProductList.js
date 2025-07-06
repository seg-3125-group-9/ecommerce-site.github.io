import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({
  products,
  onAddToCart,
  getCartItemQuantity,
  onUpdateQuantity
}) => {
  return (
    <Container fluid>
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              cartQuantity={getCartItemQuantity(product.id)}
              onUpdateQuantity={onUpdateQuantity}
            />
          </Col>
        ))}
      </Row>
      {products.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <h4 style={{ color: 'var(--text-color)' }}>
              No products found matching your filters.
            </h4>
            <p style={{ color: 'var(--text-color)', opacity: 0.7 }}>
              Try adjusting your search criteria.
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductList;
