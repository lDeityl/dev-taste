export interface IRegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface ISignRes {
    email: string
    isTwoFactorAuthenticationEnabled: boolean
    isEmailActivated: boolean
    access_token: string
    role: string
}

export interface ILoginForm {
    email: string
    password: string
}

export interface IEmailConfirm {
    code: string
}

export interface IUsers {
    id: number;
    createdAt: string;
    email: string;
    name: string;
    role: keyof typeof Roles;
    isEmailActivated: boolean;
    password: string;
    phone?: string;
    imgURL?: string;
    code_change_password?: string;
    code_confirmation_email?: string;
    twoFactorAuthenticationSecret?: string;
    isTwoFactorAuthenticationEnabled?: boolean;
}

export interface IProduct {
    id: number
    createdAt: string
    imageUrl: string
    name: string
    description: string
    price: number
    squirrels: number
    fats: number
    carbohydrates: number
    calories: number
    weight: number
    category: ICategory
    categoryId: number
    isActive: boolean
    isFavourite?: boolean
}

export interface ICategory {
    id: number
    createdAt: string
    name: string
    product: IProduct[]
    isActive: boolean
}

export interface ICrateCategory {
    name: string
    isActive: boolean
}

export interface IUpsertCategory {
    [key: string]: any
}

export interface DeleteRequest {
    id: number
}

export interface IUpdateUserProfile {
    name: string;
    email: string;
    phone?: string | null;
    imgUrl?: string | null;
}

enum Roles {
    ADMIN,
    USER
}