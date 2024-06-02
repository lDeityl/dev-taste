import { DeleteRequest, ICategory, ICrateCategory, IEmailConfirm, ILoginForm, IProduct, IRegisterForm, ISignRes, IUpdateUserProfile, IUpsertCategory, IUsers } from '../interfaces';
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

export const UpdateProfileReq = async (data: IUpdateUserProfile): Promise<IUsers> => {
    let response = await api.post(`/profile/update-date`, data);
    return response.data;
}

export const createProducts = async (data: IProduct): Promise<boolean> => {
    let response = await api.post(`/products/create`, data);
    return response.data;
}

export const getCategories = async (): Promise<ICategory[]> => {
    let response = await api.get(`/categories/get`);
    return response.data;
}

export const createCategories = async (data: IUpsertCategory): Promise<boolean> => {
    let response = await api.post(`/categories/create`, data);
    return response.data;
}
export const deleteCategories = async (data: DeleteRequest): Promise<boolean> => {
    let response = await api.post(`/categories/delete`, data);
    return response.data;
}