import React from 'react';
import { Container, Row, Col, Button, Card, ButtonGroup } from 'react-bootstrap';
import { HiOutlineShoppingBag, HiOutlineTrash } from 'react-icons/hi';
import BackButton from './BackButton';

const CartView = ({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onProceedToCheckout,
  onContinueShopping
}) => {
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.salePrice !== undefined ? item.salePrice : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return cart.reduce((savings, item) => {
      if (item.salePrice !== undefined) {
        return savings + ((item.price - item.salePrice) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (item, newQuantity) => {
    onUpdateQuantity(item.id, newQuantity);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const totalItems = getTotalItems();

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Card style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '40px 20px'
            }}>
              <Card.Body>
                <div style={{ fontSize: '4em', marginBottom: '20px', color: 'var(--primary-color)' }}>
                  <HiOutlineShoppingBag />
                </div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '15px' }}>
                  Your cart is empty
                </h3>
                <p style={{ color: 'var(--text-color)', marginBottom: '30px' }}>
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button
                  variant="primary"
                  onClick={onContinueShopping}
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    padding: '12px 30px',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: '600'
                  }}
                >
                  Start Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '1200px' }}>
      <Row>
        <Col lg={8}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>
              Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
            </h2>
            {savings > 0 && (
              <p style={{
                color: 'var(--accent-color)',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}>
                You're saving ${savings.toFixed(2)} today! 🎉
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {cart.map((item) => (
              <Card key={item.id} style={{
                backgroundColor: 'white',
                border: '1px solid #e8e9ea',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                <Card.Body style={{ padding: '24px' }}>
                  <Row className="align-items-center g-4">
                    <Col xs={12} sm={3} md={2}>
                      <div style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#f8f9fa'
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        {item.salePrice && (
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            fontSize: '0.75em',
                            fontWeight: 'bold',
                            padding: '4px 8px',
                            borderRadius: '12px'
                          }}>
                            SALE
                          </div>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} sm={9} md={4}>
                      <div style={{ paddingLeft: '8px' }}>
                        <h5 style={{
                          color: 'var(--primary-color)',
                          marginBottom: '8px',
                          fontSize: '1.2em',
                          fontWeight: '600',
                          lineHeight: '1.3'
                        }}>
                          {item.name}
                        </h5>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <span style={{
                            color: 'var(--text-color)',
                            opacity: 0.8,
                            fontSize: '0.9em'
                          }}>
                            Material: {item.material}
                          </span>
                          <span style={{
                            color: 'var(--text-color)',
                            opacity: 0.8,
                            fontSize: '0.9em'
                          }}>
                            Color: {item.color}
                          </span>
                          <span style={{
                            color: 'var(--text-color)',
                            opacity: 0.8,
                            fontSize: '0.9em'
                          }}>
                            Sizes: {item.sizes.join(', ')}
                          </span>
                        </div>
                      </div>
                    </Col>

                    <Col xs={6} md={2}>
                      <div style={{ textAlign: 'center' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '0.85em',
                          color: 'var(--text-color)',
                          fontWeight: '600',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Quantity
                        </label>
                        <div style={{
                          display: 'inline-flex',
                          border: '2px solid #f1f3f4',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundColor: '#fafafa',
                          alignItems: 'center' // Ensure all items align properly
                        }}>
                          <Button
                            variant="light"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--text-color)',
                              width: '36px',
                              height: '36px', // Consistent height
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.1em',
                              fontWeight: 'bold',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              padding: '0', // Remove default padding
                              margin: '0' // Remove any default margins
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'var(--accent-color)';
                              e.target.style.color = 'white';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = 'var(--text-color)';
                              e.target.style.transform = 'scale(1)';
                            }}
                            onMouseDown={(e) => {
                              e.target.style.transform = 'scale(0.95)';
                            }}
                            onMouseUp={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                          >
                            −
                          </Button>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            fontWeight: 'bold',
                            color: 'var(--primary-color)',
                            width: '50px',
                            height: '36px', // Match button height exactly
                            fontSize: '1em',
                            borderLeft: 'none', // Remove borders since parent has border
                            borderRight: 'none',
                            border: 'none', // Ensure no border conflicts
                            userSelect: 'none',
                            lineHeight: '1', // Prevent line-height from affecting vertical position
                            margin: '0', // Remove any default margins
                            padding: '0' // Remove any default padding
                          }}>
                            {item.quantity}
                          </div>
                          <Button
                            variant="light"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            style={{
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'var(--text-color)',
                              width: '36px',
                              height: '36px', // Consistent height
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.1em',
                              fontWeight: 'bold',
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              padding: '0', // Remove default padding
                              margin: '0' // Remove any default margins
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = 'var(--accent-color)';
                              e.target.style.color = 'white';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = 'var(--text-color)';
                              e.target.style.transform = 'scale(1)';
                            }}
                            onMouseDown={(e) => {
                              e.target.style.transform = 'scale(0.95)';
                            }}
                            onMouseUp={(e) => {
                              e.target.style.transform = 'scale(1.05)';
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </Col>

                    <Col xs={6} md={3}>
                      <div style={{ textAlign: 'right' }}>
                        <label style={{
                          display: 'block',
                          fontSize: '0.85em',
                          color: 'var(--text-color)',
                          fontWeight: '600',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Price
                        </label>
                        {item.salePrice !== undefined ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                            <div style={{
                              textDecoration: 'line-through',
                              color: '#999',
                              fontSize: '0.9em'
                            }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div style={{
                              color: 'var(--accent-color)',
                              fontWeight: 'bold',
                              fontSize: '1.3em'
                            }}>
                              ${(item.salePrice * item.quantity).toFixed(2)}
                            </div>
                            <div style={{
                              backgroundColor: 'var(--accent-color)',
                              color: 'white',
                              fontSize: '0.7em',
                              fontWeight: 'bold',
                              padding: '2px 6px',
                              borderRadius: '8px'
                            }}>
                              Save ${((item.price - item.salePrice) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            fontWeight: 'bold',
                            color: 'var(--primary-color)',
                            fontSize: '1.3em'
                          }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={1}>
                      <div style={{ textAlign: 'center' }}>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={() => onRemoveFromCart(item.id)}
                          style={{
                            backgroundColor: '#fff5f5',
                            border: '2px solid #fed7d7',
                            color: 'var(--accent-color)',
                            borderRadius: '12px',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1em',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'var(--accent-color)';
                            e.target.style.color = 'white';
                            e.target.style.borderColor = 'var(--accent-color)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#fff5f5';
                            e.target.style.color = 'var(--accent-color)';
                            e.target.style.borderColor = '#fed7d7';
                          }}
                        >
                          <HiOutlineTrash />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        <Col lg={4}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <Card style={{
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <Card.Body>
                <h4 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '20px',
                  borderBottom: '2px solid var(--bg-color)',
                  paddingBottom: '10px'
                }}>
                  Order Summary
                </h4>

                <div style={{ marginBottom: '15px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: 'var(--text-color)' }}>
                      Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})
                    </span>
                    <span style={{ fontWeight: '600', color: 'var(--primary-color)' }}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {savings > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: 'var(--accent-color)' }}>
                        You Save
                      </span>
                      <span style={{
                        fontWeight: 'bold',
                        color: 'var(--accent-color)'
                      }}>
                        -${savings.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <hr style={{ margin: '15px 0' }} />

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  fontSize: '1.2em'
                }}>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                  }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  onClick={onProceedToCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--primary-color)',
                    borderColor: 'var(--primary-color)',
                    padding: '15px',
                    fontSize: '1.1em',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: '600',
                    marginBottom: '15px'
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
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline-secondary"
                  onClick={onContinueShopping}
                  style={{
                    width: '100%',
                    borderColor: 'var(--primary-color)',
                    color: 'var(--primary-color)',
                    fontFamily: 'Quicksand, sans-serif',
                    fontWeight: '600'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--primary-color)';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'var(--primary-color)';
                  }}
                >
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartView;
