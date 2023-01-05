import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, detailEmployee, getEmployee } from "../../actions/employeeActions";

const ListEmployee = () => {
    const dispatch = useDispatch();
    const { getEmployeeLoading, getEmployeeResult, getEmployeeError, deleteEmployeeResult } = useSelector((state) => state.EmployeeReducer);

    useEffect(() => {
        // get data karyawan
        dispatch(getEmployee());
    }, [dispatch]);

    useEffect(() => {
        // refresh tabel karyawan ketika sukses delete data
        dispatch(getEmployee());
    }, [deleteEmployeeResult, dispatch]);

    return (
        <>
            <section id="list-employee" className="pt-3 pb-3">
                {/* Title Tabel */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="fs-4">List Karyawan</p>
                        </div>
                    </div>
                </div>

                {/* Tabel Karyawan */}
                {getEmployeeResult ? (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <table className="table table-primary table-striped table-hover table-bordered">
                                    <thead>
                                        <tr className="text-center">
                                            <th className="col-1">#</th>
                                            <th className="col-2">Nama</th>
                                            <th className="col-1">Gender</th>
                                            <th className="col-2">Jabatan</th>
                                            <th className="col-2">Status</th>
                                            <th className="col-3">Alamat</th>
                                            <th className="col-1">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getEmployeeResult.map((employee) => {
                                            return (
                                                <tr key={employee.id}>
                                                    <th className="text-center">{getEmployeeResult.indexOf(employee) + 1}</th>
                                                    <td>{employee.nama}</td>
                                                    <td className="text-center">{employee.jk}</td>
                                                    <td className="text-center">{employee.jabatan}</td>
                                                    <td className="text-center">{employee.status}</td>
                                                    <td className="text-center">{employee.alamat}</td>
                                                    <td>
                                                        <div className="row flex-nowrap">
                                                            <div className="col">
                                                                <button className="btn btn-info btn-sm" onClick={() => dispatch(detailEmployee(employee))}>
                                                                    Edit
                                                                </button>
                                                            </div>
                                                            <div className="col">
                                                                <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteEmployee(employee.id))}>
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : getEmployeeLoading ? (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="fs-5">Loading...</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p>{getEmployeeError ? getEmployeeError : "Data Karyawan Kosong..."}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default ListEmployee;
