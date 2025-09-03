import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(localStorage.getItem('token'));

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			// You can add token validation here
		}
		setLoading(false);
	}, [token]);

	const login = async (email, password) => {
		try {
			const response = await axios.post('/api/auth/login', {
				email,
				password,
			});
			const { token: newToken, user: userData } = response.data;

			localStorage.setItem('token', newToken);
			setToken(newToken);
			setUser(userData);
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${newToken}`;

			return { success: true };
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || 'Login failed',
			};
		}
	};

	const register = async (name, email, password) => {
		try {
			const response = await axios.post('/api/auth/register', {
				name,
				email,
				password,
			});
			const { token: newToken, user: userData } = response.data;

			localStorage.setItem('token', newToken);
			setToken(newToken);
			setUser(userData);
			axios.defaults.headers.common[
				'Authorization'
			] = `Bearer ${newToken}`;

			return { success: true };
		} catch (error) {
			return {
				success: false,
				message: error.response?.data?.message || 'Registration failed',
			};
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
		delete axios.defaults.headers.common['Authorization'];
	};

	const value = {
		user,
		token,
		login,
		register,
		logout,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
