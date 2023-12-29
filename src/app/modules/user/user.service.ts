import { IStudent } from './../student/student.interface'
// database logic / business logic
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
// import { generateFacultyId } from './user.utils'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // const id = await generateFacultyId()

  // user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  // set role
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  // generate student ID
  let newUserAllData = null

  // start session
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateStudentId(academicSemester)

    // insert generated student id to user
    user.id = id
    student.id = id

    // array
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    // set student _id to user.student
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newUserAllData = newUser[0]

    // commit transaction and end transaction
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    // abort transaction
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  // // user --> student --> academicSemester, academicDepartment, academicFaculty

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
}
