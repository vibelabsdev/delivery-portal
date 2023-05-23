import axiosClient from './axiosClient';

export const UserService = {

    RegisterUser: (dataReq) => {
        return axiosClient.post('/delivery-service/user/register', dataReq)
    },
}
