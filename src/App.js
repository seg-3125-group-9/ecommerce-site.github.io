import React, { useState } from 'react';
import './App.css';

const homepageLabels = ['Bestseller', 'Popular', 'New', 'Trendy'];
const productData = [
  { id: 1, name: 'Red T-Shirt', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Red', material: 'Cotton', gender: 'Women', price: 24.99, style: 'Casual', trend: 'Bestseller', image: 'https://source.unsplash.com/200x250/?red,tshirt,women' },
  { id: 2, name: 'White Blouse', section: 'tops', sizes: ['XS', 'S', 'M'], color: 'White', material: 'Silk', gender: 'Women', price: 34.99, image: 'https://source.unsplash.com/200x250/?white,blouse,women' },
  { id: 3, name: 'Black Tank Top', section: 'tops', sizes: ['M', 'L', 'XL'], color: 'Black', material: 'Polyester', gender: 'Women', price: 19.99, image: 'https://source.unsplash.com/200x250/?black,tanktop,women' },
  { id: 4, name: 'Striped Tee', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Blue', material: 'Cotton', gender: 'Women', price: 21.99, style: 'Casual', image: 'https://source.unsplash.com/200x250/?striped,tee,women' },
  { id: 5, name: 'Pink Crop Top', section: 'tops', sizes: ['XS', 'S'], color: 'Pink', material: 'Linen', gender: 'Women', price: 27.99, trend: 'New', image: 'https://source.unsplash.com/200x250/?pink,crop-top,women' },

  { id: 6, name: 'Jeans', section: 'bottoms', sizes: ['S', 'M', 'L'], color: 'Blue', material: 'Denim', gender: 'Women', price: 39.99, image: 'https://source.unsplash.com/200x250/?jeans,women' },
  { id: 7, name: 'Black Leggings', section: 'bottoms', sizes: ['XS', 'S', 'M'], color: 'Black', material: 'Spandex', gender: 'Women', price: 29.99, image: 'https://source.unsplash.com/200x250/?black,leggings,women' },
  { id: 8, name: 'White Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'White', material: 'Cotton', gender: 'Women', price: 25.99, image: 'https://source.unsplash.com/200x250/?white,shorts,women' },
  { id: 9, name: 'Plaid Skirt', section: 'bottoms', sizes: ['M', 'L'], color: 'Red', material: 'Wool', gender: 'Women', price: 33.99, image: 'https://source.unsplash.com/200x250/?plaid,skirt,women' },
  { id: 10, name: 'Beige Trousers', section: 'bottoms', sizes: ['M', 'L', 'XL'], color: 'Beige', material: 'Linen', gender: 'Women', price: 37.99, style: 'Elegant', image: 'https://source.unsplash.com/200x250/?beige,trousers,women' },

  { id: 11, name: 'Sandals', section: 'shoes', sizes: ['8', '9'], color: 'Beige', material: 'Leather', gender: 'Women', price: 41.99, image: 'https://source.unsplash.com/200x250/?sandals,women' },
  { id: 12, name: 'Black Heels', section: 'shoes', sizes: ['7', '8'], color: 'Black', material: 'Suede', gender: 'Women', price: 47.99, trend: 'Classic', image: 'https://source.unsplash.com/200x250/?black,heels,women' },
  { id: 13, name: 'Running Shoes', section: 'shoes', sizes: ['8', '9', '10'], color: 'White', material: 'Mesh', gender: 'Women', price: 59.99, image: 'https://source.unsplash.com/200x250/?running,shoes,women' },
  { id: 14, name: 'Brown Boots', section: 'shoes', sizes: ['9', '10'], color: 'Brown', material: 'Leather', gender: 'Women', price: 64.99, style: 'Casual', image: 'https://source.unsplash.com/200x250/?brown,boots,women' },
  { id: 15, name: 'Ballet Flats', section: 'shoes', sizes: ['6', '7'], color: 'Pink', material: 'Canvas', gender: 'Women', price: 35.99, image: 'https://source.unsplash.com/200x250/?ballet,flats,women' },

  { id: 16, name: 'Floral Dress', section: 'dresses', sizes: ['S', 'M', 'L'], color: 'Pink', material: 'Silk', gender: 'Women', price: 54.99, trend: 'New', image: 'https://source.unsplash.com/200x250/?floral,dress,women' },
  { id: 17, name: 'Black Maxi Dress', section: 'dresses', sizes: ['M', 'L'], color: 'Black', material: 'Cotton', gender: 'Women', price: 49.99, image: 'https://source.unsplash.com/200x250/?black,maxi-dress,women' },
  { id: 18, name: 'Red Mini Dress', section: 'dresses', sizes: ['XS', 'S'], color: 'Red', material: 'Linen', gender: 'Women', price: 46.99, style: 'Elegant', image: 'https://source.unsplash.com/200x250/?red,mini-dress,women' },
  { id: 19, name: 'White Sundress', section: 'dresses', sizes: ['S', 'M'], color: 'White', material: 'Cotton', gender: 'Women', price: 52.99, image: 'https://source.unsplash.com/200x250/?white,sundress,women' },
  { id: 20, name: 'Blue Wrap Dress', section: 'dresses', sizes: ['M', 'L'], color: 'Blue', material: 'Polyester', gender: 'Women', price: 48.99, image: 'https://source.unsplash.com/200x250/?blue,wrap-dress,women' },

  { id: 21, name: 'Men T-Shirt', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Green', material: 'Cotton', gender: 'Men', price: 23.99, image: 'https://source.unsplash.com/200x250/?green,tshirt,men' },
  { id: 22, name: 'Polo Shirt', section: 'tops', sizes: ['M', 'L'], color: 'Blue', material: 'Cotton', gender: 'Men', price: 31.99, style: 'Preppy', image: 'https://source.unsplash.com/200x250/?polo,shirt,men' },
  { id: 23, name: 'Henley', section: 'tops', sizes: ['M', 'L', 'XL'], color: 'Gray', material: 'Polyester', gender: 'Men', price: 27.99, image: 'https://source.unsplash.com/200x250/?henley,shirt,men' },
  { id: 24, name: 'Long Sleeve Tee', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Black', material: 'Cotton', gender: 'Men', price: 29.99, image: 'https://source.unsplash.com/200x250/?long-sleeve,shirt,men' },
  { id: 25, name: 'Graphic Tee', section: 'tops', sizes: ['XS', 'S', 'M'], color: 'White', material: 'Cotton', gender: 'Men', price: 25.99, trend: 'Bestseller', image: 'https://source.unsplash.com/200x250/?graphic,tee,men' },

  { id: 26, name: 'Chino Pants', section: 'bottoms', sizes: ['M', 'L'], color: 'Beige', material: 'Cotton', gender: 'Men', price: 37.99, image: 'https://source.unsplash.com/200x250/?chino,pants,men' },
  { id: 27, name: 'Cargo Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'Green', material: 'Cotton', gender: 'Men', price: 28.99, image: 'https://source.unsplash.com/200x250/?cargo,shorts,men' },
  { id: 28, name: 'Slim Jeans', section: 'bottoms', sizes: ['M', 'L', 'XL'], color: 'Blue', material: 'Denim', gender: 'Men', price: 44.99, image: 'https://source.unsplash.com/200x250/?slim,jeans,men' },
  { id: 29, name: 'Joggers', section: 'bottoms', sizes: ['S', 'M', 'L'], color: 'Gray', material: 'Fleece', gender: 'Men', price: 34.99, style: 'Athleisure', image: 'https://source.unsplash.com/200x250/?joggers,men' },
  { id: 30, name: 'Dress Pants', section: 'bottoms', sizes: ['L', 'XL'], color: 'Black', material: 'Polyester', gender: 'Men', price: 49.99, image: 'https://source.unsplash.com/200x250/?dress,pants,men' },

  { id: 31, name: 'Dress Shoes', section: 'shoes', sizes: ['9', '10'], color: 'Black', material: 'Leather', gender: 'Men', price: 69.99, style: 'Formal', image: 'https://source.unsplash.com/200x250/?dress,shoes,men' },
  { id: 32, name: 'Sneakers', section: 'shoes', sizes: ['10', '11'], color: 'White', material: 'Mesh', gender: 'Men', price: 54.99, trend: 'Popular', image: 'https://source.unsplash.com/200x250/?sneakers,men' },
  { id: 33, name: 'Boots', section: 'shoes', sizes: ['10', '11'], color: 'Brown', material: 'Leather', gender: 'Men', price: 74.99, image: 'https://source.unsplash.com/200x250/?boots,men' },
  { id: 34, name: 'Loafers', section: 'shoes', sizes: ['9', '10'], color: 'Navy', material: 'Suede', gender: 'Men', price: 59.99, image: 'https://source.unsplash.com/200x250/?loafers,men' },
  { id: 35, name: 'Flip Flops', section: 'shoes', sizes: ['8', '9'], color: 'Gray', material: 'Rubber', gender: 'Men', price: 17.99, image: 'https://source.unsplash.com/200x250/?flipflops,men' },

  { id: 36, name: 'Kid Tee', section: 'tops', sizes: ['S', 'M'], color: 'Yellow', material: 'Cotton', gender: 'Kids', price: 14.99, image: 'https://source.unsplash.com/200x250/?kids,tshirt' },
  { id: 37, name: 'Kid Hoodie', section: 'tops', sizes: ['M', 'L'], color: 'Red', material: 'Fleece', gender: 'Kids', price: 27.99, image: 'https://source.unsplash.com/200x250/?kids,hoodie' },
  { id: 38, name: 'Kid Tank Top', section: 'tops', sizes: ['XS', 'S'], color: 'Green', material: 'Cotton', gender: 'Kids', price: 13.99, trend: 'New', image: 'https://source.unsplash.com/200x250/?kids,tanktop' },
  { id: 39, name: 'Kid Long Sleeve', section: 'tops', sizes: ['S', 'M'], color: 'Blue', material: 'Polyester', gender: 'Kids', price: 21.99, image: 'https://source.unsplash.com/200x250/?kids,longsleeve' },
  { id: 40, name: 'Kid Graphic Tee', section: 'tops', sizes: ['XS', 'S'], color: 'White', material: 'Cotton', gender: 'Kids', price: 15.99, image: 'https://source.unsplash.com/200x250/?kids,graphictee' },

  { id: 41, name: 'Kid Joggers', section: 'bottoms', sizes: ['S', 'M'], color: 'Gray', material: 'Fleece', gender: 'Kids', price: 22.99, image: 'https://source.unsplash.com/200x250/?kids,joggers' },
  { id: 42, name: 'Kid Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'Blue', material: 'Cotton', gender: 'Kids', price: 19.99, image: 'https://source.unsplash.com/200x250/?kids,shorts' },
  { id: 43, name: 'Kid Leggings', section: 'bottoms', sizes: ['XS', 'S'], color: 'Pink', material: 'Spandex', gender: 'Kids', price: 18.99, image: 'https://source.unsplash.com/200x250/?kids,leggings' },
  { id: 44, name: 'Kid Jeans', section: 'bottoms', sizes: ['S', 'M'], color: 'Denim', material: 'Denim', gender: 'Kids', price: 23.99, image: 'https://source.unsplash.com/200x250/?kids,jeans' },
  { id: 45, name: 'Kid Sweatpants', section: 'bottoms', sizes: ['S', 'M'], color: 'Black', material: 'Cotton', gender: 'Kids', price: 20.99, image: 'https://source.unsplash.com/200x250/?kids,sweatpants' },

  { id: 46, name: 'Kid Sneakers', section: 'shoes', sizes: ['2', '3'], color: 'Red', material: 'Mesh', gender: 'Kids', price: 29.99, image: 'https://source.unsplash.com/200x250/?kids,sneakers' },
  { id: 47, name: 'Kid Sandals', section: 'shoes', sizes: ['2', '3'], color: 'Blue', material: 'Rubber', gender: 'Kids', price: 21.99, image: 'https://source.unsplash.com/200x250/?kids,sandals' },
  { id: 48, name: 'Kid Boots', section: 'shoes', sizes: ['2', '3'], color: 'Brown', material: 'Leather', gender: 'Kids', price: 34.99, image: 'https://source.unsplash.com/200x250/?kids,boots' },
  { id: 49, name: 'Kid Loafers', section: 'shoes', sizes: ['1', '2'], color: 'Black', material: 'Canvas', gender: 'Kids', price: 27.99, style: 'Formal', image: 'https://source.unsplash.com/200x250/?kids,loafers' },
  { id: 50, name: 'Kid Flip Flops', section: 'shoes', sizes: ['2', '3'], color: 'Green', material: 'Rubber', gender: 'Kids', price: 11.99, image: 'https://source.unsplash.com/200x250/?kids,flipflops' }
];


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

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [filters, setFilters] = useState({});
  const [cart, setCart] = useState([]);

  const handleCheckboxChange = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
  };

  const matchesFilters = (product) => {
    for (const [key, values] of Object.entries(filters)) {
      if (values.length > 0) {
        if (key === 'size') {
          if (!product.sizes?.some(size => values.includes(size))) return false;
        } else if (key === 'price') {
          const price = product.price;
          const priceMatch = values.some(range => {
            if (range === '$10 and under') return price <= 10;
            if (range === '$10–$20') return price > 10 && price <= 20;
            if (range === '$20–$30') return price > 20 && price <= 30;
            if (range === '$30–$40') return price > 30 && price <= 40;
            if (range === '$40–$50') return price > 40 && price <= 50;
            if (range === '$50 and up') return price > 50;
            return false;
          });
          if (!priceMatch) return false;
        } else {
          if (!values.includes(product[key])) return false;
        }
      }
    }
    return true;
  };

  const filteredProducts = productData.filter(
    (p) => `${p.gender.toLowerCase()}-${p.section}` === activeSection && matchesFilters(p)
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Clothing Shop</h1>
        <nav className="Mega-nav">
          {Object.entries(navStructure).map(([main, subs]) => (
            <div className="dropdown" key={main}>
              <span style={main === 'SALE: UP TO 50% OFF' ? { color: 'red', fontWeight: 'bold' } : {}}>
                {main}
              </span>
              {subs.length > 0 && (
                <div className="dropdown-content">
                  {subs.map(sub => (
                    <div
                      key={sub}
                      onClick={() => {
                        setActiveSection(`${main.toLowerCase()}-${sub}`);
                        setFilters({});
                      }}
                    >
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </header>

      {activeSection && (
        <div className="Main-content">
          <aside className="Filters-vertical">
            <h2>Filters</h2>
            {Object.entries(filtersPerSection[activeSection.split('-')[1]] || {}).map(([category, values]) => (
              <div key={category}>
                <h4>{category.toUpperCase()}</h4>
                {values.map(value => (
                  <label key={value}>
                    <input
                      type="checkbox"
                      checked={(filters[category] || []).includes(value)}
                      onChange={() => handleCheckboxChange(category, value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            ))}
          </aside>

          <section className="Product-list">
            {filteredProducts.map(p => (
              <div key={p.id} className="Product-card">
                <img src={p.image || 'https://via.placeholder.com/200x250?text=No+Image'} alt={p.name} className="Product-img" />
                <h3>{p.name}</h3>
                <p className="Product-price">${p.price}</p>
                <button onClick={() => setCart([...cart, p])}>Add to Cart</button>
              </div>
            ))}
            {filteredProducts.length === 0 && <p>No items match selected filters.</p>}
          </section>

        </div>
      )}
    </div>
  );
}

export default App;
