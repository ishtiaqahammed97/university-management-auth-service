import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import httpStatus from 'http-status'
import { AcademicDepartmentService } from './academicDepartment.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData,
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is Created Successfully',
    data: result,
  })
})

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
}
