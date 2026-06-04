
import React, { useState, useCallback } from 'react';

import '../styles/TableInquiryForm.css'
const TableInquiryForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: 2 });
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataPayload = new FormData();
      dataPayload.append('name', formData.name);
      dataPayload.append('phone', formData.phone);
      dataPayload.append('date', formData.date);
      dataPayload.append('guests', formData.guests);
      if (screenshot) {
        dataPayload.append('screenshot', screenshot);
      }

      const response = await fetch('http://localhost:8000/api/v1/inquiries', {
        method: 'POST',
        body: dataPayload,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setApiResponse({ success: true, details: result.data });
        setFormData({ name: '', phone: '', date: '', guests: 2 });
        setScreenshot(null);
      } else {
        setApiResponse({ success: false, message: result.message || 'Submission failed.' });
      }
    } catch (err) {
      setApiResponse({ success: false, message: err.message || 'Server unreachable. Verify port 8000 is running.' });
    } finally {
      setLoading(false);
    }
  };

  // Fixed class configurations here to match your exact Level 5 CSS declarations
  if (apiResponse?.success) {
    const { name, phone, date, guests, screenshotUrl, _id } = apiResponse.details;
    return (
      <div className="confirmation-card animate-fade-in text-left">
        <div className="success-icon-badge">✓</div>
        <h3 style={{textAlign: 'center', fontWeight: '800'}}>Booking Confirmed!</h3>
        <p className="section-p-sub" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Your inquiry details have been saved directly inside our active management pipeline matrix.
        </p>
                                                                  
        <div className="summary-details-box">
          <p><strong>Inquiry ID:</strong> <span className="mono-text">{_id}</span></p>
          <p><strong>Lead Guest Name:</strong> <span>{name}</span></p>
          <p><strong>Primary Phone:</strong> <span>{phone}</span></p>
          <p><strong>Arrangement Time:</strong> <span>{new Date(date).toLocaleString()}</span></p>
          <p><strong>Allocated Covers:</strong> <span className="badge-covers">{guests} Seats</span></p>
          {screenshotUrl && (
            <p style={{ border: 'none', padding: '0.5rem 0 0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <strong>Attached your ID(Aadhaar,Identity) :</strong>
              <a href={screenshotUrl} target="_blank" rel="noreferrer" className="mono-text" style={{ color: 'var(--primary-color)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                View Uploaded  File ↗
              </a>
            </p>
          )}
        </div>

        <button className="btn btn-primary btn-block" onClick={() => setApiResponse(null)}>
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="form-wrapper text-left animate-fade-in">
      <h3>Book a Table Inquiry</h3>
      <p className="section-p-sub">Submit reservation data metrics directly to check real-time availability queues.</p>
      
      {apiResponse?.success === false && (
        <div className="alert-danger" role="alert">
          {apiResponse.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="contact-form mt-2" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Desired Date & Time</label>
          <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input type="number" id="guests" name="guests" min="1" max="20" value={formData.guests} onChange={handleChange} required disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="screenshot">Reference Screenshot (Optional)</label>
          <input type="file" id="screenshot" name="screenshot" accept="image/*" onChange={handleFileChange} disabled={loading} style={{ border: 'dashed 2px #cbd5e1', padding: '0.5rem', width: '100%', borderRadius: '6px' }} />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Processing System Locks...' : 'Submit Inquiry Request'}
        </button>
      </form>
    </div>
  );
};

export default React.memo(TableInquiryForm);
