import React, { useState, useEffect } from "react";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { 
  getEmployeeDetails, 
  getIndividualEmployeeDetails, 
  createEmployee, 
  editEmployee,
  deleteEmployee 
} from "../../services/employeeAPI";

// Enhanced Modal Component with better UI
function Modal({ isOpen, onClose, mode, employee, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    dateOfJoining: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        position: employee.position || "",
        dateOfJoining: employee.dateOfJoining 
          ? new Date(employee.dateOfJoining).toISOString().split("T")[0]
          : ""
      });
    } else {
      setFormData({
        name: "",
        email: "",
        position: "",
        dateOfJoining: ""
      });
    }
  }, [employee]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.position || formData.position.trim().length < 2) {
      newErrors.position = "Position must be at least 2 characters";
    }
    if (formData.dateOfJoining) {
      const d = new Date(formData.dateOfJoining);
      if (isNaN(d.getTime())) {
        newErrors.dateOfJoining = "Enter a valid date";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await onDelete(employee._id);
      onClose();
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "add" ? "Add New Employee" : mode === "edit" ? "Edit Employee" : "Delete Employee"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            disabled={isSubmitting}
          >
            <RxCross2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {(mode === "add" || mode === "edit") && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter full name"
                  required
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter email address"
                  required
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter job position"
                  required
                  disabled={isSubmitting}
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Joining
                </label>
                <input
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                  className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                />
                {errors.dateOfJoining && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {isSubmitting ? "Saving..." : mode === "add" ? "Add Employee" : "Update Employee"}
                </button>
              </div>
            </form>
          )}

          {mode === "delete" && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <MdDelete className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Employee
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-semibold">{employee?.name}</span>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Enhanced Details Modal
function DetailsModal({ isOpen, onClose, employeeId }) {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && employeeId) {
      setLoading(true);
      getIndividualEmployeeDetails(employeeId)
        .then((res) => {
          setEmployeeDetails(res);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, employeeId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Employee Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <RxCross2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          ) : employeeDetails ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{employeeDetails.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{employeeDetails.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Position</label>
                  <p className="text-lg font-semibold text-gray-900">{employeeDetails.position}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Date of Joining</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(employeeDetails.dateOfJoining).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="text-sm font-medium text-gray-500">Created At</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(employeeDetails.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No details available</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Main EmployeeTable Component
export default function EmployeeTable({ loading, allEmployees, onRefresh }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsEmployeeId, setDetailsEmployeeId] = useState(null);
  const [search, setSearch] = useState("");

  const recordsPerPage = 5;
  const filteredEmployees = (allEmployees || []).filter((e) =>
    e.name?.toLowerCase().includes(search.trim().toLowerCase())
  );
  const totalRecords = filteredEmployees.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredEmployees.slice(startIndex, startIndex + recordsPerPage);

  // Auto-navigate to page 1 if current page becomes empty
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    // whenever search changes, reset to page 1
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  const handleSave = async (empData) => {
    try {
      if (modalMode === "add") {
        await createEmployee(empData);
      } else if (modalMode === "edit") {
        await editEmployee(selectedEmployee._id, empData);
      }
      
      // Refresh the employee list
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      
      // Refresh the employee list
      if (onRefresh) {
        await onRefresh();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  };

  const openModal = (mode, employee = null) => {
    setSelectedEmployee(employee);
    setModalMode(mode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
    setModalMode(null);
  };

  const openDetailsModal = (employeeId) => {
    setDetailsEmployeeId(employeeId);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setDetailsEmployeeId(null);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Employee Management</h2>
        <div className="flex w-full sm:w-auto gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="flex-1 sm:w-64 px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          onClick={() => openModal("add")}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm w-full sm:w-auto"
        >
          <IoMdAdd className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add Employee</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 bg-gray-50 px-4 lg:px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">
            <div>Name</div>
            <div>Email</div>
            <div>Position</div>
            <div>Date of Joining</div>
            <div>Created At</div>
            <div className="text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading employees...</p>
              </div>
            ) : currentRecords?.length > 0 ? (
              currentRecords.map((emp) => (
                <div
                  key={emp._id}
                  className="grid grid-cols-6 items-center px-4 lg:px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="font-medium text-gray-900 truncate pr-2">{emp.name}</div>
                  <div className="text-gray-600 truncate pr-2">{emp.email}</div>
                  <div className="text-gray-600 truncate pr-2">{emp.position}</div>
                  <div className="text-gray-600 text-sm">
                    {new Date(emp.dateOfJoining).toLocaleDateString()}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {new Date(emp.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex justify-center gap-1">
                    <button
                      onClick={() => openDetailsModal(emp._id)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      title="View Details"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal("edit", emp)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                      title="Edit Employee"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal("delete", emp)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      title="Delete Employee"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No employees found</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading employees...</p>
            </div>
          ) : currentRecords?.length > 0 ? (
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {currentRecords.map((emp) => (
                <div
                  key={emp._id}
                  className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate pr-2">{emp.name}</h3>
                    <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={() => openDetailsModal(emp._id)}
                        className="p-1.5 sm:p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        title="View Details"
                      >
                        <FiEye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", emp)}
                        className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                        title="Edit Employee"
                      >
                        <FiEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => openModal("delete", emp)}
                        className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        title="Delete Employee"
                      >
                        <MdDelete className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-600 sm:w-16">Email:</span>
                      <span className="text-gray-900 break-all sm:ml-2">{emp.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-600 sm:w-16">Position:</span>
                      <span className="text-gray-900 sm:ml-2">{emp.position}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-600 sm:w-16">Joined:</span>
                      <span className="text-gray-900 sm:ml-2">
                        {new Date(emp.dateOfJoining).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium text-gray-600 sm:w-16">Created:</span>
                      <span className="text-gray-900 sm:ml-2">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No employees found</p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 border border-gray-300 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Previous
          </button>
          
          <div className="flex gap-1 overflow-x-auto max-w-full px-2">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base whitespace-nowrap ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2 border border-gray-300 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        mode={modalMode}
        employee={selectedEmployee}
        onSave={handleSave}
        onDelete={handleDelete}
      />

      <DetailsModal
        isOpen={detailsModalOpen}
        onClose={closeDetailsModal}
        employeeId={detailsEmployeeId}
      />
    </div>
  );
}