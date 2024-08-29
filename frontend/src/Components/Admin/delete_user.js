import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Deleteuser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/admin/get");
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/api/admin/delete/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            fetchUsers();
            const data = await res.text(); // Ensure the response is parsed correctly
            console.log("backend response:", data);
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">User Management</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Username"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Deleteuser;
