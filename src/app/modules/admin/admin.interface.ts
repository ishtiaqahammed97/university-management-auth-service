import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type IAdmin = {
  id: string
  name: UserName
  gender?: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress?: string
  permanentAddress?: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  profileImage?: string

  managementDepartment: Types.ObjectId | IManagementDepartment
  designation: string
}

export type IAdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  managementDepartment?: string
  designation?: string
}
