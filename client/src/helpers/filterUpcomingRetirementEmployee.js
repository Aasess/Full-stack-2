// this function will filter out the employee records whose retirement is coming in next six month

import { getRetirementDate } from './getRetirementDate'

//   algorithm
// 1. get retirement date of employee using the getRetirementDate() function
// 2. check if the date is less than 6 months or not
// 3. check if status is working (1)
// 4. if both condtion matches then display the employee record as upcoming retirement tab section

export const getUpcomingRetirementEmployees = (employees) => {
  const currentDate = new Date()

  const upcomingRetirementEmployees = employees.filter((employee) => {
    const retirementDate = getRetirementDate(employee)

    const diffTime = Math.abs(retirementDate - currentDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffYears = Math.floor(diffDays / 365)
    const diffMonths = Math.floor((diffDays % 365) / 30)

    if (diffYears === 0 && diffMonths <= 6 && employee.currentStatus === 1) {
      return true
    } else {
      return false
    }
  })

  return upcomingRetirementEmployees
}
