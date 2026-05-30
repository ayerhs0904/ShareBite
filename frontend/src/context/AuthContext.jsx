import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // In a real app we might fetch user details from backend or trust token payload
                const role = localStorage.getItem('role');
                const id = localStorage.getItem('userId');
                setUser({ email: decoded.sub, role, id });
            } catch (error) {
                console.error("Invalid token");
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const login = (token, id, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('role', role);
        const decoded = jwtDecode(token);
        setUser({ email: decoded.sub, role, id });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
