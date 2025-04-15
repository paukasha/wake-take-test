import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import crypto from 'crypto'
import { defineEventHandler, readBody, createError } from 'h3'


const error = 'Введены неверные данные авторизации. Попробуйте ещё раз'

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event) as { username?: string; password?: string }

    if (!username || !password) {
        throw createError({
            statusCode: 400,
            message: error
        })
    }

    // Используем process.cwd() чтобы получить корневую директорию проекта
    const usersPath = resolve(process.cwd(), 'server', 'users.json')
    let usersData: any[] = JSON.parse(readFileSync(usersPath, 'utf8'))

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const userIndex = usersData.findIndex(u =>
        u.credentials.username === username && u.credentials.passphrase === hash
    )

    if (userIndex === -1) {
        throw createError({
            statusCode: 401,
            message: error
        })
    }

    let user = usersData[userIndex]

    if (!user.active) {
        user.active = true
        usersData[userIndex] = user
        writeFileSync(usersPath, JSON.stringify(usersData, null, 2), 'utf8')
    }

    return {
        id: userIndex,
        active: user.active,
    }
})
