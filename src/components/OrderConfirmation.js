import React from 'react';

const OrderConfirmation = ({ orderDetails, onStartShopping, onTakeSurvey }) => {
    const orderNumber = `WC${Date.now().toString().slice(-8)}`;

    return (
        <div className="order-confirmation">
            <div className="confirmation-content">
                <div className="success-icon">🎉</div>
                <h2>Thank you for shopping with us!</h2>
                <p className="confirmation-message">
                    Your order has been successfully placed and we're getting it ready for you.
                </p>

                <div className="order-details">
                    <h3>Order Details</h3>
                    <div className="order-info">
                        <p><strong>Order Number:</strong> {orderNumber}</p>
                        <p><strong>Email:</strong> {orderDetails.email}</p>
                        <p><strong>Shipping Address:</strong></p>
                        <address>
                            {orderDetails.firstName} {orderDetails.lastName}<br />
                            {orderDetails.address}<br />
                            {orderDetails.city}, {orderDetails.state} {orderDetails.zipCode}
                        </address>
                    </div>

                    <div className="next-steps">
                        <h4>What happens next?</h4>
                        <ul>
                            <li>📧 You'll receive an email confirmation shortly</li>
                            <li>📦 We'll send you tracking information once your order ships</li>
                            <li>🚚 Expect delivery within 3-5 business days</li>
                        </ul>
                    </div>
                </div>

                <div className="action-buttons">
                    <button onClick={onStartShopping} className="btn-primary">
                        Continue Shopping
                    </button>
                    <button onClick={onTakeSurvey} className="btn-secondary">
                        Share Your Feedback 💬
                    </button>
                </div>

                <div className="thank-you-message">
                    <p>We hope you love your new pieces! If you have any questions, our customer service team is here to help.</p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
