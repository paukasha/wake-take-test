<template>
  <div class="container profile">

    <div v-if="!isUserAuth">
      <RouterLink to="/login" >Доступ запрещен. Нажмите, чтобы перейти к аутентификации.</RouterLink>
    </div>

    <div v-else>
      <UButton
          class="logout-btn"
          color="primary"
          block
          @click="logout">
        Выйти
      </UButton>

      <UserList  />

    </div>
  </div>
</template>

<script setup lang="ts">
import {UserList, useUserStore} from "~/src/entities/User";
import {LOCALE_STORAGE_USER_KEY} from "~/src/shared/const/localStorage";
import {storeToRefs} from "pinia";
import {userApi} from "~/src/entities/User/api/userApi";


const router = useRouter()

const {isUserAuth, } = storeToRefs(useUserStore())

const {logout} = useUserStore()



</script>

<style scoped lang="scss">

.profile {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
}


.logout-btn {
  margin-left: auto;
  max-width: fit-content;
}
</style>


