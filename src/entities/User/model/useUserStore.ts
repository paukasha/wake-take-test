import type {IUser} from "./types/user";
import {userApi} from "~/src/entities/User/api/userApi";
import {defineStore} from "pinia";
import {LOCALE_STORAGE_USER_KEY} from "~/src/shared/const/localStorage";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore('userStore', () => {
    const users = ref<IUser[]>([])
    const isLoading = ref(false)
    const error = ref('')

    const router = useRouter()

    const isUserAuth = computed(() => !!localStorage.getItem(LOCALE_STORAGE_USER_KEY))

    const getUsers = async () => {
        isLoading.value = true
        try {
            const userResponse = await userApi.getAll();
            users.value = userResponse.data;
        } catch (err: any) {
            error.value = err.response.data.message || 'Произошла ошибка. Попробуйте позже.'
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {

        isLoading.value = true
        const user = JSON.parse(localStorage.getItem(LOCALE_STORAGE_USER_KEY)!)
        try {
            await userApi.logout(user.id)
            localStorage.removeItem(LOCALE_STORAGE_USER_KEY)
            await router.push('/login')
        } catch (err) {
            console.error(err);
        }  finally {
            isLoading.value = false
        }
    }

    return {
        users,
        isLoading,
        getUsers,
        isUserAuth,
        logout
    }
})
