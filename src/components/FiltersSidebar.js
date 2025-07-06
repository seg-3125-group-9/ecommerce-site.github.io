import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import styles from './FiltersSidebar.module.css';

const FiltersSidebar = ({ 
  activeSection, 
  filters, 
  onFilterChange, 
  saleGenderFilters, 
  saleSectionFilters, 
  onSaleGenderToggle, 
  onSaleSectionToggle, 
  productData 
}) => {
  
  const getAvailableFilters = () => {
    if (activeSection === 'sale') {
      const combinedFilters = {};
      
      // Combine all filter types for sale products
      ['size', 'color', 'material', 'price', 'style', 'trend'].forEach(filterType => {
        const allOptions = new Set();
        
        // Get options from all sections that might be on sale
        ['tops', 'bottoms', 'shoes', 'dresses'].forEach(section => {
          const filtersForSection = getFiltersForSection(section);
          if (filtersForSection[filterType]) {
            filtersForSection[filterType].forEach(option => allOptions.add(option));
          }
        });
        
        if (allOptions.size > 0) {
          combinedFilters[filterType] = Array.from(allOptions);
        }
      });
      
      return combinedFilters;
    }

    if (activeSection === 'all') {
      return getAllCombinedFilters();
    }

    if (activeSection.endsWith('-all')) {
      const gender = activeSection.split('-')[0];
      return getFiltersForGender(gender);
    }

    const section = activeSection.split('-')[1];
    return getFiltersForSection(section);
  };

  const getFiltersForSection = (section) => {
    const filtersPerSection = {
      tops: {
        size: ['XS', 'S', 'M', 'L', 'XL'],
        color: ['Red', 'Black', 'Yellow', 'White', 'Blue', 'Green', 'Pink'],
        material: ['Cotton', 'Polyester', 'Linen', 'Silk', 'Fleece'],
        price: ['$10 and under', '$10–$20', '$20–$30', '$30–$40', '$40–$50', '$50 and up'],
        style: ['Casual', 'Sporty', 'Elegant'],
        trend: ['New', 'Bestseller', 'Classic']
      },
      bottoms: {
        size: ['XS', 'S', 'M', 'L', 'XL'],
        color: ['Blue', 'Gray', 'Black', 'Beige', 'White'],
        material: ['Denim', 'Cotton', 'Fleece', 'Spandex', 'Linen'],
        price: ['$10 and under', '$10–$20', '$20–$30', '$30–$40', '$40–$50', '$50 and up'],
        style: ['Casual', 'Formal'],
        trend: ['New', 'Trending']
      },
      shoes: {
        size: ['1', '2', '3', '7', '8', '9', '10', '11'],
        color: ['Beige', 'White', 'Black', 'Brown', 'Pink', 'Red', 'Blue', 'Gray', 'Green'],
        material: ['Leather', 'Mesh', 'Suede', 'Rubber', 'Canvas'],
        price: ['$10 and under', '$10–$20', '$20–$30', '$30–$40', '$40–$50', '$50 and up'],
        style: ['Sneakers', 'Boots', 'Flats', 'Sandals'],
        trend: ['Popular', 'New', 'On Sale']
      },
      dresses: {
        size: ['XS', 'S', 'M', 'L', 'XL'],
        color: ['Pink', 'Black', 'White', 'Red', 'Blue'],
        material: ['Silk', 'Cotton', 'Linen', 'Polyester'],
        price: ['$10 and under', '$10–$20', '$20–$30', '$30–$40', '$40–$50', '$50 and up'],
        style: ['Formal', 'Casual', 'Elegant'],
        trend: ['Trending', 'New', 'Classic']
      }
    };
    
    return filtersPerSection[section] || {};
  };

  const getFiltersForGender = (gender) => {
    const sections = gender === 'women' ? ['tops', 'bottoms', 'shoes', 'dresses'] 
                   : gender === 'men' ? ['tops', 'bottoms', 'shoes']
                   : ['tops', 'bottoms', 'shoes'];

    const combinedFilters = {};
    
    sections.forEach(section => {
      const sectionFilters = getFiltersForSection(section);
      Object.keys(sectionFilters).forEach(filterType => {
        if (!combinedFilters[filterType]) {
          combinedFilters[filterType] = new Set();
        }
        sectionFilters[filterType].forEach(option => 
          combinedFilters[filterType].add(option)
        );
      });
    });

    Object.keys(combinedFilters).forEach(filterType => {
      combinedFilters[filterType] = Array.from(combinedFilters[filterType]);
    });

    return combinedFilters;
  };

  const getAllCombinedFilters = () => {
    const allSections = ['tops', 'bottoms', 'shoes', 'dresses'];
    const combinedFilters = {};
    
    allSections.forEach(section => {
      const sectionFilters = getFiltersForSection(section);
      Object.keys(sectionFilters).forEach(filterType => {
        if (!combinedFilters[filterType]) {
          combinedFilters[filterType] = new Set();
        }
        sectionFilters[filterType].forEach(option => 
          combinedFilters[filterType].add(option)
        );
      });
    });

    Object.keys(combinedFilters).forEach(filterType => {
      combinedFilters[filterType] = Array.from(combinedFilters[filterType]);
    });

    return combinedFilters;
  };

  const availableFilters = getAvailableFilters();

  const getAvailableSections = () => {
    if (saleGenderFilters.length === 0) return [];
    
    const sections = new Set();
    saleGenderFilters.forEach(gender => {
      if (gender === 'Women') {
        ['tops', 'bottoms', 'shoes', 'dresses'].forEach(s => sections.add(s));
      } else if (gender === 'Men') {
        ['tops', 'bottoms', 'shoes'].forEach(s => sections.add(s));
      } else if (gender === 'Kids') {
        ['tops', 'bottoms', 'shoes'].forEach(s => sections.add(s));
      }
    });
    return Array.from(sections);
  };

  const availableSections = getAvailableSections();

  return (
    <Card className={styles.filtersVertical}>
      <Card.Body>
        {activeSection === 'sale' && (
          <div className={styles.saleFilters}>
            <h4>🔥 Sale Filters</h4>
            <div className={styles.filterGroup}>
              <h5>Shop by Category</h5>
              {['Women', 'Men', 'Kids'].map((gender) => (
                <Form.Check
                  key={gender}
                  type="checkbox"
                  id={`gender-${gender.toLowerCase()}`}
                  label={gender}
                  checked={saleGenderFilters.includes(gender)}
                  onChange={() => onSaleGenderToggle(gender)}
                />
              ))}
            </div>
            
            {saleGenderFilters.length > 0 && (
              <div className={styles.filterGroup}>
                <h5>Product Type</h5>
                {availableSections.map((section) => (
                  <Form.Check
                    key={section}
                    type="checkbox"
                    id={`section-${section}`}
                    label={section.charAt(0).toUpperCase() + section.slice(1)}
                    checked={saleSectionFilters.includes(section)}
                    onChange={() => onSaleSectionToggle(section)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {availableFilters && Object.entries(availableFilters).map(([category, options]) => (
          <div key={category} className={styles.filterGroup}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            {options.map((option) => (
              <Form.Check
                key={option}
                type="checkbox"
                id={`${category}-${option}`}
                label={option}
                checked={(filters[category] || []).includes(option)}
                onChange={() => onFilterChange(category, option)}
              />
            ))}
          </div>
        ))}

        <Button 
          variant="outline-secondary" 
          size="sm"
          className={styles.resetFilters}
          onClick={() => window.location.reload()}
        >
          Reset All Filters
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FiltersSidebar;
