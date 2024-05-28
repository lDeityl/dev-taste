import { create } from 'zustand'
import { persist } from "zustand/middleware"
import { IProduct } from '../interfaces'

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


export interface CartItem {
    product: IProduct;
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
    addToCart: (product: IProduct, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void; // Add clearCart to the interface
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            addToCart: (product, quantity) => {
                const currentCartItems = get().cartItems;
                const existingItem = currentCartItems.find(item => item.product.id === product.id);
                if (existingItem) {
                    set({
                        cartItems: currentCartItems.map(item =>
                            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                        ),
                    });
                } else {
                    set({
                        cartItems: [...currentCartItems, { product, quantity }],
                    });
                }
            },
            removeFromCart: productId => {
                set(state => ({
                    cartItems: state.cartItems.filter(item => item.product.id !== productId),
                }));
            },
            updateQuantity: (productId, quantity) => {
                set(state => ({
                    cartItems: state.cartItems.map(item =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },
            clearCart: () => {
                set({ cartItems: [] }); // Set cartItems to an empty array
            }
        }),
        {
            name: 'cart-store', // unique name for the store
        }
    ),
)