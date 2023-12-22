import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../Helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { academicDepartmentSearchableField } from './academicDepartment.constant'
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterableFields,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  )

  return result
}

const getAllDepartment = async (
  filters: IAcademicDepartmentFilterableFields,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  // dynamic searching
  const { searchTerm, ...filtersData } = filters

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableField.map(field => ({
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

  // sortBy & sortOrder
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // where condition
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  // query
  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await AcademicDepartment.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
}
