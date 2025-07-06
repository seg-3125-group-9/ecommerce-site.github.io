import React from 'react';

const NavigationBreadcrumb = ({ currentView, activeSection, onNavigate }) => {
    const getBreadcrumbItems = () => {
        const items = [
            { label: 'Home', key: 'home', action: () => onNavigate('home') }
        ];

        if (activeSection && currentView === 'products') {
            const sectionName = getSectionDisplayName(activeSection);
            items.push({
                label: sectionName,
                key: 'products',
                action: null
            });
        }

        if (currentView === 'cart') {
            items.push({
                label: 'Shopping Cart',
                key: 'cart',
                action: null
            });
        }

        if (currentView === 'checkout') {
            items.push(
                { label: 'Shopping Cart', key: 'cart', action: () => onNavigate('cart') },
                { label: 'Checkout', key: 'checkout', action: null }
            );
        }

        if (currentView === 'confirmation') {
            items.push(
                { label: 'Order Complete', key: 'confirmation', action: null }
            );
        }

        if (currentView === 'survey') {
            items.push(
                { label: 'Your Feedback', key: 'survey', action: null }
            );
        }

        if (currentView === 'survey-thanks') {
            items.push(
                { label: 'Thank You', key: 'survey-thanks', action: null }
            );
        }

        return items;
    };

    const getSectionDisplayName = (section) => {
        if (section === 'sale') return 'Sale Items';
        if (section.includes('women')) return 'Women\'s ' + section.split('-')[1];
        if (section.includes('men')) return 'Men\'s ' + section.split('-')[1];
        if (section.includes('kids')) return 'Kids\' ' + section.split('-')[1];
        return section.charAt(0).toUpperCase() + section.slice(1);
    };

    const breadcrumbItems = getBreadcrumbItems();

    if (breadcrumbItems.length <= 1) {
        return null; // Don't show breadcrumb for home only
    }

    return (
        <nav className="navigation-breadcrumb">
            <div className="breadcrumb-container">
                {breadcrumbItems.map((item, index) => (
                    <span key={item.key} className="breadcrumb-item">
                        {item.action ? (
                            <button
                                onClick={item.action}
                                className="breadcrumb-link"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span className="breadcrumb-current">{item.label}</span>
                        )}
                        {index < breadcrumbItems.length - 1 && (
                            <span className="breadcrumb-separator">›</span>
                        )}
                    </span>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBreadcrumb;
