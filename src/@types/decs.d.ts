import React from 'react'
declare module 'layouts/*'
declare module 'assets/*'
declare module 'components/*'
declare module 'routes'
declare module 'chart.js'

export declare type Attendance = {
  id: string
  name: string
  email: string
  dept: string
  datetime: string
}

export declare type Employee = {
  id: string
  name: string
  email: string
  phone: string
  dept: string
}

export declare type UserContextType = {
  emps: Employee[]
  setEmps: React.Dispatch<React.SetStateAction<Employee[]>>
  att: Attendance[]
  setAtt: React.Dispatch<React.SetStateAction<Attendance[]>>
}
