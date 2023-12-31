import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IManagementDepartment } from './managementDepartment.interface'
import httpStatus from 'http-status'
import { ManagementDepartmentService } from './managementDepartment.service'
import { paginationFields } from '../../../constants/pagination'
import pick from '../../../shared/pick'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body
    const result = await ManagementDepartmentService.createManagementDepartment(
      departmentData,
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully',
      data: result,
    })
  },
)

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions,
      )

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
}
