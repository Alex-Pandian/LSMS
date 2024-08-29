import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export function Adduser() {
    const [adduserinput, Setadduserinput] = useState({ username: '', password: '', email: '', role: 'student' });

    const handlechange = (e) => {
        const { name, value } = e.target;
        Setadduserinput((pre) => { return { ...pre, [name]: value } });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('works');
        const { username, password, email, role } = adduserinput;
        console.log(username, password, email, role);
        try {
            const res = await fetch("http://localhost:8000/api/admin/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ username, password, email, role })
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            };
            console.log('success');
            Setadduserinput({ username: '', password: '', email: '', role: 'student' });
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <form className="shadow p-3 d-flex flex-column gap-3" style={{ width: '50%', marginTop: '40px', marginLeft: '40px' }} onSubmit={handleFormSubmit} id="addform">
            <h2 style={{ textAlign: 'center' }}>Add Faculty Form</h2>
            <div className="form-group">
                <label>Username:</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name='username'
                    value={adduserinput.username}
                    onChange={handlechange}
                    placeholder="Enter Username"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    value={adduserinput.password}
                    onChange={handlechange}
                    placeholder="Enter the Password"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    name='email'
                    value={adduserinput.email}
                    onChange={handlechange}
                    placeholder="Enter email"
                    style={{ width: '100%' }}
                    required
                />
            </div>
            <div className="form-group">
                <label>Role:</label>
                <select
                    className="form-control"
                    id="role"
                    name="role"
                    value={adduserinput.role}
                    onChange={handlechange}
                    style={{ width: '100%' }}
                    required
                >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add User</button>
        </form>
    );
}
