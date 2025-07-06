import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineMail,
  HiOutlineTruck,
  HiOutlineGift,
  HiOutlineDocumentText
} from 'react-icons/hi';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = ({ orderDetails, onStartShopping, onTakeSurvey }) => {
  return (
    <Container fluid className={styles.orderConfirmation}>
      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={10} xl={9} xxl={8}>
          <div className={styles.confirmationContent}>
            <div className={styles.successIcon}>
              <HiOutlineCheckCircle />
            </div>
            <h2 className={styles.confirmationTitle}>Order Confirmed!</h2>
            <p className={styles.confirmationMessage}>
              Thank you for your order! We've received your purchase and are processing it now.
              You'll receive a confirmation email shortly with your order details and tracking information.
            </p>

            {orderDetails && (
              <div className={styles.orderDetails}>
                <h3 className={styles.orderDetailsTitle}>Order Details</h3>
                <div className={styles.orderInfo}>
                  <p><strong>Order Number:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  <p><strong>Email:</strong> {orderDetails.email}</p>
                  <p><strong>Phone:</strong> {orderDetails.phone}</p>

                  <address className={styles.orderAddress}>
                    <strong>Shipping Address:</strong><br />
                    {orderDetails.firstName} {orderDetails.lastName}<br />
                    {orderDetails.address}<br />
                    {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}
                  </address>
                </div>

                <div className={styles.nextSteps}>
                  <h4 className={styles.nextStepsTitle}>What's Next?</h4>
                  <ul className={styles.nextStepsList}>
                    <li className={styles.nextStepsItem}>
                      <HiOutlineMail className="me-2" />
                      Check your email for order confirmation
                    </li>
                    <li className={styles.nextStepsItem}>
                      <HiOutlineDocumentText className="me-2" />
                      We'll process and ship your order within 1-2 business days
                    </li>
                    <li className={styles.nextStepsItem}>
                      <HiOutlineTruck className="me-2" />
                      You'll receive tracking information once shipped
                    </li>
                    <li className={styles.nextStepsItem}>
                      <HiOutlineGift className="me-2" />
                      Enjoy your new wardrobe pieces!
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className={styles.actionButtons}>
              <Button variant="primary" size="lg" onClick={onStartShopping}>
                Continue Shopping
              </Button>
              <Button variant="outline-primary" size="lg" onClick={onTakeSurvey}>
                Share Your Experience
              </Button>
            </div>

            <div className={styles.thankYouMessage}>
              <p className={styles.thankYouText}>
                Thank you for choosing Wardrobe & Co. We hope you love your new pieces!
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
