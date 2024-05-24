import { IRegisterForm, Users } from '../interfaces';
import { api } from '../services/api';

export const signUp = async (data: IRegisterForm): Promise<Boolean> => {
    let response = await api.post('auth/signup', data);
    return response.data;
}

export const getUsers = async (): Promise<Users[]> => {
    let response = await api.get(`/users/all-users`);
    return response.data;
}