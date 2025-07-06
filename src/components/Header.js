import React from 'react';
import MegaMenu from './MegaMenu';

const Header = ({
    onSectionChange,
    onFiltersReset,
    cartCount,
    onViewCart,
    onGoHome,
    currentView
}) => {
    const handleLogoClick = () => {
        onGoHome();
    };

    return (
        <div className="Top-strip">
            <header className="App-header">
                <div className="header-content">
                    <h1
                        onClick={handleLogoClick}
                        className="site-logo"
                        title="Go to homepage"
                    >
                        Wardrobe & Co.
                    </h1>
                    <div className="cart-icon-container">
                        {cartCount > 0 && (
                            <button onClick={onViewCart} className="cart-button">
                                🛍️ Cart ({cartCount})
                            </button>
                        )}
                    </div>
                </div>
                {(currentView === 'products' || currentView === 'home') && (
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
