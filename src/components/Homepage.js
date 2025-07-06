import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import {
  HiOutlineSparkles,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineRefresh,
  HiOutlineChatAlt
} from 'react-icons/hi';
import {
  IoShirtOutline,
  IoWomanOutline,
  IoManOutline,
  IoSchoolOutline
} from 'react-icons/io5';
import styles from './Homepage.module.css';

const Homepage = ({ onSectionChange, featuredProducts, onAddToCart }) => {
  const categories = [
    {
      id: 'sale',
      title: 'SALE: UP TO 50% OFF',
      icon: '🔥', // Changed from <HiOutlineFire /> to actual fire emoji
      description: 'Limited time offers!',
      isSale: true
    },
    {
      id: 'women-all',
      title: 'WOMEN',
      icon: <IoWomanOutline />,
      description: 'Elegant & trendy styles'
    },
    {
      id: 'men-all',
      title: 'MEN',
      icon: <IoManOutline />,
      description: 'Modern & classic looks'
    },
    {
      id: 'kids-all',
      title: 'KIDS',
      icon: <IoSchoolOutline />,
      description: 'Fun & comfortable wear'
    }
  ];

  const benefits = [
    {
      icon: <HiOutlineTruck />,
      title: 'Free Shipping',
      description: 'On orders over $75'
    },
    {
      icon: <HiOutlineRefresh />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <HiOutlineShieldCheck />,
      title: 'Quality Guarantee',
      description: 'Premium materials only'
    },
    {
      icon: <HiOutlineChatAlt />,
      title: 'Perfect Fit',
      description: 'Size guide & expert help'
    }
  ];

  return (
    <div className={styles.homepage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <div className={styles.heroContent}>
            <h2>Discover Your Perfect Style</h2>
            <p className={styles.heroSubtitle}>
              Welcome to Wardrobe & Co.! We've curated the perfect collection just for you.
              From timeless classics to the latest trends, find pieces that make you feel confident and stylish.
            </p>
            <div className={styles.heroActions}>
              <Button
                variant="light"
                size="lg"
                className={styles.heroBtn}
                onClick={() => onSectionChange('sale')}
              >
                Shop Sale - Up to 50% Off! 🔥
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className={styles.heroBtn}
                onClick={() => onSectionChange('all')}
              >
                Browse All Products
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className={styles.featuredCategories}>
        <h3>Shop by Category</h3>
        <Container>
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.id} xs={6} md={4} lg={3}>
                <Card
                  className={`${styles.categoryCard} ${category.isSale ? styles.saleCategory : ''} h-100`}
                  onClick={() => onSectionChange(category.id)}
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className={styles.categoryIcon}>{category.icon}</div>
                    <Card.Title as="h4">{category.title}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className={styles.featuredProducts}>
        <h3>Pieces Our Customers Can't Stop Talking About</h3>
        <p className={styles.sectionSubtitle}>
          Bestsellers, new arrivals, and trending items curated just for you
        </p>
        <Container>
          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card className={`${styles.featuredProductCard} h-100`}>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    className={styles.featuredProductImage}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title as="h5">{product.name}</Card.Title>
                    <div className={`${styles.featuredProductPrice} mt-auto`}>
                      {product.salePrice ? (
                        <>
                          <span className="text-decoration-line-through text-muted me-2">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-danger fw-bold">
                            ${product.salePrice.toFixed(2)}
                          </span>
                          <div className="badge bg-danger ms-2">
                            Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                          </div>
                        </>
                      ) : (
                        <span className="fw-bold text-primary-custom">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      className={`${styles.featuredAddBtn} mt-3`}
                      onClick={() => onAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyChooseUs}>
        <h3>Why Shop With Us?</h3>
        <Container>
          <Row className="g-4">
            {benefits.map((benefit, index) => (
              <Col key={index} xs={6} md={3}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
