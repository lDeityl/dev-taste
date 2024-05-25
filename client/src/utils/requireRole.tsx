import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useJwtStore } from '../stores/jwt';

export const RequireRole = () => {
    const role = useJwtStore((state) => state.role);

    if (role === "USER" || !role) {
        return <Navigate to={'/'} replace />
    }

    return <Outlet />;
}
