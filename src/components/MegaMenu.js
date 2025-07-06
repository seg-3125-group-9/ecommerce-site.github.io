import React from 'react';
import styles from './MegaMenu.module.css';

const MegaMenu = ({ onSectionChange, onFiltersReset }) => {
  const navStructure = {
    'SALE: UP TO 50% OFF': [],
    WOMEN: ['tops', 'bottoms', 'shoes', 'dresses'],
    MEN: ['tops', 'bottoms', 'shoes'],
    KIDS: ['tops', 'bottoms', 'shoes']
  };

  const handleSectionClick = (section) => {
    onFiltersReset();
    onSectionChange(section);
  };

  return (
    <nav className={styles.megaNav} role="navigation" aria-label="Product categories">
      {Object.entries(navStructure).map(([mainCategory, subCategories]) => (
        <div key={mainCategory} className={styles.dropdown}>
          <span 
            data-sale={mainCategory.includes('SALE')}
            role="button"
            tabIndex={0}
            onClick={() => handleSectionClick(mainCategory === 'SALE: UP TO 50% OFF' ? 'sale' : 'all')}
            onKeyDown={(e) => e.key === 'Enter' && handleSectionClick(mainCategory === 'SALE: UP TO 50% OFF' ? 'sale' : 'all')}
          >
            {mainCategory}
          </span>
          
          {subCategories.length > 0 && (
            <div className={styles.dropdownContent} role="menu">
              <div 
                onClick={() => handleSectionClick(`${mainCategory.toLowerCase()}-all`)}
                role="menuitem"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSectionClick(`${mainCategory.toLowerCase()}-all`)}
              >
                All {mainCategory}
              </div>
              {subCategories.map((sub) => (
                <div 
                  key={sub}
                  onClick={() => handleSectionClick(`${mainCategory.toLowerCase()}-${sub}`)}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSectionClick(`${mainCategory.toLowerCase()}-${sub}`)}
                >
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MegaMenu;
