import { UserService } from "services/user.service"

export const actionRegisterUser = async (dataReq) => {

    const response = await UserService.RegisterUser(dataReq)
    return response
}

