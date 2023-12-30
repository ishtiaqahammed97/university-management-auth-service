import express from 'express'
import { StudentController } from './student.controller'

const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)

router.get('/', StudentController.getAllStudent)

router.delete('/:id', StudentController.deleteStudent)

export const StudentRoutes = router
