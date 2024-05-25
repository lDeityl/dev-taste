import { api } from "./api";
import { toast } from "react-toastify";
import { use2FAAuthenticationStore, useJwtStore, usePopupStore } from "../stores/jwt";

const deleteTokensErrors = ['Your role has been changed', 'Unknown error'];

export const AxiosJWT = () => {
    const { clearAll, jwt } = useJwtStore((state) => state);
    const { showPopup } = usePopupStore((state) => state);
    const { setisPopupVisible } = use2FAAuthenticationStore((state) => state)
    api.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
    api.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response?.data?.message === 'You need set a 2FA' && !error.__handled) {
            error.__handled = true;
            showPopup(true)
        } else if (error.response?.data?.message === 'You need to authenticate 2FA' && !error.__handled) {
            error.__handled = true;
            setisPopupVisible(true)
        } else if (error.response?.data?.message === 'Forbidden resource' && !error.__handled) {
            error.__handled = true;
            toast.warning('У вас нет прав для выполнения этого действия', {
                toastId: 'Forbidden resource'
            })
        }
        if (deleteTokensErrors.includes(error.response?.data?.message) && !error.__handled) {
            error.__handled = true;
            clearAll(null);
        }

        if (
            error.response?.status === 401
            && !error.__handled
        ) {
            error.__handled = true;
            clearAll(null);
        }
        return Promise.reject(error);
    });
    return <></>
}