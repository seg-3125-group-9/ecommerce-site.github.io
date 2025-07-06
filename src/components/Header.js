import React from 'react';
import { Button } from 'react-bootstrap';
import { HiOutlineShoppingBag } from 'react-icons/hi';
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
                            variant="primary"
                            className={styles.cartButton}
                            onClick={onViewCart}
                        >
                            <HiOutlineShoppingBag className="me-2" />
                            Cart ({cartCount})
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
