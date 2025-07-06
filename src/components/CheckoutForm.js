import React, { useState } from 'react';

const CheckoutForm = ({ cart, onSubmitOrder, onBackToCart }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        if (!formData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmitOrder(formData);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.salePrice || item.price;
            return total + price;
        }, 0);
    };

    return (
        <div className="checkout-form">
            <div className="checkout-header">
                <h2>Almost there! Let's complete your order 🛍️</h2>
                <button onClick={onBackToCart} className="btn-secondary">
                    ← Back to Cart
                </button>
            </div>

            <div className="checkout-content">
                <form onSubmit={handleSubmit} className="checkout-form-container">
                    {/* Shipping Information */}
                    <div className="form-section">
                        <h3>Where should we send your amazing finds?</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={errors.phone ? 'error' : ''}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Street Address *</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={errors.address ? 'error' : ''}
                            />
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State *</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className={errors.state ? 'error' : ''}
                                />
                                {errors.state && <span className="error-message">{errors.state}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">ZIP Code *</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className={errors.zipCode ? 'error' : ''}
                                />
                                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="form-section">
                        <h3>Payment Information</h3>
                        <p className="payment-security">🔒 Your payment information is secure and encrypted</p>

                        <div className="form-group">
                            <label htmlFor="nameOnCard">Name on Card *</label>
                            <input
                                type="text"
                                id="nameOnCard"
                                name="nameOnCard"
                                value={formData.nameOnCard}
                                onChange={handleInputChange}
                                className={errors.nameOnCard ? 'error' : ''}
                            />
                            {errors.nameOnCard && <span className="error-message">{errors.nameOnCard}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number *</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className={errors.cardNumber ? 'error' : ''}
                            />
                            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date *</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    className={errors.expiryDate ? 'error' : ''}
                                />
                                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV *</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="123"
                                    className={errors.cvv ? 'error' : ''}
                                />
                                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary complete-order-btn">
                        Complete Order - ${calculateTotal().toFixed(2)}
                    </button>
                </form>

                {/* Order Summary */}
                <div className="order-summary">
                    <h3>Your Order Summary</h3>
                    <div className="summary-items">
                        {cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="summary-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">
                                    ${(item.salePrice || item.price).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-total">
                        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
