import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { IAcademicFaculty } from './academicFaculty.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyService } from './academicFaculty.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)

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

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.getSingleFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicFacultyService.updateFaculty(id, updatedData)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicFacultyService.deleteFaculty(id)

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
