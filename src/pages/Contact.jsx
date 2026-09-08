import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Contact Us</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form glass-card">
              <h3>Send us a message</h3>
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Email: info@hajaramulticare.com</p>
              <p>Phone: +91 9897023005</p>
              <p>Address: Location, India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
