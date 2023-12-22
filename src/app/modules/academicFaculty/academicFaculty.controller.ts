import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.services'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

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

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicFacultyServices.getAllFaculty(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
}
