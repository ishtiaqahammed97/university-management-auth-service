import { string, z } from 'zod'

const createFacultyZodSchema = z.object({
  body: z.object({
    title: string({
      required_error: 'Title is required',
    }),
  }),
})

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
})

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updateAcademicFacultyZodSchema,
}
