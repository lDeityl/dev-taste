import { create } from 'zustand'
import { persist } from "zustand/middleware"

export interface IWallet {
    encryptedKey: string
}

interface IWallets {
    wallets: IWallet[]
}

export const useWalletStore = create(
    persist(
        (set: (partial: any, replace?: boolean | undefined) => void, get) => ({
            wallets: [],

            setWallet: (encryptedKey: string) => set((state: IWallets) => ({
                wallets: [...state.wallets, {
                    encryptedKey
                }]
            })),
        }),
        {
            name: 'wallets',
        }
    )
)