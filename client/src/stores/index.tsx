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
    userAddress: string | null;
    deliveryWithBags: boolean;
    addToCart: (product: IProduct, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    removeFromCartTo1: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void; // Add clearCart to the interface
    clearAll: () => void; // Add clearCart to the interface
    setUserAddress: (address: string) => void;
    setDeliveryOption: (withBags: boolean) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            userAddress: null,
            deliveryWithBags: false,
            createdOrder: null,
            paymentDetails: {
                cardNumber: null,
                expDate: null,
                cvv: null,
                cardHolderName: null,
            },
            setUserAddress: (address) => {
                set({ userAddress: address });
            },
            setDeliveryOption: (withBags) => {
                set({ deliveryWithBags: withBags });
            },
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
            removeFromCartTo1: (productId) => {
                const currentCartItems = get().cartItems;
                const existingItem = currentCartItems.find(item => item.product.id === productId);
                if (existingItem) {
                    if (existingItem.quantity > 1) {
                        // Если количество больше 1, уменьшаем его на единицу
                        set({
                            cartItems: currentCartItems.map(item =>
                                item.product.id === productId
                                    ? { ...item, quantity: item.quantity - 1 }
                                    : item
                            ),
                        });
                    } else {
                        // Если количество 1, удаляем товар из корзины
                        set({
                            cartItems: currentCartItems.filter(item => item.product.id !== productId),
                        });
                    }
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
                set({
                    cartItems: []
                }); // Set cartItems to an empty array
            },
            clearAll: () => {
                set({
                    cartItems: [],
                    userAddress: null,
                    deliveryWithBags: false,
                });
            }
        }),
        {
            name: 'cart-store', // unique name for the store
        }
    ),
)


export interface FilterState {
    filters: { [key: string]: number[] };
    addItemToFilter: (key: string, item: number) => void;
    removeFilter: (key: string) => void;
    removeItemFromFilter: (key: string, item: number) => void;
    clearFilters: () => void;
    minPrice: number;
    maxPrice: number;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    search: string; // Added field for search term
    setSearch: (searchTerm: string) => void; // Method to update search term
}

export const useFilterStore = create<FilterState>((set, get) => ({
    filters: {},
    minPrice: 0,
    maxPrice: 100000,
    search: "",
    addItemToFilter: (key, item) => {
        set(state => {
            const existingItems = state.filters[key] || [];
            if (!existingItems.includes(item)) {
                return { filters: { ...state.filters, [key]: [...existingItems, item] } };
            }
            return state;
        });
    },
    setSearch: (searchTerm) => {
        set({ search: searchTerm }); // Implementation for updating search term
    },
    removeFilter: (key) => {
        set(state => {
            const newFilters = { ...state.filters };
            delete newFilters[key];
            return { filters: newFilters };
        });
    },
    removeItemFromFilter: (key, item) => {
        set(state => {
            const updatedItems = state.filters[key]?.filter(i => i !== item) || [];
            if (updatedItems.length === 0) {
                const { [key]: _, ...remainingFilters } = state.filters;
                return { filters: remainingFilters };
            } else {
                return { filters: { ...state.filters, [key]: updatedItems } };
            }
        });
    },
    clearFilters: () => {
        set({ filters: {}, minPrice: 0, maxPrice: 100000 });
    },
    setMinPrice: (price) => {
        set({ minPrice: price });
    },
    setMaxPrice: (price) => {
        set({ maxPrice: price });
    },
}));