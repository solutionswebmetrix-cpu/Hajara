import './Cart.css'

const Cart = () => {
  return (
    <div className="cart-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle" style={{ fontSize: '1.2rem' }}>
            Your cart is currently empty.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Cart
