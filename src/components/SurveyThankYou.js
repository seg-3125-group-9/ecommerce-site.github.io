import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import {
  HiOutlineHeart,
  HiOutlineMail,
  HiOutlineUserGroup,
  HiOutlineSparkles
} from 'react-icons/hi';
import styles from './SurveyThankYou.module.css';

const SurveyThankYou = ({ surveyData, onContinueShopping }) => {
  return (
    <div className={styles.surveyThankYou}>
      <Container>
        <Card className={styles.thankYouContent}>
          <Card.Body>
            <div className={styles.thankYouIcon}>
              <HiOutlineHeart />
            </div>
            <h2>Thank you for your feedback!</h2>

            <p className={styles.thankYouMessage}>
              We truly appreciate you taking the time to share your thoughts with us.
              Your feedback helps us create an even better shopping experience for you and all our customers!
            </p>

            {surveyData?.email && (
              <div className={styles.emailConfirmation}>
                <p>
                  <span className={styles.emailIcon}>📧</span>
                  We'll send updates and exclusive offers to {surveyData.email}
                </p>
              </div>
            )}

            {surveyData && (
              <div className={styles.surveyDataSummary}>
                <h4>Your Feedback Summary</h4>
                {surveyData.rating && (
                  <p><strong>Experience Rating:</strong> <span>{surveyData.rating}</span></p>
                )}
                {surveyData.category && (
                  <p><strong>Interest Category:</strong> <span>{surveyData.category}</span></p>
                )}
                {surveyData.recommend && (
                  <p><strong>Recommendation:</strong> <span>{surveyData.recommend}</span></p>
                )}
              </div>
            )}

            <div className={styles.nextStepsBox}>
              <h4>What's Next?</h4>
              <ul>
                <li>
                  <HiOutlineSparkles className="me-2" />
                  We'll use your feedback to improve our products and services
                </li>
                <li>
                  <HiOutlineMail className="me-2" />
                  You'll receive exclusive offers and updates based on your preferences
                </li>
                <li>
                  <HiOutlineUserGroup className="me-2" />
                  Join our community of fashion enthusiasts
                </li>
              </ul>
            </div>

            <div className={styles.socialConnect}>
              <h4>Stay Connected</h4>
              <p>Follow us for the latest updates and style inspiration!</p>
              <div className={styles.socialIcons}>
                <span className={styles.socialIcon} title="Facebook">📘</span>
                <span className={styles.socialIcon} title="Instagram">📷</span>
                <span className={styles.socialIcon} title="Twitter">🐦</span>
                <span className={styles.socialIcon} title="Pinterest">📌</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className={styles.continueShoppingBtn}
              onClick={onContinueShopping}
            >
              Continue Shopping
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SurveyThankYou;
