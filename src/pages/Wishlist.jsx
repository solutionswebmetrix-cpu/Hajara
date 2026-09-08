import './Wishlist.css'

const Wishlist = () => {
  return (
    <div className="wishlist-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Wishlist</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle" style={{ fontSize: '1.2rem' }}>
            Your wishlist is currently empty.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Wishlist
