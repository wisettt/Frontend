import React, { useState, useEffect } from 'react';
import { getUsers, addUser } from './api';

const App = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // ดึงข้อมูลจาก API
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    // เพิ่มข้อมูลใหม่
    const handleAddUser = async () => {
        const newUser = { name, email };
        const addedUser = await addUser(newUser);
        setUsers([...users, { ...newUser, id: addedUser.id }]);
        setName('');
        setEmail('');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>User Management</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>

            <h2>Add New User</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleAddUser}>Add User</button>
        </div>
    );
};

export default App;
