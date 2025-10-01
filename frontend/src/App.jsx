import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiPresentationFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa";
import { FcDepartment } from "react-icons/fc";
import { IoPerson } from "react-icons/io5";
import { getEmployeeDetails } from "../services/employeeAPI";
import EmployeeTable from "./components/EmployeeTable";

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  const [allEmployees, setAllEmployee] = useState([]);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const result = await getEmployeeDetails();
      setAllEmployee(result);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const navItems = [
    { id: 1, name: "Dashboard", icon: <RxDashboard /> },
    { id: 2, name: "Attendance", icon: <RiPresentationFill /> },
    { id: 3, name: "Award", icon: <FaAward /> },
    { id: 4, name: "Department", icon: <FcDepartment /> },
    { id: 5, name: "Employee", icon: <IoPerson /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-15 p-10">
        <div className="text-lg font-bold">Dynamics HR Management</div>
        <div className="flex gap-8">
          {navItems.map((item) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={item.id}
              onClick={() => setActive(item.name)}
              className={`${
                item.name === active ? "text-blue-400" : "text-gray-300"
              } transition-colors flex flex-col gap-2 justify-center items-center cursor-pointer`}
            >
              {item.icon} {item.name}
            </motion.button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-700 px-3 py-3 rounded-lg"
          >
            <MdOutlineNotificationsActive />
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="flex gap-6 items-center">
              <div className="flex flex-col">
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <p>
                <IoIosArrowDown />
              </p>
            </div>
          </div>
        </div>
      </nav>

      <h1 className="text-5xl font-bold px-15">Dashboard Overview</h1>

      <main className="p-6 space-y-6 bg-slate-200 mt-28 px-15 h-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 -mt-24">
          {[ 
            { title: "Total Employee", value: 2120, change: "+4.5%" },
            { title: "Today Presents", value: 1200, change: "+4.5%" },
            { title: "Today Absents", value: 800, change: "-4.5%" },
            { title: "Today Leave", value: 120, change: "-4.5%" },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-sm text-black">{card.title}</h2>
              <p className="text-3xl font-bold mt-2 text-black">{card.value}</p>
              <span
                className={`text-sm mt-2 inline-block ${
                  card.change.startsWith("+") ? "text-green-400" : "text-red-400"
                }`}
              >
                {card.change} for last month
              </span>
            </motion.div>
          ))}
        </div>

        {/* Employee Table Component */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <EmployeeTable loading={loading} allEmployees={allEmployees} onRefresh={fetchEmployeeData} />
        </motion.div>
      </main>
    </div>
  );
}
