
  import ContactForm from '../components/ContactForm';
  import MapPlaceholder from '../components/MapPlaceholder';
  import "../styles/ContactPage.css"
  const ContactPage = () => {
    const officeHours = [
      { days: 'Monday - Friday', time: '11:00 AM - 11:00 PM' },
      { days: 'Saturday - Sunday', time: '10:00 AM - 11:59 PM' },
    ];

    return (
      <main className="contact-page container">
        <header className="contact-header">
          <h1>Connect With Us</h1>
          <p>Have a question about our menu, private events, or catering services? Reach out today.</p>
        </header>

        <div className="contact-layout-grid">
          {/* Left Side: Business Info Metrics */}
          <section className="contact-info-cards">
            <div className="info-card">
              <h4>Our Location</h4>
              <address>
                123 Culinary Street, <br />
                Food District, Chennai - 600001
              </address>
            </div>

            <div className="info-card">
              <h4>Direct Contacts</h4>
              <p><strong>Phone:</strong> +91 44 2345 6789</p>
              <p><strong>Email:</strong> support@urbanspoon.com</p>
            </div>

            <div className="info-card">
              <h4>Operating Hours</h4>
              <ul className="hours-list">
                {officeHours.map((schedule, idx) => (
                  <li key={idx}>
                    <span className="days">{schedule.days}:</span>
                    <span className="time">{schedule.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Right Side: Active User Interactivity fields */}
          <section className="contact-form-section">
            <ContactForm />
          </section>
        </div>

        {/* Full-width Location Frame Section */}
        <section className="location-map-section">
          <h3>Find Us On the Map</h3>
          <MapPlaceholder />
        </section>
      </main>
    );
  };

  export default ContactPage;