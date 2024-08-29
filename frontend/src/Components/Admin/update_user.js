import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [backupUser, setBackupUser] = useState(null);

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

    const handleEditClick = (user) => {
        setEditMode(user._id);
        setBackupUser({ ...user });
    };

    const handleUpdate = async (id, updatedUser) => {
        try {
            const res = await fetch(`http://localhost:8000/api/admin/edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.text(); // Ensure the response is parsed correctly
            console.log("backend response:", data);
            fetchUsers();
            setEditMode(null); // Clear edit mode
        } catch (error) {
            console.error('Error updating user:', error.message);
        }
    };

    const handleCancel = () => {
        setUsers(users.map(user => user._id === backupUser._id ? backupUser : user));
        setEditMode(null);
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
                            <td>
                                {editMode === user._id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.username}
                                        onChange={(e) => setUsers(users.map(u => u._id === user._id ? { ...u, username: e.target.value } : u))}
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editMode === user._id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={user.password}
                                        onChange={(e) => setUsers(users.map(u => u._id === user._id ? { ...u, password: e.target.value } : u))}
                                    />
                                ) : (
                                    user.password
                                )}
                            </td>
                            <td>
                                {editMode === user._id ? (
                                    <>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleUpdate(user._id, users.find(u => u._id === user._id))}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Update
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UpdateUser;
