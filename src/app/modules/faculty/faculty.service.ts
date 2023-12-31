import { facultySearchableFields } from './faculty.constant'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { paginationHelpers } from '../../../Helpers/paginationHelpers'
import { Faculty } from './faculty.model'
import { SortOrder } from 'mongoose'

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFaculty[]>> => {
  // dynamic searching
  const { searchTerm, ...filtersData } = filters

  // console.log(filtersData)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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
  const result = await Faculty.find(whereCondition)
    .sort()
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)

  return result
}

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
}
