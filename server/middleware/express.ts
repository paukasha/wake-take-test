import { fromNodeMiddleware } from 'h3'
import expressApp from '../express'

export default fromNodeMiddleware(expressApp, { path: '/api' })
