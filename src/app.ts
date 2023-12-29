import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
// const port = 3000
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/', routes)

// app.use('/api/v1/users/', UserRoutes)
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes)

// Testing purpose
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not Found',
      },
    ],
  })
  next()
})

// // test studentId & faculty id
// const academicSemester: IAcademicSemester = {
//   year: '2025',
//   code: '01',
// }

// const testId = async () => {
//   const testId = await generateFacultyId()

//   console.log(testId)
// }

// testId()

// global error handler
app.use(globalErrorHandler)

export default app
