
import { Link } from "react-router-dom"; // பக்கங்களை இணைக்க Router Link தேவை
import { Phone, MapPin, ShieldAlert, MessageSquare } from "lucide-react"; // ஐகான்கள்
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        
       //information
        <div className="footer-section footer-info">
          <h3>Urban Spoon</h3>
          <p className="footer-address">
            <MapPin size={16} /> 123 Culinary Street, Food District, CH 600001
          </p>
          <p className="footer-contact-item">
            <Phone size={14} /> +91 44 2345 6789
          </p>
        </div>

      
        <div className="footer-section footer-hours">
          <h4>Opening Hours</h4>
          <p>Mon - Fri: 11:00 AM - 11:00 PM</p>
          <p>Sat - Sun: 10:00 AM - 11:59 PM</p>
        </div>

       
        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/contactFrom">
                <MessageSquare size={16} /> Contact From 
              </Link>
            </li>
            <li>
              <Link to="/AdminLogin">
                <ShieldAlert size={16} /> Admin Portal
              </Link>
            </li>
              <li>
              <Link to="/ContactPageUs">
                <ShieldAlert size={16} /> Contact Us
              </Link>
            </li>
              <li>
              <Link to="/About">
                <ShieldAlert size={16} />About 
              </Link>
            </li>
            
          </ul>
        </div>

      </div>

     
      <div className="footer-bottom">
        <p>&copy; {currentYear} Urban Spoon. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
