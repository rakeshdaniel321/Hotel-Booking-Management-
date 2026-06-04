
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import TableInquiryForm from './components/TableInquiryForm';

import AdminDashboard from './pages/AdminDashboard'; 
import AdminLogin from './components/AdminLogin';
import ContactForm from './components/ContactForm';
import ContactPage from './pages/ContactPage';
import About from './components/About';
import VerifyOtp from './components/VerifyOtp';

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`app-wrapper ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        
        <Route path="/contact" element={
          <div className="container" style={{ maxWidth: '600px' }}>
            <TableInquiryForm />
          </div>
        } />
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/contactFrom" element={<ContactForm/>}/>
        <Route path="/ContactPageUs" element={<ContactPage/>}/>
        <Route path="About" element={<About/>}/>
        <Route path="/verifyOtp" element={<VerifyOtp/>}/>
        <Route path="*" element={
          <div className="container text-center">
            <h2>404 - Page Not Found</h2>
            <p>The culinary layout index you requested could not be fetched.</p>
          </div>
        } />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
