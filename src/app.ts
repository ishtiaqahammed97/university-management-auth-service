import express, { Application } from 'express'
const app: Application = express()
// const port = 3000
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoutes)

// Testing purpose
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

// global error handler
app.use(globalErrorHandler)

export default app
