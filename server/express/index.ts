

import express, { Request, Response, Express } from 'express'

const app: Express = express()
app.use(express.json())

interface LoginQuery {
    name?: string
}

// app.get('/api/login', (req: Request<{}, {}, {}, LoginQuery>, res: Response) => {
//     res.json({
//         message: 'Работает GET!',
//         query: req.query,
//     })
// })

interface LoginBody {
    username: string
    password: string
}


export default app as Express // ✅ Явно указали тип default-экспорта

