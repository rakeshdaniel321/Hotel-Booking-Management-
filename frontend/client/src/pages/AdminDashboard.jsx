import { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminLogs = async () => {
      try {
        setFetching(true);
        setError(''); 

     
        const { data } = await api.get('/api/v1/inquiries');

        if (data.success) {
          setLogs(data.data);
        } else {
          setError(data.message || 'Unable to fetch inquiries');
        }
      } catch (err) {
        
        setError(
          err.response?.data?.message ||
          err.message ||
          'Failed to connect to server'
        );
      } finally {
        setFetching(false);
      }
    };

    fetchAdminLogs();
  }, []);

  if (fetching) {
    return (
      <main className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading inquiries...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container" style={{ padding: '2rem' }}>
        <div className="alert-danger" style={{ padding: '1rem', background: '#ffebe9', color: '#ff3b30', borderRadius: '8px', border: '1px solid #ffdad6' }}>
          <strong>Error:</strong> {error}
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard container animate-fade-in">
      <header className="admin-header">
        <h1>Inquiry Management Dashboard</h1>
        <p className="section-p-sub">
          Review all restaurant reservations and inquiry submissions.
        </p>
      </header>

      <section className="menu-category-section">
        <div
          className="category-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <span>Active Reservations</span>
          <span
            style={{
              fontSize: '1rem',
              background: '#007bff',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: '50px'
            }}
          >
            {logs.length} Logs
          </span>
        </div>

        <div className="table-responsive-container">
          <table className="admin-data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Guest Name</th>
                <th style={{ padding: '12px' }}>Phone</th>
                <th style={{ padding: '12px' }}>Date & Time</th>
                <th style={{ padding: '12px' }}>Guests</th>
                <th style={{ padding: '12px' }}>Image</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="table-row-interactive" style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}><strong>{log.name}</strong></td>
                    <td style={{ padding: '12px' }}>{log.phone}</td>
                    <td style={{ padding: '12px' }}>{new Date(log.date).toLocaleString()}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge-covers" style={{ background: '#e1f5fe', color: '#0288d1', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                        {log.guests} Seats
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {log.screenshotUrl ? (
                        <a
                          href={log.screenshotUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#007bff', textDecoration: 'none', fontWeight: '600' }}
                        >
                          View Image ↗
                        </a>
                      ) : (
                        <span style={{ color: '#aaa' }}>None</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
