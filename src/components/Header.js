import React from 'react';
import { Button } from 'react-bootstrap';
import MegaMenu from './MegaMenu';
import styles from './Header.module.css';

const Header = ({
    onSectionChange,
    onFiltersReset,
    cartCount,
    onViewCart,
    onGoHome,
    currentView
}) => {
    return (
        <div className="Top-strip">
            <header className="App-header">
                <div className={styles.headerContent}>
                    <h1
                        className={`Site-title ${styles.siteLogo}`}
                        onClick={onGoHome}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && onGoHome()}
                    >
                        Wardrobe & Co.
                    </h1>

                    <div className={styles.cartIconContainer}>
                        <Button
                            variant="danger"
                            className={styles.cartButton}
                            onClick={onViewCart}
                        >
                            🛒 Cart ({cartCount})
                        </Button>
                    </div>
                </div>

                {(currentView === 'home' || currentView === 'products') && (
                    <MegaMenu
                        onSectionChange={onSectionChange}
                        onFiltersReset={onFiltersReset}
                    />
                )}
            </header>
        </div>
    );
};

export default Header;
