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

// Api error -> Error handler

// Testing purpose
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'This is error')
//   next('Oh my God! This is bug')
// })

// global error handler
app.use(globalErrorHandler)

export default app
