import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../VCET.jpeg';

function AdminLogin() {
  const [adminput, setAdminput] = useState({ username: '', password: '' });
  const navigate1 = useNavigate();
  const handleAdminInputChange = (ev) => {
    const { name, value } = ev.target;
    setAdminput((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('works');
    const { username, password } = adminput;
    try {
      const res = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({username, password })
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      navigate1('/adminlogin/admin-home');
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <h1 id="head" style={{ textAlign: 'center', marginTop: '0px' }}>
          Velammal College of Engineering & Technology
        </h1>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div style={{ height: '300px', width: '400px' }}>
            <form id="admin-form" onSubmit={handleFormSubmit} className="p-4 border rounded bg-light">
              <h2 className="text-center mb-4">Admin Login</h2>
              <div className="form-group">
                <label htmlFor="admin_name">Enter admin name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="admin_name"
                  name="username"
                  value={adminput.username}
                  onChange={handleAdminInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="admin_password">Enter password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="admin_password"
                  name="password"
                  value={adminput.password}
                  onChange={handleAdminInputChange}
                />
              </div><br />
              <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;