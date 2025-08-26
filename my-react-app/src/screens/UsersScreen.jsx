import { useState, useEffect } from 'react';
import './UsersScreen.css';

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState('all');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/Users/list');

            if (!response.ok) {
                throw new Error('Не вдалося завантажити дані користувачів');
            }

            const userData = await response.json();
            console.log('Дані користувачів:', userData);
            setUsers(userData);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getAuthProviderBadgeClass = (provider) => {
        if (!provider) return 'badge bg-secondary';

        switch (provider) {
            case 'Email':
                return 'badge bg-primary';
            case 'Google':
                return 'badge bg-danger';
            case 'Facebook':
                return 'badge bg-info';
            case 'Microsoft':
                return 'badge bg-success';
            default:
                return 'badge bg-secondary';
        }
    };

    // Функція для форматування ролей
    const formatRoles = (roles) => {
        if (Array.isArray(roles)) {
            return roles.join(', ');
        }
        if (typeof roles === 'string') {
            return roles;
        }
        if (roles && typeof roles === 'object') {
            return Object.values(roles).join(', ');
        }
        return 'No roles';
    };

    // Функція для отримання класу для ролі
    const getRoleBadgeClass = (roles) => {
        const rolesString = formatRoles(roles).toLowerCase();
        if (rolesString.includes('admin')) {
            return 'role-badge role-admin';
        }
        return 'role-badge role-user';
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Отримання унікальних провайдерів для фільтра - використовуємо authorovider
    const uniqueProviders = ['all', ...new Set(users.map(user => user.authProvider || 'Unknown'))];

    // Фільтрація користувачів за провайдером - використовуємо authorovider
    const filteredUsers = selectedProvider === 'all'
        ? users
        : users.filter(user => (user.authProvider || 'Unknown') === selectedProvider);

    const renderTableRow = (user) => {
        const authProvider = user.authProvider || 'Unknown'; // Використовуємо authorovider

        return (
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
                        {user.fullName?.charAt(0) || 'U'}
                    </div>
                </td>
                <td className="cell-id">{user.id}</td>
                <td className="cell-name">{user.fullName}</td>
                <td className="cell-email">{user.email}</td>
                <td className="cell-role">
                    <span className={getRoleBadgeClass(user.roles)}>
                        {formatRoles(user.roles)}
                    </span>
                </td>
                <td className="cell-auth-provider">
                    <span className={`auth-badge ${getAuthProviderBadgeClass(authProvider)}`}>
                        {authProvider}
                    </span>
                </td>
            </tr>
        );
    };

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
                        <th className="cell-auth-provider">Спосіб реєстрації</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(renderTableRow)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersScreen;