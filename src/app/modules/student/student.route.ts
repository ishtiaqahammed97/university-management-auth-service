import express from 'express'
import { StudentController } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { StudentValidation } from './student.validation'

const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)

router.get('/', StudentController.getAllStudent)

router.delete('/:id', StudentController.deleteStudent)

router.patch(
  '/create-student',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
)

export const StudentRoutes = router
