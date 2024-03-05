// AuthContext.js
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';

const AuthContext = createContext();

const initialState = {
    isAuthenticated: false,
    user: { username: '' },
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [islog, setislog] = useState(false)
    const login = (user) => {
        dispatch({ type: 'LOGIN', payload: user });
        setislog(true)
    };

    const logout = () => {

        dispatch({ type: 'LOGOUT' });
        setislog(false)
    };

    useEffect(() => {
        if (localStorage.getItem('token')) setislog(true)
        else setislog(false)
    }, [islog])

    return (
        <AuthContext.Provider value={{ ...state, login, logout, islog }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider, useAuth };
