import React from 'react';

const SurveyThankYou = ({ surveyData, onContinueShopping }) => {
    return (
        <div className="survey-thank-you">
            <div className="thank-you-content">
                <div className="thank-you-icon">🙏</div>
                <h2>Thank you for your feedback!</h2>
                <p className="thank-you-message">
                    Your insights are incredibly valuable to us. We're always working to make
                    Wardrobe & Co. the best shopping experience possible!
                </p>

                {surveyData.email && (
                    <div className="email-confirmation">
                        <p>📧 We'll keep you updated at <strong>{surveyData.email}</strong></p>
                    </div>
                )}

                <div className="next-steps-box">
                    <h4>What's next?</h4>
                    <ul>
                        <li>🎁 Look out for exclusive member discounts</li>
                        <li>✨ Check back for new arrivals every week</li>
                        <li>👗 Follow us for style inspiration</li>
                    </ul>
                </div>

                <div className="action-buttons">
                    <button onClick={onContinueShopping} className="btn-primary">
                        Continue Shopping
                    </button>
                </div>

                <div className="social-connect">
                    <p>Connect with us for daily style inspiration!</p>
                    <div className="social-icons">
                        <span>📘 Facebook</span>
                        <span>📷 Instagram</span>
                        <span>🐦 Twitter</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyThankYou;
