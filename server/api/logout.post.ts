import { promises as fs } from 'fs'
import { resolve } from 'path'
import { defineEventHandler, readBody, createError } from 'h3'

// Абсолютный путь к файлу users.json, который лежит в папке server
const usersPath = resolve(process.cwd(), 'server', 'users.json')

export default defineEventHandler(async (event) => {
    // Читаем тело запроса, ожидаем объект { id: number }
    const body = await readBody(event) as { id?: number }
    const id = body.id

    if (id === undefined) {
        throw createError({
            statusCode: 400,
            message: 'Необходимо указать id пользователя'
        })
    }

    // Читаем текущие данные из файла
    const data = await fs.readFile(usersPath, 'utf8')
    const usersData: any[] = JSON.parse(data)

    // Проверяем, что пользователь с таким id существует
    if (id < 0 || id >= usersData.length) {
        throw createError({
            statusCode: 404,
            message: 'Пользователь не найден'
        })
    }

    // Устанавливаем для пользователя active в false
    usersData[id].active = false

    // Записываем обновленные данные обратно в файл
    await fs.writeFile(usersPath, JSON.stringify(usersData, null, 2), 'utf8')

    // Возвращаем ответ
    return { message: 'Пользователь успешно вышел из системы' }
})
