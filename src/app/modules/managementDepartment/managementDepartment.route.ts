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

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)

router.get('/', ManagementDepartmentController.getAllManagementDepartments)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartment,
)

router.delete('/:id', ManagementDepartmentController.deleteManagementDepartment)

export const ManagementDepartmentRoutes = router
