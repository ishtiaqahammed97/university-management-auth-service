import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // req-validation
    // body --> object
    // data --> object
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'Role is required',
        }),
        password: z.string().optional(),
      }),
    })

    await createUserZodSchema.parseAsync(req)

    const { users } = req.body
    const result = await UserService.createUser(users)
    res.status(200).json({
      success: true,
      message: 'User created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
}
