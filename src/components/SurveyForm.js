import React, { useState } from 'react';

const SurveyForm = ({ onSubmitSurvey, onSkipSurvey }) => {
    const [formData, setFormData] = useState({
        overallExperience: '',
        shoppingEase: '',
        productQuality: '',
        checkoutProcess: '',
        wouldRecommend: '',
        favoriteFeature: '',
        improvements: '',
        email: '',
        allowContact: false
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalSteps = 3;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling

        // Only submit if we're on the last step
        if (currentStep !== totalSteps) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            onSubmitSurvey(formData);
            setIsSubmitting(false);
        }, 1000);
    };

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderProgressBar = () => (
        <div className="survey-progress">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>
            <span className="progress-text">Step {currentStep} of {totalSteps}</span>
        </div>
    );

    const renderStep1 = () => (
        <div className="survey-step">
            <h3>How was your shopping experience? 🛍️</h3>
            <p className="step-description">We'd love to know how we did today!</p>

            <div className="question-group">
                <label className="question-label">How would you rate your overall experience?</label>
                <div className="rating-options">
                    {['Excellent', 'Good', 'Fair', 'Poor'].map(option => (
                        <label key={option} className="rating-option">
                            <input
                                type="radio"
                                name="overallExperience"
                                value={option}
                                checked={formData.overallExperience === option}
                                onChange={handleInputChange}
                            />
                            <span className="rating-label">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="question-group">
                <label className="question-label">How easy was it to find what you were looking for?</label>
                <div className="rating-options">
                    {['Very Easy', 'Easy', 'Somewhat Difficult', 'Very Difficult'].map(option => (
                        <label key={option} className="rating-option">
                            <input
                                type="radio"
                                name="shoppingEase"
                                value={option}
                                checked={formData.shoppingEase === option}
                                onChange={handleInputChange}
                            />
                            <span className="rating-label">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="question-group">
                <label className="question-label">How satisfied are you with our product selection?</label>
                <div className="rating-options">
                    {['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'].map(option => (
                        <label key={option} className="rating-option">
                            <input
                                type="radio"
                                name="productQuality"
                                value={option}
                                checked={formData.productQuality === option}
                                onChange={handleInputChange}
                            />
                            <span className="rating-label">{option}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="survey-step">
            <h3>Tell us about your checkout experience 💳</h3>
            <p className="step-description">Your feedback helps us make shopping even better!</p>

            <div className="question-group">
                <label className="question-label">How was the checkout process?</label>
                <div className="rating-options">
                    {['Smooth & Quick', 'Good', 'Okay', 'Confusing'].map(option => (
                        <label key={option} className="rating-option">
                            <input
                                type="radio"
                                name="checkoutProcess"
                                value={option}
                                checked={formData.checkoutProcess === option}
                                onChange={handleInputChange}
                            />
                            <span className="rating-label">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="question-group">
                <label className="question-label">Would you recommend Wardrobe & Co. to a friend?</label>
                <div className="rating-options">
                    {['Definitely', 'Probably', 'Maybe', 'Probably Not'].map(option => (
                        <label key={option} className="rating-option">
                            <input
                                type="radio"
                                name="wouldRecommend"
                                value={option}
                                checked={formData.wouldRecommend === option}
                                onChange={handleInputChange}
                            />
                            <span className="rating-label">{option}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="question-group">
                <label className="question-label">What was your favorite part of shopping with us?</label>
                <select
                    name="favoriteFeature"
                    value={formData.favoriteFeature}
                    onChange={handleInputChange}
                    className="survey-select"
                >
                    <option value="">Select your favorite feature</option>
                    <option value="product-variety">Great product variety</option>
                    <option value="easy-filtering">Easy filtering system</option>
                    <option value="sale-prices">Amazing sale prices</option>
                    <option value="checkout-speed">Quick checkout</option>
                    <option value="website-design">Beautiful website design</option>
                    <option value="product-images">High-quality product images</option>
                </select>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="survey-step">
            <h3>Help us improve! ✨</h3>
            <p className="step-description">Your suggestions mean the world to us!</p>

            <div className="question-group">
                <label className="question-label">What could we do better? (Optional)</label>
                <textarea
                    name="improvements"
                    value={formData.improvements}
                    onChange={handleInputChange}
                    placeholder="Share your ideas for how we can make your next visit even better..."
                    className="survey-textarea"
                    rows="4"
                    onKeyDown={(e) => {
                        // Prevent Enter key from submitting form in textarea
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.stopPropagation();
                        }
                    }}
                />
            </div>

            <div className="question-group">
                <label className="question-label">Stay in touch? (Optional)</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="survey-input"
                    onKeyDown={(e) => {
                        // Prevent Enter key from submitting form in email input
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                />
                <small className="input-hint">Get exclusive offers and style tips!</small>
            </div>

            <div className="question-group">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        name="allowContact"
                        checked={formData.allowContact}
                        onChange={handleInputChange}
                        onClick={(e) => e.stopPropagation()} // Prevent event bubbling
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                        Yes, I'd love to hear about new arrivals and special offers!
                    </span>
                </label>
            </div>
        </div>
    );

    return (
        <div className="survey-form">
            <div className="survey-container">
                <div className="survey-header">
                    <h2>We'd love your feedback! 💝</h2>
                    <p className="survey-intro">
                        Your opinion helps us create an even better shopping experience.
                        This will only take 2 minutes!
                    </p>
                    {renderProgressBar()}
                </div>

                <form onSubmit={handleSubmit} className="survey-form-content">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}

                    <div className="survey-actions">
                        <div className="action-buttons">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="btn-secondary"
                                >
                                    ← Previous
                                </button>
                            )}

                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="btn-primary"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Feedback 🎉'}
                                </button>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onSkipSurvey();
                            }}
                            className="skip-survey-btn"
                        >
                            Skip for now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyForm;
