import axios from "axios";
import type {IUser} from "../model/types/user";

export const userApi = {
    async getAll() {
        return await axios.get<IUser[]>('/api/users')
    },
    async logout(userId: number) {
        return await axios.post('/api/logout', {id: userId})
    }
}
