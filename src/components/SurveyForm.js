import React, { useState } from 'react';
import { Container, Button, Form, Card, ProgressBar } from 'react-bootstrap';
import styles from './SurveyForm.module.css';

const SurveyForm = ({ onSubmitSurvey, onSkipSurvey }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    rating: '',
    category: '',
    improvements: '',
    recommend: '',
    email: '',
    newsletter: false
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSurvey(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.surveyStep}>
            <h3>Tell us about your experience! 🌟</h3>
            <p className={styles.stepDescription}>
              Your feedback helps us create an even better shopping experience for you and other customers.
            </p>

            {/* Step indicator */}
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepItem} ${styles.active}`}>
                <div className={styles.stepNumber}>1</div>
                <span>Experience</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>2</div>
                <span>Feedback</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <span>Contact</span>
              </div>
            </div>

            <div className={styles.questionGroup}>
              <Form.Label className={styles.questionLabel}>
                How would you rate your overall shopping experience?
              </Form.Label>
              <div className={styles.ratingOptions}>
                {['Excellent', 'Good', 'Average', 'Poor'].map(rating => (
                  <div 
                    key={rating} 
                    className={`${styles.ratingOption} ${formData.rating === rating ? styles.selected : ''}`}
                    onClick={() => handleInputChange('rating', rating)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={formData.rating === rating}
                      onChange={() => {}} // Handled by onClick above
                      className={styles.hiddenRadio}
                      aria-label={rating}
                    />
                    <div className={styles.customRadio}></div>
                    <span className={styles.ratingLabel}>
                      {rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.questionGroup}>
              <Form.Label className={styles.questionLabel}>
                What type of products are you most interested in?
              </Form.Label>
              <Form.Select
                className={styles.surveySelect}
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <option value="">Select a category...</option>
                <option value="women">Women's Clothing</option>
                <option value="men">Men's Clothing</option>
                <option value="kids">Kids' Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="all">All Categories</option>
              </Form.Select>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.surveyStep}>
            <h3>Help us improve! 💡</h3>
            <p className={styles.stepDescription}>
              Share your thoughts on how we can make your shopping experience even better.
            </p>

            {/* Step indicator */}
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepItem} ${styles.completed}`}>
                <div className={styles.stepNumber}>✓</div>
                <span>Experience</span>
              </div>
              <div className={`${styles.stepItem} ${styles.active}`}>
                <div className={styles.stepNumber}>2</div>
                <span>Feedback</span>
              </div>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <span>Contact</span>
              </div>
            </div>

            <div className={styles.questionGroup}>
              <Form.Label className={styles.questionLabel}>
                What improvements would you like to see?
              </Form.Label>
              <Form.Control
                as="textarea"
                className={styles.surveyTextarea}
                placeholder="Tell us what would make your shopping experience better..."
                value={formData.improvements}
                onChange={(e) => handleInputChange('improvements', e.target.value)}
              />
              <small className={styles.inputHint}>
                Feel free to mention anything - website features, product selection, shipping, etc.
              </small>
            </div>

            <div className={styles.questionGroup}>
              <Form.Label className={styles.questionLabel}>
                Would you recommend us to a friend?
              </Form.Label>
              <div className={styles.ratingOptions}>
                {['Definitely', 'Probably', 'Maybe', 'Probably not'].map(option => (
                  <div 
                    key={option} 
                    className={`${styles.ratingOption} ${formData.recommend === option ? styles.selected : ''}`}
                    onClick={() => handleInputChange('recommend', option)}
                  >
                    <input
                      type="radio"
                      name="recommend"
                      value={option}
                      checked={formData.recommend === option}
                      onChange={() => {}} // Handled by onClick above
                      className={styles.hiddenRadio}
                      aria-label={option}
                    />
                    <div className={styles.customRadio}></div>
                    <span className={styles.ratingLabel}>
                      {option}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.surveyStep}>
            <h3>Stay connected! 📧</h3>
            <p className={styles.stepDescription}>
              Get exclusive offers, new arrival updates, and style tips delivered to your inbox.
            </p>

            {/* Step indicator */}
            <div className={styles.stepIndicator}>
              <div className={`${styles.stepItem} ${styles.completed}`}>
                <div className={styles.stepNumber}>✓</div>
                <span>Experience</span>
              </div>
              <div className={`${styles.stepItem} ${styles.completed}`}>
                <div className={styles.stepNumber}>✓</div>
                <span>Feedback</span>
              </div>
              <div className={`${styles.stepItem} ${styles.active}`}>
                <div className={styles.stepNumber}>3</div>
                <span>Contact</span>
              </div>
            </div>

            <div className={styles.questionGroup}>
              <Form.Label className={styles.questionLabel}>
                Email address (optional)
              </Form.Label>
              <Form.Control
                type="email"
                className={styles.surveyInput}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <small className={styles.inputHint}>
                We'll only use this to send you updates about new products and special offers
              </small>
            </div>

            <div className={styles.questionGroup}>
              <div className={styles.checkboxContainer}>
                <Form.Check
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <Form.Label htmlFor="newsletter" className={styles.checkboxText}>
                  Yes, I'd like to receive email updates about new arrivals, sales, and style tips
                </Form.Label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.surveyForm}>
      <Container>
        <Card className={styles.surveyContainer}>
          <div className={styles.surveyHeader}>
            <h2>Share Your Thoughts 🎉</h2>
            <p className={styles.surveyIntro}>
              Your opinion matters! Help us improve by sharing your shopping experience with us.
            </p>
            <div className={styles.surveyProgress}>
              <ProgressBar 
                now={progressPercentage} 
                className={styles.progressBar}
                variant="light"
              />
              <div className={styles.progressText}>
                Step {currentStep} of {totalSteps}
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className={styles.surveyFormContent}>
              {renderStep()}

              <div className={styles.surveyActions}>
                <div className={styles.actionButtons}>
                  {currentStep > 1 && (
                    <Button
                      variant="outline-primary"
                      className={styles.prevBtn}
                      onClick={handlePrev}
                    >
                      ← Previous
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button
                      variant="primary"
                      className={styles.nextBtn}
                      onClick={handleNext}
                    >
                      Next →
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      type="submit"
                      className={styles.submitBtn}
                    >
                      Submit Feedback 🎉
                    </Button>
                  )}
                </div>

                <Button
                  variant="link"
                  className={styles.skipSurveyBtn}
                  onClick={onSkipSurvey}
                >
                  Skip survey for now
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SurveyForm;
