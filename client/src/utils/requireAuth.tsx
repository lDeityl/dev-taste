import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useJwtStore } from '../stores/jwt';

export const RequireAuth = () => {

    const jwt = useJwtStore((state) => state.jwt);
    const isTwoFactorAuthenticated = useJwtStore((state) => state.isTwoFactorAuthenticated);
    const isEmailActivated = useJwtStore((state) => state.isEmailActivated);
    const isTwoFactorAuthenticationEnabled = useJwtStore((state) => state.isTwoFactorAuthenticationEnabled);

    if (isTwoFactorAuthenticationEnabled && !isTwoFactorAuthenticated) {
        return <Navigate to={'/auth/two-factor'} replace />
    }

    if (!jwt || !isEmailActivated) {
        return <Navigate to={'/auth/sign-in'} replace />
    }

    return <Outlet />;
}

export const useIsAuthenticated = () => {
    const jwt = useJwtStore((state) => state.jwt);
    const isTwoFactorAuthenticated = useJwtStore((state) => state.isTwoFactorAuthenticated);
    const isEmailActivated = useJwtStore((state) => state.isEmailActivated);
    const isTwoFactorAuthenticationEnabled = useJwtStore((state) => state.isTwoFactorAuthenticationEnabled);

    // Check if JWT exists and email is activated
    const hasBasicAuth = jwt && isEmailActivated;

    // If two-factor authentication is enabled, also check if the user is two-factor authenticated
    const hasTwoFactorAuth = !isTwoFactorAuthenticationEnabled || (isTwoFactorAuthenticationEnabled && isTwoFactorAuthenticated);

    // Return true only if all conditions are satisfied
    return hasBasicAuth && hasTwoFactorAuth;
}