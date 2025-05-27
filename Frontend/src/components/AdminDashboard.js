import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const ADMIN_PHONE = '03151251123';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    axios.get(`${config.API_URL}/api/auth/all-users`)
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeleting(true);
    try {
      await axios.delete(`${config.API_URL}/api/auth/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting user');
    }
    setDeleting(false);
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL users except admin?')) return;
    setDeleting(true);
    try {
      await axios.delete(`${config.API_URL}/api/auth/users`);
      setUsers(users.filter(user => user.phoneNumber === ADMIN_PHONE));
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting users');
    }
    setDeleting(false);
  };

  return (
    <div style={{ color: '#fff', textAlign: 'center', marginTop: '30px' }}>
      <h1>Admin Dashboard</h1>
      <p>All registered users:</p>
      <button
        onClick={handleDeleteAll}
        disabled={deleting || users.filter(u => u.phoneNumber !== ADMIN_PHONE).length === 0}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          background: '#ff1744',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Delete All Users (Except Admin)
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ margin: '0 auto', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Username</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Phone</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Balance</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Active</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Created At</th>
              <th style={{ border: '1px solid #888', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{user.username}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{user.phoneNumber}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{user.balance}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{user.isActive ? 'Yes' : 'No'}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>{new Date(user.createdAt).toLocaleString()}</td>
                <td style={{ border: '1px solid #888', padding: '8px' }}>
                  {user.phoneNumber !== ADMIN_PHONE && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deleting}
                      style={{
                        padding: '4px 10px',
                        background: '#ff1744',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
