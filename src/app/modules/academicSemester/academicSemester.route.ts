import express from 'express'
// import { UserController } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)

router.get('/', AcademicSemesterController.getAllSemester)
export const AcademicSemesterRoutes = router
