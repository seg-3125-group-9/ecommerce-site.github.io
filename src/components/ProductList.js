import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <Container>
        <div className={styles.emptyProducts}>
          No products found matching your criteria.
        </div>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
