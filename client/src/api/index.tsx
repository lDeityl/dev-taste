import { IEmailConfirm, ILoginForm, IRegisterForm, ISignRes, IUsers } from '../interfaces';
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