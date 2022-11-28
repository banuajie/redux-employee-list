import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, detailEmployee, getEmployee } from "../../actions/employeeActions";

const EmployeeList = () => {
    const dispatch = useDispatch();
    const { getEmployeeLoading, getEmployeeResult, getEmployeeError, deleteEmployeeResult } = useSelector((state) => state.EmployeeReducer);

    useEffect(() => {
        // get data employee
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        // refresh table "Employee List" after success delete data
        dispatch(getEmployee());
    }, [deleteEmployeeResult, dispatch]);

    return (
        <>
            <div className="container">
                <div className="row pt-3 pb-3">
                    <p className="fs-4 my-auto">List Employee</p>
                </div>

                <div className="row ps-3">
                    {getEmployeeResult ? (
                        <table className="table table-primary table-striped table-hover table-bordered">
                            <thead>
                                <tr className="text-center">
                                    <th className="col-1">#</th>
                                    <th className="col-3">Employee Name</th>
                                    <th className="col-1">Gender</th>
                                    <th className="col-2">Position</th>
                                    <th className="col-2">Status</th>
                                    <th className="col-2">Address</th>
                                    <th className="col-1">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getEmployeeResult.map((employee) => {
                                    return (
                                        <tr key={employee.id}>
                                            <td className="text-center">{getEmployeeResult.indexOf(employee) + 1}</td>
                                            <td>{employee.nama}</td>
                                            <td className="text-center">{employee.jk}</td>
                                            <td className="text-center">{employee.jabatan}</td>
                                            <td className="text-center">{employee.status}</td>
                                            <td className="text-center">{employee.alamat}</td>
                                            <td>
                                                <div className="container">
                                                    <div className="row flex-nowrap">
                                                        <div className="col">
                                                            <button className="btn btn-info btn-sm" onClick={() => dispatch(detailEmployee(employee))}>
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div className="col">
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => {
                                                                    const confirmDelete = window.confirm(`Are you sure you want to delete data ${employee.nama} ?`);
                                                                    if (confirmDelete === true) {
                                                                        dispatch(deleteEmployee(employee.id));
                                                                    } else {
                                                                        return;
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : getEmployeeLoading ? (
                        <p className="fs-5">Loading Data Employee...</p>
                    ) : (
                        <p className="fs-5">{getEmployeeError ? getEmployeeError : "Empty Data Employee"}</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default EmployeeList;
