import React from 'react';

const navStructure = {
    'SALE: UP TO 50% OFF': [],
    WOMEN: ['tops', 'bottoms', 'shoes', 'dresses'],
    MEN: ['tops', 'bottoms', 'shoes'],
    KIDS: ['tops', 'bottoms', 'shoes']
};

const MegaMenu = ({ onSectionChange, onFiltersReset }) => {
    const handleSectionClick = (main, sub = null) => {
        let section;
        if (main === 'SALE: UP TO 50% OFF') {
            section = 'sale';
        } else if (sub) {
            section = `${main.toLowerCase()}-${sub}`;
        } else {
            section = main.toLowerCase() + '-all';
        }

        onSectionChange(section);
        onFiltersReset();
    };

    return (
        <nav className="Mega-nav">
            {Object.entries(navStructure).map(([main, subs]) => (
                <div className="dropdown" key={main}>
                    <span
                        data-sale={main === 'SALE: UP TO 50% OFF'}
                        onClick={() => handleSectionClick(main)}
                    >
                        {main}
                    </span>
                    {subs.length > 0 && (
                        <div className="dropdown-content">
                            {subs.map(sub => (
                                <div
                                    key={sub}
                                    onClick={() => handleSectionClick(main, sub)}
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
