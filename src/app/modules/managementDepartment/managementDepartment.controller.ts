import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IManagementDepartment } from './managementDepartment.interface'
import httpStatus from 'http-status'
import { ManagementDepartmentService } from './managementDepartment.service'

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

export const ManagementDepartmentController = {
  createManagementDepartment,
}
