import { IRegisterForm } from '../interfaces';
import { api } from '../services/api';

export const signUp = async (data: IRegisterForm): Promise<Boolean> => {
    let response = await api.post('auth/signup', data);
    return response.data;
}