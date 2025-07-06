import React from 'react';
import styles from './MegaMenu.module.css';

const MegaMenu = ({ onSectionChange, onFiltersReset }) => {
  const navStructure = {
    'SALE: UP TO 50% OFF': [],
    WOMEN: ['tops', 'bottoms', 'shoes', 'dresses'],
    MEN: ['tops', 'bottoms', 'shoes'],
    KIDS: ['tops', 'bottoms', 'shoes']
  };

  const handleCategoryClick = (category) => {
    // Only allow direct clicking for SALE
    if (category === 'SALE: UP TO 50% OFF') {
      onFiltersReset();
      onSectionChange('sale');
    }
    // For WOMEN, MEN, KIDS - do nothing (disabled)
  };

  const handleSubcategoryClick = (gender, subcategory) => {
    onFiltersReset();
    const genderKey = gender === 'WOMEN' ? 'women' :
      gender === 'MEN' ? 'men' :
        gender === 'KIDS' ? 'kids' : gender.toLowerCase();

    if (subcategory === 'all') {
      onSectionChange(`${genderKey}-all`);
    } else {
      onSectionChange(`${genderKey}-${subcategory}`);
    }
  };

  return (
    <nav className={styles.megaNav} role="navigation" aria-label="Product categories">
      {Object.entries(navStructure).map(([category, subcategories]) => (
        <div key={category} className={styles.dropdown}>
          <span
            onClick={() => handleCategoryClick(category)}
            data-sale={category.includes('SALE')}
            style={{
              cursor: category === 'SALE: UP TO 50% OFF' ? 'pointer' : 'default',
              opacity: category === 'SALE: UP TO 50% OFF' ? 1 : 0.8
            }}
          >
            {category}
          </span>
          {subcategories.length > 0 && (
            <div className={styles.dropdownContent} role="menu">
              <div
                onClick={() => handleSubcategoryClick(category, 'all')}
                style={{
                  fontWeight: 'bold',
                  borderBottom: '1px solid #eee',
                  marginBottom: '5px',
                  paddingBottom: '5px',
                  cursor: 'pointer'
                }}
              >
                All {category}
              </div>
              {subcategories.map((sub) => (
                <div
                  key={sub}
                  onClick={() => handleSubcategoryClick(category, sub)}
                  style={{ cursor: 'pointer' }}
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
