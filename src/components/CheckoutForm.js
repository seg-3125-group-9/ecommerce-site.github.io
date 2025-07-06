import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import BackButton from './BackButton';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ cart, onSubmitOrder, onBackToCart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 'cvv', 'nameOnCard'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmitOrder(formData);
    }
  };

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.salePrice !== undefined ? item.salePrice : item.price);
  }, 0);

  return (
    <div className={styles.checkoutForm}>
      <Container>
        <div className={styles.checkoutHeader}>
          <BackButton onClick={onBackToCart} />
          <h2>Checkout</h2>
        </div>

        <Row>
          <Col lg={8}>
            <Card className={styles.checkoutFormContainer}>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <div className={styles.formSection}>
                    <h3>Shipping Information</h3>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.firstName}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.lastName}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        isInvalid={!!errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        isInvalid={!!errors.address}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            isInvalid={!!errors.city}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.city}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            isInvalid={!!errors.state}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.state}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>ZIP Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            isInvalid={!!errors.zipCode}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.zipCode}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <div className={styles.formSection}>
                    <h3>Payment Information</h3>
                    <p className={styles.paymentSecurity}>
                      🔒 Your payment information is secure and encrypted
                    </p>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        type="text"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        isInvalid={!!errors.nameOnCard}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nameOnCard}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        isInvalid={!!errors.cardNumber}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNumber}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            isInvalid={!!errors.expiryDate}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.expiryDate}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            isInvalid={!!errors.cvv}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.cvv}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    className={styles.completeOrderBtn}
                  >
                    Complete Order - ${totalPrice.toFixed(2)}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className={styles.orderSummary}>
              <Card.Body>
                <h3>Order Summary</h3>
                <div className={styles.summaryItems}>
                  {cart.map((item, index) => (
                    <div key={index} className={styles.summaryItem}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemPrice}>
                        ${(item.salePrice !== undefined ? item.salePrice : item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryTotal}>
                  <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutForm;
