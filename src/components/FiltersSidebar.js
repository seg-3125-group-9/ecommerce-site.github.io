import React from 'react';

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

const navStructure = {
    'SALE: UP TO 50% OFF': [],
    WOMEN: ['tops', 'bottoms', 'shoes', 'dresses'],
    MEN: ['tops', 'bottoms', 'shoes'],
    KIDS: ['tops', 'bottoms', 'shoes']
};

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

    const renderSaleFilters = () => (
        <>
            {/* Gender filters */}
            <div>
                <h4>Shop by Gender</h4>
                {['Women', 'Men', 'Kids'].map(gender => (
                    <label key={gender}>
                        <input
                            type="checkbox"
                            checked={saleGenderFilters.includes(gender)}
                            onChange={() => onSaleGenderToggle(gender)}
                        />
                        {gender}
                    </label>
                ))}
            </div>

            {/* Category filters */}
            <div>
                <h4>Category</h4>
                {(() => {
                    let applicableSections = [];
                    if (saleGenderFilters.length > 0) {
                        const filtered = productData.filter(p => saleGenderFilters.includes(p.gender) && p.salePrice);
                        applicableSections = Array.from(new Set(filtered.map(p => p.section)));
                    } else {
                        applicableSections = Array.from(new Set(productData.filter(p => p.salePrice).map(p => p.section)));
                    }

                    return applicableSections.map(section => (
                        <label key={section}>
                            <input
                                type="checkbox"
                                checked={saleSectionFilters.includes(section)}
                                onChange={() => onSaleSectionToggle(section)}
                            />
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </label>
                    ));
                })()}
            </div>

            {/* Combined filters for sale items */}
            {(() => {
                let subsectionsToUse = [];
                if (saleSectionFilters.length > 0) {
                    subsectionsToUse = saleSectionFilters;
                } else if (saleGenderFilters.length > 0) {
                    const filtered = productData.filter(p => saleGenderFilters.includes(p.gender) && p.salePrice);
                    subsectionsToUse = Array.from(new Set(filtered.map(p => p.section)));
                } else {
                    subsectionsToUse = Array.from(new Set(productData.filter(p => p.salePrice).map(p => p.section)));
                }

                const combinedFilters = {};
                subsectionsToUse.forEach(section => {
                    const sectionFilters = filtersPerSection[section];
                    if (sectionFilters) {
                        Object.entries(sectionFilters).forEach(([cat, vals]) => {
                            if (!combinedFilters[cat]) combinedFilters[cat] = new Set();
                            vals.forEach(v => combinedFilters[cat].add(v));
                        });
                    }
                });

                const combinedFiltersArr = Object.entries(combinedFilters).map(
                    ([cat, valSet]) => [cat, Array.from(valSet)]
                );

                return combinedFiltersArr.map(([category, values]) => (
                    <div key={category}>
                        <h4>{category.toUpperCase()}</h4>
                        {values.map(value => (
                            <label key={value}>
                                <input
                                    type="checkbox"
                                    checked={(filters[category] || []).includes(value)}
                                    onChange={() => onFilterChange(category, value)}
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                ));
            })()}
        </>
    );

    const renderRegularFilters = () => {
        // Handle "all" section specifically
        if (activeSection === 'all') {
            const allFilters = getAllSectionFilters();
            return Object.entries(allFilters).map(([category, values]) => (
                <div key={category}>
                    <h4>{category.toUpperCase()}</h4>
                    {values.map(value => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                checked={(filters[category] || []).includes(value)}
                                onChange={() => onFilterChange(category, value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            ));
        }

        const keyPart = activeSection.split('-')[1];
        if (activeSection.endsWith('-all')) {
            const gender = activeSection.split('-')[0].toUpperCase();
            const subsections = navStructure[gender] || [];

            const combinedFilters = {};
            subsections.forEach(section => {
                const sectionFilters = filtersPerSection[section];
                if (sectionFilters) {
                    Object.entries(sectionFilters).forEach(([cat, vals]) => {
                        if (!combinedFilters[cat]) {
                            combinedFilters[cat] = new Set();
                        }
                        vals.forEach(v => combinedFilters[cat].add(v));
                    });
                }
            });

            const combinedFiltersArr = Object.entries(combinedFilters).map(
                ([cat, valSet]) => [cat, Array.from(valSet)]
            );

            return combinedFiltersArr.map(([category, values]) => (
                <div key={category}>
                    <h4>{category.toUpperCase()}</h4>
                    {values.map(value => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                checked={(filters[category] || []).includes(value)}
                                onChange={() => onFilterChange(category, value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            ));
        } else {
            return Object.entries(filtersPerSection[keyPart] || {}).map(([category, values]) => (
                <div key={category}>
                    <h4>{category.toUpperCase()}</h4>
                    {values.map(value => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                checked={(filters[category] || []).includes(value)}
                                onChange={() => onFilterChange(category, value)}
                            />
                            {value}
                        </label>
                    ))}
                </div>
            ));
        }
    };

    // For "all" section, combine all filter options
    const getAllSectionFilters = () => {
        const combinedFilters = {
            size: new Set(),
            color: new Set(),
            material: new Set(),
            price: ['$10 and under', '$10–$20', '$20–$30', '$30–$40', '$40–$50', '$50 and up'],
            style: new Set(),
            trend: new Set()
        };

        // Combine all unique values from all sections
        Object.values(filtersPerSection).forEach(sectionFilters => {
            Object.keys(combinedFilters).forEach(filterKey => {
                if (sectionFilters[filterKey] && filterKey !== 'price') {
                    sectionFilters[filterKey].forEach(value => combinedFilters[filterKey].add(value));
                }
            });
        });

        // Convert Sets back to arrays
        Object.keys(combinedFilters).forEach(key => {
            if (key !== 'price') {
                combinedFilters[key] = Array.from(combinedFilters[key]).sort();
            }
        });

        return combinedFilters;
    };

    const getCurrentFilters = () => {
        if (activeSection === 'all') {
            return getAllSectionFilters();
        }
        return filtersPerSection[activeSection] || {};
    };

    return (
        <aside className="Filters-vertical">
            <h2>Find Your Perfect Fit</h2>
            {activeSection === 'sale' ? renderSaleFilters() :
                activeSection === 'all' ? renderRegularFilters() :
                    renderRegularFilters()}
        </aside>
    );
};

export default FiltersSidebar;
