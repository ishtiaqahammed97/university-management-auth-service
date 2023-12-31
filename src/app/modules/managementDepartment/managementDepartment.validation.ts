import { z } from 'zod'

const createManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Department title is required' }),
  }),
})

const updateManagementDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Department title is required' }),
  }),
})

export const ManagementDepartmentValidation = {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
}
