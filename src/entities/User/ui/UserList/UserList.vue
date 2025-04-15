<template>
  <div class="users-table-container">
    <div class="toolbar" v-if="!isLoading">
      <USelectMenu
          v-model="selectedFilterField"
          placeholder="Поиск по"
          :items="filterFieldItems" class="w-48" />

      <UInput
          v-model="search"
          :placeholder="searchPlaceholder"
      />

      <UDropdownMenu :items="columnToggleItems" :content="{ align: 'end' }">
        <UButton
            label="Колонки"
            color="neutral"
            variant="outline"
            aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>

    <UTable
        ref="tableRef"
        :data="filteredUsers"
        :columns="columns"
        sticky
        class="users-table"
        :loading="isLoading"
        loading-color="primary"
        loading-animation="carousel"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import { useUserStore } from '~/src/entities/User/model/useUserStore'
import { storeToRefs } from 'pinia'
import type {IUser} from "../../model/types/user";

interface Field {
  value: keyof IUser
  label: string
}

// Массив доступных полей
const fields: Field[] = [
  { value: 'name', label: 'Имя' },
  { value: 'surname', label: 'Фамилия' },
  { value: 'age', label: 'Возраст' }
]

// Ссылка на компонент таблицы (если компонент поддерживает API для фильтрации/скрытия колонок)
const tableRef = ref<any>(null)

// Мэппинг для отображения русских названий полей
const columnLabels: Record<string, string> = {
  name: 'Имя',
  surname: 'Фамилия',
  age: 'Возраст'
}

const search = ref('')

const selectedFilterField = ref<Field>({value: 'name', label: 'Имя'})

const searchPlaceholder = computed(() => {
  return `Введите ${selectedFilterField.value?.label?.toLowerCase() || ''}`
})

// Получаем данные из стора
const userStore = useUserStore()
const { users, isLoading } = storeToRefs(userStore)

const {getUsers} = userStore

onMounted(async () => {
  await getUsers()
})


// Определяем колонки таблицы
const columns: TableColumn<IUser>[] = [
  {
    accessorKey: 'name',
    header: 'Имя'
  },
  {
    accessorKey: 'surname',
    header: 'Фамилия'
  },
  {
    accessorKey: 'age',
    header: 'Возраст',

  }
]

// Вычисляемый массив для dropdown выбора поля фильтрации.
// Здесь для каждого элемента определяется checked, равное true, если данный элемент соответствует выбранному полю.
const filterFieldItems = computed(() => {
  return fields.map(field => ({
    label: field.label,
    type: 'radio' as const,
    checked: selectedFilterField.value.value === field.value,
  }))
})

// Вычисляемый массив для переключения видимости колонок
const columnToggleItems = computed(() => {
  if (!tableRef.value || !tableRef.value.tableApi) return []
  return tableRef.value.tableApi.getAllColumns()
      .filter((col: any) => col.getCanHide && col.getCanHide())
      .map((col: any) => ({
        label: columnLabels[col.id] || col.id,
        type: 'checkbox' as const,
        checked: col.getIsVisible ? col.getIsVisible() : true,
        onUpdateChecked(checked: boolean) {
          if (col.toggleVisibility) {
            col.toggleVisibility(!!checked)
          }
        }
      }))
})

const filteredUsers = computed(() => {
  let _users = [...users.value]
  const fieldKey = selectedFilterField.value.value as keyof IUser

  if (!search.value.trim()) {
    return _users
  }

  _users = _users.filter(user => {
    const fieldValue = String(user[fieldKey]).toLowerCase()
    return fieldValue.includes(search.value.toLowerCase())
  })

  return _users

})
</script>

<style scoped lang="scss">
.users-table-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-select {
  padding: 5px 10px;
  font-size: 14px;
}

.filter-input {
  max-width: 300px;
}

.users-table {
  height: 400px;
}
</style>
