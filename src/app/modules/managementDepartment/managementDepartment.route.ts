import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
)

router.get('/', ManagementDepartmentController.getAllManagementDepartments)

export const ManagementDepartmentRoutes = router
