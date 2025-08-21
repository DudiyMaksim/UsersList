import { useState, useEffect } from 'react';
import './UsersScreen.css';

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/Users/list');

            if (!response.ok) {
                throw new Error('Не вдалося завантажити дані користувачів');
            }

            const userData = await response.json();
            setUsers(userData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const renderTableRow = (user) => (
        <tr key={user.id} className="user-row">
            <td className="cell-photo">
                <img
                    src={`http://localhost:5000/images/${user.image}`}
                    alt={user.fullName}
                    className="user-photo"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }}
                />
                <div className="photo-placeholder" style={{display: 'none'}}>
                    {user.fullName.charAt(0)}
                </div>
            </td>
            <td className="cell-id">{user.id}</td>
            <td className="cell-name">{user.fullName}</td>
            <td className="cell-email">{user.email}</td>
            <td className="cell-phone">{user.roles}</td>
        </tr>
    );

    if (loading) {
        return (
            <div className="center-container">
                <div className="loading-spinner"></div>
                <div className="loading-text">Завантаження користувачів...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="center-container">
                <div className="error-text">Помилка: {error}</div>
                <button className="retry-button" onClick={fetchUsers}>
                    Спробувати ще раз
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="title">Список користувачів</h2>

            <div className="table-container">
                <table className="users-table">
                    <thead>
                    <tr>
                        <th className="cell-photo">Фото</th>
                        <th className="cell-id">ID</th>
                        <th className="cell-name">Ім'я</th>
                        <th className="cell-email">Email</th>
                        <th className="cell-role">Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(renderTableRow)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersScreen;