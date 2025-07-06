import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './BackButton.module.css';

const BackButton = ({ onClick, disabled = false, children = 'Back', className = '' }) => {
  return (
    <Button
      variant="outline-primary"
      className={`${styles.backButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={styles.backIcon} aria-hidden="true">←</span>
      {children}
    </Button>
  );
};

export default BackButton;
