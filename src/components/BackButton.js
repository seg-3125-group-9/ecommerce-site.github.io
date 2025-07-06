import React from 'react';

const BackButton = ({ onBack, label = "← Back", disabled = false, className = "" }) => {
    return (
        <button
            onClick={onBack}
            disabled={disabled}
            className={`back-button ${className}`}
            type="button"
        >
            {label}
        </button>
    );
};

export default BackButton;
