import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import FiltersSidebar from './components/FiltersSidebar';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import SurveyForm from './components/SurveyForm';
import SurveyThankYou from './components/SurveyThankYou';
import NavigationBreadcrumb from './components/NavigationBreadcrumb';
import Homepage from './components/Homepage';
import BackButton from './components/BackButton';

const homepageLabels = ['Bestseller', 'Popular', 'New', 'Trendy'];
const productData = [
  // Women's Tops
  { id: 1, name: 'Red T-Shirt', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Red', material: 'Cotton', gender: 'Women', price: 24.99, style: 'Casual', trend: 'Bestseller', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=250&fit=crop&crop=center', salePrice: 12.49 }, // 50% off
  { id: 2, name: 'White Blouse', section: 'tops', sizes: ['XS', 'S', 'M'], color: 'White', material: 'Silk', gender: 'Women', price: 34.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=250&fit=crop&crop=center' },
  { id: 3, name: 'Black Tank Top', section: 'tops', sizes: ['M', 'L', 'XL'], color: 'Black', material: 'Polyester', gender: 'Women', price: 19.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop&crop=center', salePrice: 12.49 }, // ~37% off
  { id: 4, name: 'Striped Tee', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Blue', material: 'Cotton', gender: 'Women', price: 21.99, style: 'Casual', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=250&fit=crop&crop=center' },
  { id: 5, name: 'Pink Crop Top', section: 'tops', sizes: ['XS', 'S'], color: 'Pink', material: 'Linen', gender: 'Women', price: 27.99, trend: 'New', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=250&fit=crop&crop=center', salePrice: 18.90 }, // ~32% off

  // Women's Bottoms
  { id: 6, name: 'Jeans', section: 'bottoms', sizes: ['S', 'M', 'L'], color: 'Blue', material: 'Denim', gender: 'Women', price: 39.99, image: 'https://images.unsplash.com/photo-1541840031508-326b77c9a17e?w=200&h=250&fit=crop&crop=center' },
  { id: 7, name: 'Black Leggings', section: 'bottoms', sizes: ['XS', 'S', 'M'], color: 'Black', material: 'Spandex', gender: 'Women', price: 29.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop&crop=center', salePrice: 15.00 }, // 50% off
  { id: 8, name: 'White Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'White', material: 'Cotton', gender: 'Women', price: 25.99, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=250&fit=crop&crop=center' },
  { id: 9, name: 'Plaid Skirt', section: 'bottoms', sizes: ['M', 'L'], color: 'Red', material: 'Wool', gender: 'Women', price: 33.99, image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=200&h=250&fit=crop&crop=center', salePrice: 24.99 }, // ~26% off
  { id: 10, name: 'Beige Trousers', section: 'bottoms', sizes: ['M', 'L', 'XL'], color: 'Beige', material: 'Linen', gender: 'Women', price: 37.99, style: 'Elegant', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop&crop=center' },

  // Women's Shoes
  { id: 11, name: 'Sandals', section: 'shoes', sizes: ['8', '9'], color: 'Beige', material: 'Leather', gender: 'Women', price: 41.99, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=250&fit=crop&crop=center', salePrice: 20.99 }, // 50% off
  { id: 12, name: 'Black Heels', section: 'shoes', sizes: ['7', '8'], color: 'Black', material: 'Suede', gender: 'Women', price: 47.99, trend: 'Classic', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&h=250&fit=crop&crop=center' },
  { id: 13, name: 'Running Shoes', section: 'shoes', sizes: ['8', '9', '10'], color: 'White', material: 'Mesh', gender: 'Women', price: 59.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=250&fit=crop&crop=center' },
  { id: 14, name: 'Brown Boots', section: 'shoes', sizes: ['9', '10'], color: 'Brown', material: 'Leather', gender: 'Women', price: 64.99, style: 'Casual', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=250&fit=crop&crop=center', salePrice: 44.49 }, // ~32% off
  { id: 15, name: 'Ballet Flats', section: 'shoes', sizes: ['6', '7'], color: 'Pink', material: 'Canvas', gender: 'Women', price: 35.99, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=250&fit=crop&crop=center' },

  // Women's Dresses
  { id: 16, name: 'Floral Dress', section: 'dresses', sizes: ['S', 'M', 'L'], color: 'Pink', material: 'Silk', gender: 'Women', price: 54.99, trend: 'New', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=250&fit=crop&crop=center' },
  { id: 17, name: 'Black Maxi Dress', section: 'dresses', sizes: ['M', 'L'], color: 'Black', material: 'Cotton', gender: 'Women', price: 49.99, image: 'https://plus.unsplash.com/premium_photo-1675253119026-b1c8b2802ce1?w=200&h=250&fit=crop&crop=center', salePrice: 25.00 }, // 50% off
  { id: 18, name: 'Red Mini Dress', section: 'dresses', sizes: ['XS', 'S'], color: 'Red', material: 'Linen', gender: 'Women', price: 46.99, style: 'Elegant', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200&h=250&fit=crop&crop=center' },
  { id: 19, name: 'White Sundress', section: 'dresses', sizes: ['S', 'M'], color: 'White', material: 'Cotton', gender: 'Women', price: 52.99, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop&crop=center', salePrice: 42.49 }, // ~20% off
  { id: 20, name: 'Blue Wrap Dress', section: 'dresses', sizes: ['M', 'L'], color: 'Blue', material: 'Polyester', gender: 'Women', price: 48.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop&crop=center' },

  // Men's Tops
  { id: 21, name: 'Men T-Shirt', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Green', material: 'Cotton', gender: 'Men', price: 23.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop&crop=center', salePrice: 11.99 }, // 50% off
  { id: 22, name: 'Polo Shirt', section: 'tops', sizes: ['M', 'L'], color: 'Blue', material: 'Cotton', gender: 'Men', price: 31.99, style: 'Preppy', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=200&h=250&fit=crop&crop=center' },
  { id: 23, name: 'Henley', section: 'tops', sizes: ['M', 'L', 'XL'], color: 'Gray', material: 'Polyester', gender: 'Men', price: 27.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=250&fit=crop&crop=center' },
  { id: 24, name: 'Long Sleeve Tee', section: 'tops', sizes: ['S', 'M', 'L'], color: 'Black', material: 'Cotton', gender: 'Men', price: 29.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=250&fit=crop&crop=center', salePrice: 21.49 }, // ~28% off
  { id: 25, name: 'Graphic Tee', section: 'tops', sizes: ['XS', 'S', 'M'], color: 'White', material: 'Cotton', gender: 'Men', price: 25.99, trend: 'Bestseller', image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=250&fit=crop&crop=center' },

  // Men's Bottoms
  { id: 26, name: 'Chino Pants', section: 'bottoms', sizes: ['M', 'L'], color: 'Beige', material: 'Cotton', gender: 'Men', price: 37.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=250&fit=crop&crop=center' },
  { id: 27, name: 'Cargo Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'Green', material: 'Cotton', gender: 'Men', price: 28.99, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=250&fit=crop&crop=center', salePrice: 14.50 }, // 50% off
  { id: 28, name: 'Slim Jeans', section: 'bottoms', sizes: ['M', 'L', 'XL'], color: 'Blue', material: 'Denim', gender: 'Men', price: 44.99, image: 'https://images.unsplash.com/photo-1541840031508-326b77c9a17e?w=200&h=250&fit=crop&crop=center' },
  { id: 29, name: 'Joggers', section: 'bottoms', sizes: ['S', 'M', 'L'], color: 'Gray', material: 'Fleece', gender: 'Men', price: 34.99, style: 'Athleisure', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=200&h=250&fit=crop&crop=center', salePrice: 24.99 }, // ~29% off
  { id: 30, name: 'Dress Pants', section: 'bottoms', sizes: ['L', 'XL'], color: 'Black', material: 'Polyester', gender: 'Men', price: 49.99, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=250&fit=crop&crop=center' },

  // Men's Shoes
  { id: 31, name: 'Dress Shoes', section: 'shoes', sizes: ['9', '10'], color: 'Black', material: 'Leather', gender: 'Men', price: 69.99, style: 'Formal', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=250&fit=crop&crop=center', salePrice: 35.00 }, // 50% off
  { id: 32, name: 'Sneakers', section: 'shoes', sizes: ['10', '11'], color: 'White', material: 'Mesh', gender: 'Men', price: 54.99, trend: 'Popular', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=250&fit=crop&crop=center' },
  { id: 33, name: 'Boots', section: 'shoes', sizes: ['10', '11'], color: 'Brown', material: 'Leather', gender: 'Men', price: 74.99, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=250&fit=crop&crop=center' },
  { id: 34, name: 'Loafers', section: 'shoes', sizes: ['9', '10'], color: 'Navy', material: 'Suede', gender: 'Men', price: 59.99, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=250&fit=crop&crop=center', salePrice: 41.99 }, // ~30% off
  { id: 35, name: 'Flip Flops', section: 'shoes', sizes: ['8', '9'], color: 'Gray', material: 'Rubber', gender: 'Men', price: 17.99, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=250&fit=crop&crop=center' },

  // Kids' Tops
  { id: 36, name: 'Kid Tee', section: 'tops', sizes: ['S', 'M'], color: 'Yellow', material: 'Cotton', gender: 'Kids', price: 14.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop&crop=center' },
  { id: 37, name: 'Kid Hoodie', section: 'tops', sizes: ['M', 'L'], color: 'Red', material: 'Fleece', gender: 'Kids', price: 27.99, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=250&fit=crop&crop=center', salePrice: 14.00 }, // 50% off
  { id: 38, name: 'Kid Tank Top', section: 'tops', sizes: ['XS', 'S'], color: 'Green', material: 'Cotton', gender: 'Kids', price: 13.99, trend: 'New', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=250&fit=crop&crop=center' },
  { id: 39, name: 'Kid Long Sleeve', section: 'tops', sizes: ['S', 'M'], color: 'Blue', material: 'Polyester', gender: 'Kids', price: 21.99, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=250&fit=crop&crop=center' },
  { id: 40, name: 'Kid Graphic Tee', section: 'tops', sizes: ['XS', 'S'], color: 'White', material: 'Cotton', gender: 'Kids', price: 15.99, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=250&fit=crop&crop=center', salePrice: 8.00 }, // 50% off

  // Kids' Bottoms
  { id: 41, name: 'Kid Joggers', section: 'bottoms', sizes: ['S', 'M'], color: 'Gray', material: 'Fleece', gender: 'Kids', price: 22.99, image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=200&h=250&fit=crop&crop=center' },
  { id: 42, name: 'Kid Shorts', section: 'bottoms', sizes: ['S', 'M'], color: 'Blue', material: 'Cotton', gender: 'Kids', price: 19.99, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=250&fit=crop&crop=center', salePrice: 10.00 }, // ~50% off
  { id: 43, name: 'Kid Leggings', section: 'bottoms', sizes: ['XS', 'S'], color: 'Pink', material: 'Spandex', gender: 'Kids', price: 18.99, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=250&fit=crop&crop=center' },
  { id: 44, name: 'Kid Jeans', section: 'bottoms', sizes: ['S', 'M'], color: 'Denim', material: 'Denim', gender: 'Kids', price: 23.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=250&fit=crop&crop=center' },
  { id: 45, name: 'Kid Sweatpants', section: 'bottoms', sizes: ['S', 'M'], color: 'Black', material: 'Cotton', gender: 'Kids', price: 20.99, image: 'https://images.unsplash.com/photo-1715532098035-a343b26eaeaa?w=200&h=250&fit=crop&crop=center', salePrice: 14.39 }, // ~31% off

  // Kids' Shoes
  { id: 46, name: 'Kid Sneakers', section: 'shoes', sizes: ['2', '3'], color: 'Red', material: 'Mesh', gender: 'Kids', price: 29.99, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=250&fit=crop&crop=center' },
  { id: 47, name: 'Kid Sandals', section: 'shoes', sizes: ['2', '3'], color: 'Blue', material: 'Rubber', gender: 'Kids', price: 21.99, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=250&fit=crop&crop=center' },
  { id: 48, name: 'Kid Boots', section: 'shoes', sizes: ['2', '3'], color: 'Brown', material: 'Leather', gender: 'Kids', price: 34.99, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&h=250&fit=crop&crop=center' },
  { id: 49, name: 'Kid Loafers', section: 'shoes', sizes: ['1', '2'], color: 'Black', material: 'Canvas', gender: 'Kids', price: 27.99, style: 'Formal', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=250&fit=crop&crop=center' },
  { id: 50, name: 'Kid Flip Flops', section: 'shoes', sizes: ['2', '3'], color: 'Green', material: 'Rubber', gender: 'Kids', price: 11.99, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=200&h=250&fit=crop&crop=center' }
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
  const [saleGenderFilters, setSaleGenderFilters] = useState([]);
  const [saleSectionFilters, setSaleSectionFilters] = useState([]);

  // Shopping flow state
  const [currentView, setCurrentView] = useState('home'); // Changed from 'products' to 'home'
  const [orderDetails, setOrderDetails] = useState(null);
  const [surveyData, setSurveyData] = useState(null);

  // Navigation state
  const [navigationHistory, setNavigationHistory] = useState(['home']);

  const handleGoHome = () => {
    setCurrentView('home');
    setActiveSection('');
    setNavigationHistory(['home']);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setCurrentView('products');

    // Update navigation history
    const newHistory = [...navigationHistory];
    if (newHistory[newHistory.length - 1] !== 'products') {
      newHistory.push('products');
    }
    setNavigationHistory(newHistory);
  };

  const handleFiltersReset = () => {
    setFilters({});
    setSaleGenderFilters([]);
    setSaleSectionFilters([]);
  };

  const toggleSaleGender = (gender) => {
    setSaleGenderFilters(prev => {
      const updated = prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender];
      setSaleSectionFilters([]);
      return updated;
    });
  };

  const toggleSaleSection = (section) => {
    setSaleSectionFilters(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleCheckboxChange = (category, value) => {
    const current = filters[category] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFilters({ ...filters, [category]: updated });
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleProceedToCheckout = () => {
    setCurrentView('checkout');

    // Update navigation history
    const newHistory = [...navigationHistory];
    if (newHistory[newHistory.length - 1] !== 'checkout') {
      newHistory.push('checkout');
    }
    setNavigationHistory(newHistory);
  };

  const handleBackToCart = () => {
    setCurrentView('cart');
  };

  const handleContinueShopping = () => {
    if (activeSection) {
      setCurrentView('products');
    } else {
      setCurrentView('home');
    }
  };

  const handleStartShopping = () => {
    setCurrentView('home');
    setActiveSection('');
  };

  const handleTakeSurvey = () => {
    setCurrentView('survey');

    // Update navigation history
    const newHistory = [...navigationHistory];
    newHistory.push('survey');
    setNavigationHistory(newHistory);
  };

  const handleSubmitSurvey = (formData) => {
    setSurveyData(formData);
    setCurrentView('survey-thanks');
  };

  const handleSubmitOrder = (formData) => {
    setOrderDetails(formData);
    setCurrentView('confirmation');
    setCart([]); // Clear cart after successful order
  };

  const handleSkipSurvey = () => {
    setCurrentView('home');
    setActiveSection('');
    setNavigationHistory(['home']);
  };

  const handleSurveyComplete = () => {
    setCurrentView('home');
    setActiveSection('');
    setNavigationHistory(['home']);
  };

  const handleNavigateFromBreadcrumb = (destination) => {
    if (destination === 'home') {
      handleGoHome();
    } else if (destination === 'cart') {
      setCurrentView('cart');
    }
  };

  const handleViewCart = () => {
    setCurrentView('cart');

    // Update navigation history
    const newHistory = [...navigationHistory];
    if (newHistory[newHistory.length - 1] !== 'cart') {
      newHistory.push('cart');
    }
    setNavigationHistory(newHistory);
  };

  // Get featured products for homepage
  const getFeaturedProducts = () => {
    return productData.filter(product =>
      ['Bestseller', 'Popular', 'New', 'Trending'].includes(product.trend)
    ).slice(0, 8);
  };

  const matchesFilters = (product) => {
    for (const [key, values] of Object.entries(filters)) {
      if (values.length > 0) {
        if (key === 'size') {
          if (!product.sizes?.some(size => values.includes(size))) return false;
        } else if (key === 'price') {
          const price = product.salePrice !== undefined ? product.salePrice : product.price;
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

  const filteredProducts = productData.filter((p) => {
    if (activeSection === 'sale') {
      if (!p.salePrice) return false;
      if (saleGenderFilters.length > 0 && !saleGenderFilters.includes(p.gender)) return false;
      if (saleSectionFilters.length > 0 && !saleSectionFilters.includes(p.section)) return false;

      for (const [key, values] of Object.entries(filters)) {
        if (values.length > 0) {
          if (key === 'size') {
            if (!p.sizes?.some(size => values.includes(size))) return false;
          } else if (key === 'price') {
            const price = p.salePrice !== undefined ? p.salePrice : p.price;
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
            if (!values.includes(p[key])) return false;
          }
        }
      }
      return true;
    }

    // New "all" section to show all products
    if (activeSection === 'all') {
      return matchesFilters(p);
    }

    if (activeSection.endsWith('-all')) {
      const gender = activeSection.split('-')[0];
      return p.gender.toLowerCase() === gender && matchesFilters(p);
    }

    return `${p.gender.toLowerCase()}-${p.section}` === activeSection && matchesFilters(p);
  });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Homepage
            onSectionChange={handleSectionChange}
            featuredProducts={getFeaturedProducts()}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cart':
        return (
          <CartView
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onProceedToCheckout={handleProceedToCheckout}
            onContinueShopping={handleContinueShopping}
          />
        );
      case 'checkout':
        return (
          <CheckoutForm
            cart={cart}
            onSubmitOrder={handleSubmitOrder}
            onBackToCart={handleBackToCart}
          />
        );
      case 'confirmation':
        return (
          <OrderConfirmation
            orderDetails={orderDetails}
            onStartShopping={handleStartShopping}
            onTakeSurvey={handleTakeSurvey}
          />
        );
      case 'survey':
        return (
          <SurveyForm
            onSubmitSurvey={handleSubmitSurvey}
            onSkipSurvey={handleSkipSurvey}
          />
        );
      case 'survey-thanks':
        return (
          <SurveyThankYou
            surveyData={surveyData}
            onContinueShopping={handleSurveyComplete}
          />
        );
      default: // 'products'
        return (
          <>
            {activeSection && (
              <div className="Main-content">
                <FiltersSidebar
                  activeSection={activeSection}
                  filters={filters}
                  onFilterChange={handleCheckboxChange}
                  saleGenderFilters={saleGenderFilters}
                  saleSectionFilters={saleSectionFilters}
                  onSaleGenderToggle={toggleSaleGender}
                  onSaleSectionToggle={toggleSaleSection}
                  productData={productData}
                />

                <ProductList
                  products={filteredProducts}
                  onAddToCart={handleAddToCart}
                />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="App">
      <Header
        onSectionChange={handleSectionChange}
        onFiltersReset={handleFiltersReset}
        cartCount={cart.length}
        onViewCart={handleViewCart}
        onGoHome={handleGoHome}
        currentView={currentView}
      />

      <NavigationBreadcrumb
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigateFromBreadcrumb}
      />

      {renderCurrentView()}
    </div>
  );
}

export default App;
