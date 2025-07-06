import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = ({ orderDetails, onStartShopping, onTakeSurvey }) => {
  return (
    <div className={styles.orderConfirmation}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className={styles.confirmationContent}>
              <Card.Body>
                <div className={styles.successIcon}>✅</div>
                <h2>Order Confirmed!</h2>
                <p className={styles.confirmationMessage}>
                  Thank you for shopping with us! Your order has been successfully placed and you'll receive a confirmation email shortly.
                </p>

                <Card className={`${styles.orderDetails} mb-4`}>
                  <Card.Body>
                    <h3>Order Details</h3>
                    <div className={styles.orderInfo}>
                      <p><strong>Order Number:</strong> #{Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
                      <p><strong>Name:</strong> {orderDetails?.firstName} {orderDetails?.lastName}</p>
                      <p><strong>Email:</strong> {orderDetails?.email}</p>
                      <address>
                        <strong>Shipping Address:</strong><br />
                        {orderDetails?.address}<br />
                        {orderDetails?.city}, {orderDetails?.state} {orderDetails?.zipCode}
                      </address>
                    </div>
                  </Card.Body>
                </Card>

                <div className={styles.nextSteps}>
                  <h4>What happens next?</h4>
                  <ul>
                    <li>📧 You'll receive an email confirmation</li>
                    <li>📦 Your order will be processed within 1-2 business days</li>
                    <li>🚚 Free shipping on orders over $75</li>
                    <li>📱 Track your order with the link in your email</li>
                  </ul>
                </div>

                <div className={styles.actionButtons}>
                  <Button variant="primary" size="lg" onClick={onStartShopping}>
                    Continue Shopping
                  </Button>
                  <Button variant="outline-primary" size="lg" onClick={onTakeSurvey}>
                    Help Us Improve 🎉
                  </Button>
                </div>

                <div className={styles.thankYouMessage}>
                  <p>We appreciate your business and hope you love your new items!</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderConfirmation;
