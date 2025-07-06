import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import BackButton from './BackButton';
import styles from './CartView.module.css';

const CartView = ({ cart, onRemoveFromCart, onProceedToCheckout, onContinueShopping }) => {
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.salePrice !== undefined ? item.salePrice : item.price);
  }, 0);

  const totalSavings = cart.reduce((sum, item) => {
    return sum + (item.salePrice !== undefined ? item.price - item.salePrice : 0);
  }, 0);

  return (
    <div className={styles.cartView}>
      <Container>
        <div className={styles.cartHeader}>
          <div className={styles.backButtonContainer}>
            <BackButton onClick={onContinueShopping}>
              Continue Shopping
            </BackButton>
          </div>
          <h2>Your Shopping Cart</h2>
          <div style={{ width: '120px' }}></div> {/* Spacer for centering */}
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCartContainer}>
            <Card className={styles.emptyCart}>
              <Card.Body>
                <div className={styles.emptyCartIcon}>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added anything to your cart yet. Let's find you some amazing pieces!</p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={onContinueShopping}
                >
                  Start Shopping
                </Button>
              </Card.Body>
            </Card>
          </div>
        ) : (
          <Row>
            <Col lg={8}>
              <div className={styles.cartItems}>
                {cart.map((item, index) => (
                  <Card key={index} className={styles.cartItem}>
                    <div className={styles.cartItemContent}>
                      <Row className="align-items-start">
                        <Col xs={4} md={3}>
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className={styles.cartItemImage}
                          />
                        </Col>
                        <Col xs={8} md={6}>
                          <div className={styles.cartItemDetails}>
                            <div className={styles.cartItemHeader}>
                              <h4>{item.name}</h4>
                              <div className={styles.itemMaterial}>
                                {item.material}
                              </div>
                              {item.sizes && (
                                <div className={styles.itemSizes}>
                                  Available sizes: {item.sizes.join(', ')}
                                </div>
                              )}
                            </div>
                            
                            <div className={styles.itemPricing}>
                              <div className={styles.priceRow}>
                                {item.salePrice ? (
                                  <>
                                    <span className={styles.originalPrice}>
                                      ${item.price.toFixed(2)}
                                    </span>
                                    <span className={styles.salePrice}>
                                      ${item.salePrice.toFixed(2)}
                                    </span>
                                    <span className={styles.savingsBadge}>
                                      Save ${(item.price - item.salePrice).toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className={styles.regularPrice}>
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={3}>
                          <div className={styles.itemActions}>
                            <Button
                              variant="outline-danger"
                              className={styles.removeBtn}
                              onClick={() => onRemoveFromCart(index)}
                            >
                              <span>🗑️</span> Remove
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <div className={styles.cartSummaryContainer}>
                <div className={styles.cartSummary}>
                  <div className={styles.summaryHeader}>
                    <h3>Order Summary</h3>
                  </div>

                  {totalSavings > 0 && (
                    <div className={styles.savingsSummary}>
                      <p className={styles.savingsText}>
                        🎉 You're saving ${totalSavings.toFixed(2)} today!
                      </p>
                    </div>
                  )}

                  <div className={styles.totalSummary}>
                    <div className={styles.totalRow}>
                      <span className={styles.totalLabel}>Total:</span>
                      <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    variant="primary" 
                    size="lg"
                    className={styles.checkoutBtn}
                    onClick={onProceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CartView;
