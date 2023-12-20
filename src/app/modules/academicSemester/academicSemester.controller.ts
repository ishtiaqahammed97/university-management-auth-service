import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData,
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is Created Successfully',
      data: result,
    })

    next()
  },
)

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortby: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }

    const filters = pick(req.query, ['searchTerm'])
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AcademicSemesterService.getAllSemester(
      filters,
      paginationOptions,
    )

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      meta: result.meta,
      data: result.data,
    })

    next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
}
