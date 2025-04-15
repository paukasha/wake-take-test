import { promises as fs } from 'fs'
import { resolve } from 'path'
import { defineEventHandler } from 'h3'

const usersPath = resolve(process.cwd(), 'server', 'users.json')

export default defineEventHandler(async () => {
    const data = await fs.readFile(usersPath, 'utf8')
    const usersData: any[] = JSON.parse(data)

    const result = usersData.map(user => ({
        name: user.name,
        surname: user.surname,
        age: user.age || null
    }))

    return result
})
