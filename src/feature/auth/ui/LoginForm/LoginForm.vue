<template>
  <UCard class="login-form">
    <template #header>
      <h2 class="">Вход в систему</h2>
    </template>

    <UForm class="login-form__content"
           :state="authData">
      <UFormField
          label="Имя пользователя"
          name="username">
        <UInput
            class="login-form__input"
            v-model.trim="authData.username"
            placeholder="Введите имя пользователя" />
      </UFormField>

      <UFormField
          label="Пароль"
          name="password">
        <UInput
            class="login-form__input"
            v-model.trim="authData.password"
            type="password"
            placeholder="Введите пароль"
        />
        <p
            v-if="error"
            class="login-form__error">
          {{ error }}
        </p>
      </UFormField>

      <UButton
          @click="login"
          color="primary"
          block :loading="isLoading">
        Войти
      </UButton>
    </UForm>
  </UCard>
</template>


<script setup lang="ts">
import {useAuth} from "../../model/useAuth";
const {login, isLoading, error, authData} = useAuth()
</script>

<style scoped lang="scss">
.login-form {
  max-width: 600px;
  margin: 40px auto 0;

  &__input {
    width: 100%;
  }

  &__error {
    margin-top: 20px;
    display: inline-block;
    color: red;
  }
}

.login-form__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

