import { Model, Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IAcademicDepartment = {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export type IAcademicDepartmentFilterableFields = {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}
