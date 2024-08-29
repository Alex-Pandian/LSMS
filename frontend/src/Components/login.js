import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import background from './VCET.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function StudentLoginForm() 
{
  const [stdinput,Setstuinput]=useState({ username: '', password: '', role: 'student' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { role, username, password } = stdinput;  // Use `stdinput` for students
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username, password, role })
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
  
      const data = await res.json();
      localStorage.setItem('token', data.token);  // Store the token
      navigate(`/std-home/${data.userId}`, { state: { username } });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleChange = (e) => {
      const { name, value } = e.target;
      Setstuinput((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '10px',
    color: '#6c757d', // Adjust color as needed
    cursor: 'pointer',
    zIndex: 2,
  };

  return (
    <form className="text-center shadow p-3 d-flex flex-column gap-3" onSubmit={handleSubmit}>
      <h2>Student Login</h2>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="studentUsername" className="me-2 col-2">Username</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type="text"
            className="form-control"
            id="studentUsername"
            name="username"
            placeholder="Enter Username"
            value={stdinput.username}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <FaUser style={iconStyle} size={20} />
        </div>
      </div>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="studentPassword" className="me-2 col-2">Password</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="studentPassword"
            name="password"
            placeholder="Password"
            value={stdinput.password}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <span onClick={togglePasswordVisibility} style={iconStyle}>
            {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
          </span>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

function FacultyLoginForm() 
{
  const [facultyinput,Setfacultyinput]=useState({ role: 'faculty', username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate1=useNavigate();
  const handleSubmit= async(e) => {
    e.preventDefault();
    console.log('works');
    const { role, username, password } = facultyinput;
    try 
    {
        const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({username,password,role})
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);

        navigate1(`/faculty-home/${data.userId}`, { state: { username } });
    } catch (err) {
      setError(err.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    Setfacultyinput((prev) => ({ ...prev, [name]: value }));
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '10px',
    color: '#6c757d', // Adjust color as needed
    cursor: 'pointer',
    zIndex: 2,
  };

  return (
    <form className="text-center shadow p-3 d-flex flex-column gap-3" onSubmit={handleSubmit}>
      <h2>Faculty Login</h2>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="facultyUsername" className="me-2 col-2">Username</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type="text"
            className="form-control"
            id="facultyUsername"
            name="username"
            placeholder="Enter Username"
            value={facultyinput.username}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <FaUser style={iconStyle} size={20} />
        </div>
      </div>
      <div className="form-group position-relative d-flex align-items-center">
        <label htmlFor="facultyPassword" className="me-2 col-2">Password</label>
        <div style={{ position: 'relative', flexGrow: 1 }}>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="facultyPassword"
            name="password"
            placeholder="Password"
            value={facultyinput.password}
            onChange={handleChange}
            style={{ paddingRight: '40px' }}
          />
          <span onClick={togglePasswordVisibility} style={iconStyle}>
            {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
          </span>
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

function LoginForm() {
  const [activeTab, setActiveTab] = useState('student');
  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }} className="d-flex flex-column justify-content-center align-items-center">
      <div className="container d-inline-flex justify-content-center fs-2 text-dark"><span>Velammal College of Engineering and Technology</span></div>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="d-flex flex-column align-items-center shadow p-4 bg-dark" style={{ maxWidth: '500px', width: '100%' }}>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="student">Student</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="faculty">Faculty</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="w-100 mt-3 text-white">
            {activeTab === 'student' && <StudentLoginForm/>}
            {activeTab === 'faculty' && <FacultyLoginForm/>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;