export function getRetirementDate(employee) {
  // algorithm
  // 1. find difference between employee age and retirement age (65)
  // 2. add that difference to "date of joining" year of that employee that helps to find the retirement date of that employee

  const retirementAge = 65
  const employeeDateOfJoining = new Date(employee.dateOfJoining)
  const yearsLeftToRetire = retirementAge - employee.age
  const retirementDate = new Date(
    employeeDateOfJoining.getFullYear() + yearsLeftToRetire,
    employeeDateOfJoining.getMonth(),
    employeeDateOfJoining.getDate() - 1
  )

  return retirementDate
}
