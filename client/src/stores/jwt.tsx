import { create } from 'zustand'
import { persist } from "zustand/middleware"


export const useJwtStore = create(
    persist(
        (set: (partial: any, replace?: boolean | undefined) => void, get) => ({
            jwt: null,
            setJwt: (jwt: string) => set({ jwt }),
            role: null,
            setRole: (role: string) => set({ role }),
            isTwoFactorAuthenticationEnabled: null,
            setTwoFactorAuthenticationEnabled: (isTwoFactorAuthenticationEnabled: string) => set({ isTwoFactorAuthenticationEnabled }),
            // isEmailActivated: null,
            // isTwoFactorAuthenticated: null,
            // setEmailActivated: (isEmailActivated: string) => set({ isEmailActivated }),
            // setTwoFactorAuthenticated: (isTwoFactorAuthenticated: string) => set({ isTwoFactorAuthenticated }),
            clearAll: () => set({ role: null, isTwoFactorAuthenticated: null, isEmailActivated: null, isTwoFactorAuthenticationEnabled: null, jwt: null }),
        }),
        {
            name: 'container', // unique name
        }
    )
)

interface PopupStoreState {
    isPopupVisible: boolean;
    showPopup: (visible: boolean) => void;
}

export const usePopupStore = create<PopupStoreState>((set) => ({
    isPopupVisible: false,
    showPopup: (visible) => set({ isPopupVisible: visible }),
}));


interface authentication2FAStoreProps {
    isPopupVisible: boolean;
    setisPopupVisible: (visible: boolean) => void;
}

export const use2FAAuthenticationStore = create<authentication2FAStoreProps>((set) => ({
    isPopupVisible: false,
    setisPopupVisible: (visible) => set({ isPopupVisible: visible }),
}));