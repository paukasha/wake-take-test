import axios from "axios";
import type {IAuthData} from "../model/types/auth";

export const authApi = {
    login(authData: IAuthData) {
        return axios.post('/api/login', authData)
    }
}
