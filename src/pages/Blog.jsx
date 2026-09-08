import './Blog.css'

const Blog = () => {
  return (
    <div className="blog-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="section-subtitle" style={{ fontSize: '1.2rem' }}>
            Discover articles on Ayurveda, wellness, and healthy living.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Blog
