import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.services'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyServices.createFaculty(
    academicFacultyData,
  )

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is Created Successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
}
