import { DeleteRequest, IAddress, ICategory, ICrateCategory, IEmailConfirm, ILoginForm, IProduct, IProductCatalog, IProductType, IRegisterForm, ISettings, ISignRes, IUpdateProfileInfo, IUpdateUserProfile, IUpsertCategory, IUsers } from '../interfaces';
import { api } from '../services/api';

export const signUp = async (data: IRegisterForm): Promise<ISignRes> => {
    let response = await api.post('auth/signup', data);
    return response.data;
}

export const signIn = async (data: ILoginForm): Promise<ISignRes> => {
    let response = await api.post('auth/login', data);
    return response.data;
}

export const confirmEmail = async (data: IEmailConfirm): Promise<ISignRes> => {
    let response = await api.post('/auth/confirm-email', data);
    return response.data;
}

export const sendEmail = async (): Promise<boolean> => {
    let response = await api.post('/auth/send-confirmation');
    return response.data;
}

export const getUsers = async (): Promise<IUsers[]> => {
    let response = await api.get(`/users/all-users`);
    return response.data;
}

export const getUserById = async (): Promise<IUsers> => {
    let response = await api.get(`/users/get-user-by-id`);
    return response.data;
}

export const getAdminById = async (): Promise<IUsers> => {
    let response = await api.get(`/admin/get-admin-by-id`);
    return response.data;
}

export const UpdateProfileReq = async (data: IUpdateProfileInfo): Promise<IUsers> => {
    let response = await api.post(`/profile/update-date`, data);
    return response.data;
}

export const UpdateProfileAddress = async (data: IUpsertCategory): Promise<IAddress> => {
    let response = await api.post(`/profile/update-address`, data);
    return response.data;
}

export const getProfileAddress = async (userId: number): Promise<IAddress> => {
    let response = await api.get(`/profile/get-address?userId=${userId}`);
    return response.data;
}

export const UpdateProfileReqImage = async (data: IUpsertCategory): Promise<IUsers> => {
    let response = await api.post(`/profile/update-image`, data);
    return response.data;
}

export const createProducts = async (data: IUpsertCategory): Promise<boolean> => {
    let response = await api.post(`/products/create`, data);
    return response.data;
}

export const getCategories = async (): Promise<ICategory[]> => {
    let response = await api.get(`/categories/get`);
    return response.data;
}

export const getUsersAdmin = async (): Promise<IUsers[]> => {
    let response = await api.get(`/admin/get-users`);
    return response.data;
}

export const createCategories = async (data: IUpsertCategory): Promise<boolean> => {
    let response = await api.post(`/categories/create`, data);
    return response.data;
}

export const getCategoriesMenu = async (): Promise<IProductType[]> => {
    let response = await api.get(`/product-type/get`);
    return response.data;
}

export const createCategoriesMenu = async (data: IUpsertCategory): Promise<boolean> => {
    let response = await api.post(`/product-type/upsert`, data);
    return response.data;
}

export const deleteCategoriesMenu = async (data: DeleteRequest): Promise<boolean> => {
    let response = await api.post(`/product-type/delete`, data);
    return response.data;
}

export const deleteCategories = async (data: DeleteRequest): Promise<boolean> => {
    let response = await api.post(`/categories/delete`, data);
    return response.data;
}

export const getCatalog = async (pageParam = 1, limit: number, search: string, categoryId?: number, productTypeId?: number, sort?: 'increase' | 'descrease'): Promise<IProductCatalog> => {
    const response = await api.get(`/catalog/get`, {
        params: { pageParam, limit, search, categoryId, productTypeId, sort, },
    });
    return response.data;
};

export const getProduct = async (): Promise<IProduct[]> => {
    let response = await api.get(`/products/get`);
    return response.data;
}

export const getProductFive = async (): Promise<IProduct[]> => {
    let response = await api.get(`/products/get-five`);
    return response.data;
}

export const getCategoryId = async (): Promise<ICategory[]> => {
    const response = await api.get('/users/get-categories');
    return response.data;
};
export const deleteProducts = async (data: DeleteRequest): Promise<boolean> => {
    let response = await api.post(`/products/delete`, data);
    return response.data;
}

export const getUserProduct = async (id: number): Promise<IProduct> => {
    let response = await api.get(`/users/get-product?productId=${id}`);
    return response.data;
}

export const getUserCategories = async (): Promise<ICategory[]> => {
    let response = await api.get(`/users/get-categories`);
    return response.data;
}

export const getCategoryForCart = async (categoryId: number): Promise<ICategory> => {
    let response = await api.get(`/users/get-category-cart?categoryId=${categoryId}`);
    return response.data;
}

export const getProductForCart = async (productId: number): Promise<IProduct> => {
    let response = await api.get(`/users/get-product-cart?productId=${productId}`);
    return response.data;
}

export const getSettingsAdmin = async (): Promise<ISettings> => {
    let response = await api.get(`/settings/get`);
    return response.data;
}

export const updateSettingsAdmin = async (data: IUpsertCategory): Promise<boolean> => {
    let response = await api.post(`/settings/update-settings`, data);
    return response.data;
}
