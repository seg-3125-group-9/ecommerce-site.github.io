import React from 'react';

const CartView = ({ cart, onRemoveFromCart, onProceedToCheckout, onContinueShopping }) => {
    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = item.salePrice || item.price;
            return total + price;
        }, 0);
    };

    const calculateSavings = () => {
        return cart.reduce((savings, item) => {
            if (item.salePrice) {
                return savings + (item.price - item.salePrice);
            }
            return savings;
        }, 0);
    };

    const total = calculateTotal();
    const savings = calculateSavings();

    if (cart.length === 0) {
        return (
            <div className="cart-view">
                <div className="cart-header">
                    <h2>Your Shopping Cart</h2>
                </div>
                <div className="empty-cart">
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything to your cart yet. Let's find you some amazing pieces!</p>
                    <button onClick={onContinueShopping} className="btn-primary">
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-view">
            <div className="cart-header">
                <button onClick={onContinueShopping} className="btn-secondary">
                    ← Continue Shopping
                </button>
                <h2>Your Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
            </div>

            <div className="cart-items">
                {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h4>{item.name}</h4>
                            <p className="item-material">{item.material} • {item.color}</p>
                            <div className="item-price">
                                {item.salePrice ? (
                                    <>
                                        <span className="original-price">${item.price.toFixed(2)}</span>
                                        <span className="sale-price">${item.salePrice.toFixed(2)}</span>
                                        <span className="savings-badge">
                                            You save ${(item.price - item.salePrice).toFixed(2)}!
                                        </span>
                                    </>
                                ) : (
                                    <span className="regular-price">${item.price.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => onRemoveFromCart(index)}
                            className="remove-btn"
                            aria-label={`Remove ${item.name} from cart`}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                {savings > 0 && (
                    <div className="savings-summary">
                        <span className="savings-text">🎉 You're saving ${savings.toFixed(2)} today!</span>
                    </div>
                )}
                <div className="total-summary">
                    <span className="total-label">Total: </span>
                    <span className="total-amount">${total.toFixed(2)}</span>
                </div>
                <button onClick={onProceedToCheckout} className="btn-primary checkout-btn">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartView;
