import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useJwtStore } from '../stores/jwt';
import { useIsAuthenticated } from './requireAuth';

export const RequireRole = () => {

    const role = useJwtStore((state) => state.role);
    const isAuthed = useIsAuthenticated();
    console.log(role, 'role');

    if (role !== "ADMIN") {
        return <Navigate to={'/'} replace />
    }

    return <Outlet />;
}
