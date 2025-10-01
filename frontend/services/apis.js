const BASE_URL = import.meta.env?.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL : "http://localhost:4000/api/v1";

export const apiEndpoints = {
    GET_EMPLOYEES : BASE_URL + "/employee/employeeDetails",
    GET_INDIVIDUAL_EMPLOYEE_DETAILS: BASE_URL + "/employee/employeeDetails",
    CREATE_EMPLOYEE : BASE_URL + "/employee/createEmployee",
    EDIT_EMPLOYEE : BASE_URL + "/employee/editEmployee",
    DELETE_EMPLOYEE : BASE_URL + "/employee/deleteEmployee"
}