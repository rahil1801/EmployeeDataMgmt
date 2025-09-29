const Employee = require("../models/Employee");

//controller to get all employees
exports.getEmployeeDetails = async (req, res) => {
    try{
        const employeeDetails = await Employee.find({});

        if(employeeDetails.length == 0){
            return res.status(200).json({
                success:true,
                message:"No Employees Found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"Employees details returned successfully",
            data:employeeDetails
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

//controller to create an employee
exports.createEmployee = async (req, res) => {
    try{
        const { name, email, position, dateOfJoining } = req.body;

        //validation

        if(!name || !email || !position || !dateOfJoining){
            return res.status(400).json({
                success:false,
                message:"Missing Fields"
            })
        }

        //convert date string to date object
        const dateObj = new Date(dateOfJoining);

        //save the data to DB
        const savedDetails = await Employee.create({
            name: name,
            email: email,
            position: position,
            dateOfJoining: dateObj
        });

        return res.status(200).json({
            success:true,
            message:"Employee created successfully",
            savedDetails
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}

//controller to edit an employee details
exports.editEmployee = async (req, res) => {
    try{
        const empId = req.params.id;

        const editedEmpData = req.body;

        const empData = await Employee.findById(empId);

        if(empData !== -1){
            Employee[empData] = { ...Employee[empData], ...editedEmpData };
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:"Internal Server Error"
        })
    }
}


//controller to delete an employee
exports.deleteEmployee = async (req, res) => {
    try{
        const empId = req.params.id;

        if(!empId){
            return res.status(404).json({
                success:false,
                message:"No Employee Found"
            })
        }

        await Employee.findByIdAndDelete(empId);

        return res.status(200).json({
            success:true,
            message:"Employee Deleted Successfully"
        })
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}