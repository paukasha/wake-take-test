import {useRouter} from "vue-router";
import {authApi} from "../api/authApi";
import {LOCALE_STORAGE_USER_KEY} from "~/src/shared/const/localStorage";
import { ref } from "vue";

interface IAuthData {
    password: string
    username: string
}


export const useAuth = () => {

    const router = useRouter()
    const isLoading = ref(false)
    const error = ref('')

    const authData: IAuthData = {
        password: '',
        username: ''
    }

    const login = async () => {
        isLoading.value = true
        error.value = ''

        try {
            const authResponse = await authApi.login(authData)

            localStorage.setItem(LOCALE_STORAGE_USER_KEY, JSON.stringify(authResponse.data))

            await router.push('/profile')
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Неизвестная ошибка';

        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        error,
        authData,
        login,
    }
}
