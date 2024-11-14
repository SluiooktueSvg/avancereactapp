import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    // Estados
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Si es login (true) o registro (false)
    const [userType, setUserType] = useState('user'); // 'admin' o 'user'

    // Verificar si el usuario ya está logueado
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsAuthenticated(true); // Si hay un usuario en localStorage, lo consideramos logueado
        }
    }, []);

    // Manejo del formulario de Login para Administradores y Usuarios
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Lógica para verificar las credenciales
        if (isLogin) {
            // Si es login, validamos las credenciales
            if (userType === 'admin') {
                // Credenciales de Admin
                if (username === 'admin' && password === 'adminpass') {
                    const user = { username, role: 'admin' };
                    localStorage.setItem('user', JSON.stringify(user));
                    setIsAuthenticated(true);
                    setError('');
                } else {
                    setError('Credenciales de administrador incorrectas.');
                }
            } else {
                // Credenciales de Usuario Normal
                if (username === 'user' && password === 'userpass') {
                    const user = { username, role: 'user' };
                    localStorage.setItem('user', JSON.stringify(user));
                    setIsAuthenticated(true);
                    setError('');
                } else {
                    setError('Credenciales de usuario incorrectas.');
                }
            }
        } else {
            // Si es registro, guardamos al nuevo usuario
            if (userType === 'admin') {
                if (username === 'admin') {
                    setError('El nombre de usuario admin ya está registrado.');
                } else {
                    const newUser = { username, password, role: 'admin' };
                    localStorage.setItem('user', JSON.stringify(newUser));
                    setIsLogin(true); // Cambiamos a la vista de login
                    setError('');
                    alert('Registro de Administrador exitoso. Ahora puedes iniciar sesión.');
                }
            } else {
                if (username === 'user') {
                    setError('El nombre de usuario user ya está registrado.');
                } else {
                    const newUser = { username, password, role: 'user' };
                    localStorage.setItem('user', JSON.stringify(newUser));
                    setIsLogin(true); // Cambiamos a la vista de login
                    setError('');
                    alert('Registro de Usuario exitoso. Ahora puedes iniciar sesión.');
                }
            }
        }
    };

    // Manejo de Logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h2>Bienvenido, {JSON.parse(localStorage.getItem('user')).username}!</h2>
                    <p>Rol: {JSON.parse(localStorage.getItem('user')).role}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <div>
                    <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="user"
                                checked={userType === 'user'}
                                onChange={() => setUserType('user')}
                            />
                            Usuario
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="admin"
                                checked={userType === 'admin'}
                                onChange={() => setUserType('admin')}
                            />
                            Administrador
                        </label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</button>
                    </form>
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
