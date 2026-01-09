import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user data from storage on app start
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            const storedUser = await AsyncStorage.getItem('userData');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            // TODO: Replace with actual API call
            // For now, using mock authentication
            const mockUser = {
                id: 1,
                name: 'Admin User',
                email: email,
                role: 'admin',
            };
            const mockToken = 'mock-jwt-token-' + Date.now();

            await AsyncStorage.setItem('userToken', mockToken);
            await AsyncStorage.setItem('userData', JSON.stringify(mockUser));

            setToken(mockToken);
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            // TODO: Replace with actual API call
            const mockUser = {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                role: 'user',
            };
            const mockToken = 'mock-jwt-token-' + Date.now();

            await AsyncStorage.setItem('userToken', mockToken);
            await AsyncStorage.setItem('userData', JSON.stringify(mockUser));

            setToken(mockToken);
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
