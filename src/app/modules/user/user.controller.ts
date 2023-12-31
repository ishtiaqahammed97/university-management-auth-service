import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  // req.body
  // {
  //   password: ,
  //   student / faculty / admin
  // }
  const { student, ...usersData } = req.body
  const result = await UserService.createStudent(student, usersData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await UserService.createFaculty(faculty, userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Created Successfully',
    data: result,
  })
})

export const UserController = {
  createStudent,
  createFaculty,
}
