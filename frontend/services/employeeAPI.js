import { apiEndpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import { toast } from "react-hot-toast";

const { GET_EMPLOYEES, 
        GET_INDIVIDUAL_EMPLOYEE_DETAILS, 
        CREATE_EMPLOYEE, 
        EDIT_EMPLOYEE, 
        DELETE_EMPLOYEE } = apiEndpoints;

export async function createEmployee(data){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("POST", CREATE_EMPLOYEE, data);

        console.log("RESPONSE OF CREATE EMP: ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data;
    } catch(error){
        console.log("Error: ", error);
        toast.error("Something went wrong...")
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteEmployee(empId){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("DELETE", `${DELETE_EMPLOYEE}/${empId}`);

        console.log("RESPONSE OF DELETE EMP: ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data;
    } catch(error){
        console.log("ERROR: ", error);
        toast.error("Something went wrong...")
    }
    toast.dismiss(toastId);
    return result;
}

export async function getEmployeeDetails(){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", GET_EMPLOYEES);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data;
        toast.success("Employee Details Fetched");
    } catch(error){
        console.log("ERROR:", error);
        toast.error("Something went wrong...")
    }
    toast.dismiss(toastId);
    return result;
}

export async function getIndividualEmployeeDetails(empId){
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET", `${GET_INDIVIDUAL_EMPLOYEE_DETAILS}/${empId}`);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data;
        toast.success("Employee Details");
    } catch(error){
        console.log("ERROR:", error);
        toast.error("Something went wrong...")
    }
    toast.dismiss(toastId);
    return result;
}

export async function editEmployee(empId, data){
    const toastId = toast.loading("Updating employee...");
    let result = [];
    try{
        const response = await apiConnector("PUT", `${EDIT_EMPLOYEE}/${empId}`, data);

        console.log("RESPONSE OF EDIT EMP: ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data;
        toast.success("Employee updated successfully!");
    } catch(error){
        console.log("Error: ", error);
        toast.error("Failed to update employee...")
    }
    toast.dismiss(toastId);
    return result;
}

