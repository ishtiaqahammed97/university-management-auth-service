import { SortOrder } from 'mongoose'

type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type IOptionsResult = {
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
  skip: number
}
const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page)
  const limit = Number(options.limit)

  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip,
  }
}

export const paginationHelpers = {
  calculatePagination,
}
