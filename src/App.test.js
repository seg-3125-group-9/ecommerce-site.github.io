import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Wardrobe & Co title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Wardrobe & Co./i);
  expect(titleElement).toBeInTheDocument();
});

test('renders homepage by default', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Wardrobe & Co!/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders navigation elements', () => {
  render(<App />);
  const saleNavElement = screen.getByText(/SALE: UP TO 50% OFF/i);
  expect(saleNavElement).toBeInTheDocument();
});
