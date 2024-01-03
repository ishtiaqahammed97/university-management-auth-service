import express from 'express'
import { AdminController } from './admin.controller'

const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.get('/', AdminController.getAllAdmins)

router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoutes = router
