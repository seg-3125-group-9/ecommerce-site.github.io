import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './NavigationBreadcrumb.module.css';

const NavigationBreadcrumb = ({ currentView, activeSection, onNavigate }) => {
    const getBreadcrumbItems = () => {
        const items = [
            { label: 'Home', destination: 'home' }
        ];

        if (currentView === 'products' && activeSection) {
            const sectionName = getSectionDisplayName(activeSection);
            items.push({
                label: sectionName,
                destination: null
            });
        } else if (currentView === 'cart') {
            items.push({ label: 'Shopping Cart', current: true });
        } else if (currentView === 'checkout') {
            items.push(
                { label: 'Shopping Cart', destination: 'cart' },
                { label: 'Checkout', current: true }
            );
        } else if (currentView === 'confirmation') {
            items.push({ label: 'Order Confirmation', current: true });
        } else if (currentView === 'survey') {
            items.push({ label: 'Survey', current: true });
        } else if (currentView === 'survey-thanks') {
            items.push({ label: 'Thank You', current: true });
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
        return null;
    }

    return (
        <nav className={styles.navigationBreadcrumb} aria-label="Breadcrumb navigation">
            <div className={styles.breadcrumbContainer}>
                {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.breadcrumbItem}>
                            {item.current ? (
                                <span className={styles.breadcrumbCurrent} aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Button
                                    variant="link"
                                    className={styles.breadcrumbLink}
                                    onClick={() => onNavigate(item.destination)}
                                    size="sm"
                                >
                                    {item.label}
                                </Button>
                            )}
                        </div>
                        {index < breadcrumbItems.length - 1 && (
                            <span className={styles.breadcrumbSeparator} aria-hidden="true">
                                ›
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
};

export default NavigationBreadcrumb;
