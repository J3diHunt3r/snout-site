import { useContext } from 'react';
import { AuthContext } from '../context/authContextBase';

export default function useAuth() {
    return useContext(AuthContext);
}
