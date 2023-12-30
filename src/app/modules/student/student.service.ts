import { IPaginationOptions } from './../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../Helpers/paginationHelpers'
import { SortOrder } from 'mongoose'
import { IStudent, IStudentFilters } from './student.interface'
import { studentSearchableFields } from './student.constant'
import { Student } from './student.model'

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  // dynamic searching
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // filter -> exact matching
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  // sortBy & sortOrder
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // where condition
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  // query
  const result = await Student.find(whereCondition)
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)

  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)

  return result
}

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
