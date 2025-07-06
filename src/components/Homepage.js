import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ProductCard from './ProductCard';
import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineRefresh,
  HiOutlineChatAlt,
  HiFire
} from 'react-icons/hi';
import {
  IoShirtOutline,
  IoWomanOutline,
  IoManOutline,
  IoSchoolOutline
} from 'react-icons/io5';
import { FaChild } from 'react-icons/fa';

const Homepage = ({
  onSectionChange,
  featuredProducts,
  onAddToCart,
  getCartItemQuantity,
  onUpdateQuantity
}) => {
  const categories = [
    {
      name: 'SALE',
      icon: '🔥', // Changed to colored fire emoji
      description: 'Up to 50% off on selected items',
      sections: [],
      sale: true,
      sectionKey: 'sale'
    },
    {
      name: 'WOMEN',
      icon: <IoWomanOutline />,
      description: 'Stylish and comfortable clothing for every occasion',
      sections: ['tops', 'bottoms', 'shoes', 'dresses'],
      sectionKey: 'women'
    },
    {
      name: 'MEN',
      icon: <IoManOutline />,
      description: 'Quality menswear from casual to formal',
      sections: ['tops', 'bottoms', 'shoes'],
      sectionKey: 'men'
    },
    {
      name: 'KIDS',
      icon: <FaChild />,
      description: 'Fun and durable clothing for little ones',
      sections: ['tops', 'bottoms', 'shoes'],
      sectionKey: 'kids'
    }
  ];

  return (
    <Container fluid className="px-0" style={{ marginTop: '40px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
        color: 'white',
        padding: '60px 40px',
        borderRadius: '12px',
        textAlign: 'center',
        margin: '0 20px 50px 20px'
      }}>
        <Container>
          <h2 style={{
            fontSize: '2.5em',
            marginBottom: '15px',
            color: 'white',
            fontFamily: 'Playfair Display, serif'
          }}>
            Discover Your Perfect Style
          </h2>
          <p style={{
            fontSize: '1.2em',
            marginBottom: '30px',
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            From trendy essentials to timeless classics, find everything you need to express your unique style.
          </p>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button
              variant="light"
              size="lg"
              onClick={() => onSectionChange('sale')}
              style={{
                padding: '15px 30px',
                fontSize: '1.1em',
                borderRadius: '8px',
                fontFamily: 'Quicksand, sans-serif',
                fontWeight: '600',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🔥 Shop Sale - Up to 50% Off
            </Button>
          </div>
        </Container>
      </section>

      <Container>
        {/* Featured Categories */}
        <section style={{ marginBottom: '50px' }}>
          <h3 style={{
            textAlign: 'center',
            color: 'var(--primary-color)',
            marginBottom: '30px',
            fontSize: '2em',
            fontFamily: 'Playfair Display, serif'
          }}>
            Shop by Category
          </h3>

          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.name} xs={12} sm={6} md={3}>
                <Card
                  style={{
                    backgroundColor: category.sale ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' : 'white',
                    padding: '30px 20px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    border: '2px solid transparent',
                    height: '100%',
                    background: category.sale ? 'linear-gradient(135deg, #ff6b6b, #ee5a52)' : 'white'
                  }}
                  onClick={() => onSectionChange(category.sectionKey)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <Card.Body>
                    <div style={{
                      fontSize: '3em',
                      marginBottom: '15px',
                      color: category.sale ? 'white' : 'var(--accent-color)' // Changed to accent color for non-sale cards
                    }}>
                      {category.icon}
                    </div>
                    <h4 style={{
                      color: category.sale ? 'white' : 'var(--primary-color)',
                      margin: '15px 0 10px 0',
                      fontSize: '1.3em'
                    }}>
                      {category.name}
                    </h4>
                    <p style={{
                      color: category.sale ? 'white' : 'var(--text-color)',
                      opacity: category.sale ? 1 : 0.8,
                      margin: '0'
                    }}>
                      {category.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products */}
        <section style={{ marginBottom: '50px' }}>
          <h3 style={{
            textAlign: 'center',
            color: 'var(--primary-color)',
            marginBottom: '10px',
            fontSize: '2em',
            fontFamily: 'Playfair Display, serif'
          }}>
            Featured Products
          </h3>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-color)',
            opacity: 0.8,
            marginBottom: '30px',
            fontSize: '1.1em'
          }}>
            Handpicked favorites from our latest collection
          </p>

          <Row className="g-4">
            {featuredProducts.map(product => (
              <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  cartQuantity={getCartItemQuantity ? getCartItemQuantity(product.id) : 0}
                  onUpdateQuantity={onUpdateQuantity}
                />
              </Col>
            ))}
          </Row>
        </section>

        {/* Why Choose Us */}
        <section style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            textAlign: 'center',
            color: 'var(--primary-color)',
            marginBottom: '30px',
            fontSize: '2em',
            fontFamily: 'Playfair Display, serif'
          }}>
            Why Choose Wardrobe & Co.?
          </h3>

          <Row className="g-4">
            {[
              { icon: <HiOutlineTruck />, title: 'Free Shipping', description: 'Free delivery on orders over $50' },
              { icon: <HiOutlineRefresh />, title: 'Easy Returns', description: '30-day hassle-free returns' },
              { icon: <HiOutlineShieldCheck />, title: 'Quality Guarantee', description: 'Premium materials and craftsmanship' },
              { icon: <HiOutlineChatAlt />, title: '24/7 Support', description: 'Always here to help you' }
            ].map((benefit, index) => (
              <Col key={index} xs={12} sm={6} md={3} className="text-center">
                <div style={{
                  fontSize: '2.5em',
                  marginBottom: '15px',
                  color: 'var(--accent-color)' // Changed to accent color
                }}>
                  {benefit.icon}
                </div>
                <h4 style={{
                  color: 'var(--primary-color)',
                  margin: '15px 0 10px 0'
                }}>
                  {benefit.title}
                </h4>
                <p style={{
                  color: 'var(--text-color)',
                  opacity: 0.8,
                  margin: '0'
                }}>
                  {benefit.description}
                </p>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Container>
  );
};

export default Homepage;
