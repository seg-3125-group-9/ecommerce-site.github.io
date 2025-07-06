import React, { useState } from 'react';
import { Card, Form, Button, Badge, Accordion } from 'react-bootstrap';
import { HiOutlineAdjustments, HiOutlineFire, HiOutlineX } from 'react-icons/hi';
import styles from './FiltersSidebar.module.css';

const FiltersSidebar = ({
  activeSection,
  filters,
  onFilterChange,
  saleGenderFilters,
  saleSectionFilters,
  onSaleGenderToggle,
  onSaleSectionToggle,
  productData,
  onFiltersReset
}) => {
  // Set default active key for accordion (only one section open at a time)
  const [activeKey, setActiveKey] = useState('0'); // Start with first section (size) open

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

  const availableFilters = getAvailableFilters();
  const availableSections = getAvailableSections();

  const handleResetFilters = () => {
    // Call the reset function passed from parent to clear all filters
    if (onFiltersReset) {
      onFiltersReset();
    }
  };

  // Get count of active filters for each category
  const getActiveFilterCount = (category) => {
    return (filters[category] || []).length;
  };

  return (
    <Card className={styles.filtersCard}>
      <Card.Header className={styles.filtersHeader}>
        <h4 className={styles.filtersTitle}>
          <HiOutlineAdjustments className="me-2" />
          Filters
        </h4>
        <Button
          variant="link"
          size="sm"
          className={styles.resetButton}
          onClick={handleResetFilters}
        >
          Clear All
        </Button>
      </Card.Header>

      <Card.Body className={styles.filtersBody}>
        {activeSection === 'sale' && (
          <div className={styles.saleSection}>
            <div className={styles.sectionHeader}>
              <h5 className={styles.sectionTitle}>
                🔥 {/* Keep fire emoji as requested */}
                Sale Filters
              </h5>
            </div>

            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>Shop by Category</label>
              <div className={styles.checkboxGrid}>
                {['Women', 'Men', 'Kids'].map((gender) => (
                  <div
                    key={gender}
                    className={styles.compactOption}
                    onClick={() => onSaleGenderToggle(gender)}
                  >
                    <input
                      type="checkbox"
                      id={`gender-${gender.toLowerCase()}`}
                      checked={saleGenderFilters.includes(gender)}
                      onChange={() => { }} // Handled by div onClick
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor={`gender-${gender.toLowerCase()}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {saleGenderFilters.length > 0 && (
              <div className={styles.filterSection}>
                <label className={styles.filterLabel}>Product Type</label>
                <div className={styles.checkboxGrid}>
                  {availableSections.map((section) => (
                    <div
                      key={section}
                      className={styles.compactOption}
                      onClick={() => onSaleSectionToggle(section)}
                    >
                      <input
                        type="checkbox"
                        id={`section-${section}`}
                        checked={saleSectionFilters.includes(section)}
                        onChange={() => { }} // Handled by div onClick
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        htmlFor={`section-${section}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Accordion
          activeKey={activeKey}
          onSelect={(key) => setActiveKey(key)}
          className={styles.filterAccordion}
        >
          {availableFilters && Object.entries(availableFilters).map(([category, options], index) => {
            const activeCount = getActiveFilterCount(category);

            return (
              <Accordion.Item
                key={category}
                eventKey={index.toString()}
                className={styles.accordionItem}
              >
                <Accordion.Header className={styles.accordionHeader}>
                  <div className={styles.headerContent}>
                    <span className={styles.categoryName}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    {activeCount > 0 && (
                      <Badge bg="danger" className={styles.activeBadge}>
                        {activeCount}
                      </Badge>
                    )}
                  </div>
                </Accordion.Header>

                <Accordion.Body className={styles.accordionBody}>
                  <div className={styles.optionsGrid}>
                    {options.map((option) => (
                      <div
                        key={option}
                        className={styles.compactOption}
                        onClick={() => onFilterChange(category, option)}
                      >
                        <input
                          type="checkbox"
                          id={`${category}-${option}`}
                          checked={(filters[category] || []).includes(option)}
                          onChange={() => { }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label
                          htmlFor={`${category}-${option}`}
                          onClick={(e) => e.preventDefault()}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>

        <div className={styles.resetSection}>
          <Button
            variant="outline-danger"
            size="sm"
            className={styles.resetAllButton}
            onClick={handleResetFilters}
            disabled={Object.keys(filters).length === 0 && saleGenderFilters.length === 0}
          >
            <HiOutlineX className="me-2" />
            Reset All Filters
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FiltersSidebar;
