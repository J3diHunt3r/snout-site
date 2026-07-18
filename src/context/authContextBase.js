import { createContext } from 'react';

export const AuthContext = createContext({
    user: null,
    userDoc: null,
    loading: true,
    isAdmin: false,
});
