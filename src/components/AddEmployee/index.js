import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, getEmployee, updateEmployee } from "../../actions/employeeActions";

const AddEmployee = () => {
    const [id, setId] = useState("");
    const [nama, setNama] = useState("");
    const [jk, setJk] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [status, setStatus] = useState("");
    const [transportasi, setTransportasi] = useState([]);
    const [checkMobil, setCheckMobil] = useState(false);
    const [checkMotor, setCheckMotor] = useState(false);
    const [checkUmum, setCheckUmum] = useState(false);
    const [alamat, setAlamat] = useState("");
    const [message, setMessage] = useState(false);

    const dispatch = useDispatch();
    const { addEmployeeResult, detailEmployeeResult, deleteEmployeeResult, updateEmployeeResult } = useSelector((state) => state.EmployeeReducer);

    const handleCheckMobil = (event) => {
        setCheckMobil(!checkMobil);
        if (!checkMobil) {
            setTransportasi([...transportasi, event.target.value]);
        } else {
            setTransportasi(
                transportasi.filter((item) => {
                    return item !== event.target.value;
                })
            );
        }
    };

    const handleCheckMotor = (event) => {
        setCheckMotor(!checkMotor);
        if (!checkMotor) {
            setTransportasi([...transportasi, event.target.value]);
        } else {
            setTransportasi(
                transportasi.filter((item) => {
                    return item !== event.target.value;
                })
            );
        }
    };

    const handleCheckUmum = (event) => {
        setCheckUmum(!checkUmum);
        if (!checkUmum) {
            setTransportasi([...transportasi, event.target.value]);
        } else {
            setTransportasi(
                transportasi.filter((item) => {
                    return item !== event.target.value;
                })
            );
        }
    };

    const generatedId = () => {
        return Date.now();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // show message when one of input form unfilled
        if (nama === "" || jk === "" || jabatan === "" || status === "" || transportasi === [] || alamat === "") {
            return setMessage(true);
        } else if (checkMobil === false && checkMotor === false && checkUmum === false) {
            return setMessage(true);
        }

        setMessage(false);

        if (id) {
            // update data employee to database
            dispatch(updateEmployee({ id: id, nama: nama, jk: jk, jabatan: jabatan, status: status, transportasi: transportasi, alamat: alamat }));
        } else {
            // add data employee to database
            dispatch(addEmployee({ id: generatedId(), nama: nama, jk: jk, jabatan: jabatan, status: status, transportasi: transportasi, alamat: alamat }));
        }
    };

    const refreshForm = () => {
        setId("");
        setNama("");
        setJk("");
        setJabatan("");
        setStatus("");
        setTransportasi([]);
        setCheckMobil(false);
        setCheckMotor(false);
        setCheckUmum(false);
        setAlamat("");
    };

    useEffect(() => {
        // refresh form "Add Employee" after add new data
        refreshForm();

        // refresh table "Employee List" after add new data
        dispatch(getEmployee());
    }, [addEmployeeResult, dispatch]);

    // show detail employee after click button "Edit"
    useEffect(() => {
        if (detailEmployeeResult) {
            setId(detailEmployeeResult.id);
            setNama(detailEmployeeResult.nama);
            setJk(detailEmployeeResult.jk);
            setJabatan(detailEmployeeResult.jabatan);
            setStatus(detailEmployeeResult.status);
            setTransportasi(detailEmployeeResult.transportasi);
            setCheckMobil(detailEmployeeResult.transportasi.includes("Mobil"));
            setCheckMotor(detailEmployeeResult.transportasi.includes("Motor"));
            setCheckUmum(detailEmployeeResult.transportasi.includes("Transportasi Umum"));
            setAlamat(detailEmployeeResult.alamat);
        }
    }, [detailEmployeeResult]);

    const handleCancelEdit = () => {
        // refresh form "Edit Employee" after click button "Cancel Edit"
        refreshForm();

        // refresh table "List Employee" after click button "Cancel Edit"
        dispatch(getEmployee());

        setMessage(false);
    };

    useEffect(() => {
        // hide message when click button "Edit"
        if (detailEmployeeResult) {
            setMessage(false);
        }
    }, [detailEmployeeResult]);

    useEffect(() => {
        if (deleteEmployeeResult) {
            // refresh form "Add/Edit Employee" after success delete data
            refreshForm();

            // hide message after success dalete employee
            setMessage(false);
        }
    }, [deleteEmployeeResult]);

    useEffect(() => {
        // refresh form "Edit Employee" after click button "Update Employee"
        refreshForm();

        // refresh table "Employee List" after update employee
        dispatch(getEmployee());
    }, [updateEmployeeResult, dispatch]);

    return (
        <>
            <div className="container">
                <div className="row pt-3">
                    <p className="fs-4">{id ? "Edit Employee" : "Add Employee"}</p>
                </div>

                <div className="row w-50">
                    <form onSubmit={(event) => handleSubmit(event)}>
                        {id && (
                            <div className="mb-3">
                                <label className="form-label">Employee ID</label>
                                <input type="text" className="form-control" name="id" value={id} disabled />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label">Employee Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Input Employee Name"
                                name="nama"
                                value={nama}
                                onChange={(event) => {
                                    setNama(event.target.value);
                                }}
                            />
                        </div>

                        <label className="form-label">Gender</label>
                        <div className="row flex-nowrap mb-3 ps-3">
                            <div className="form-check w-auto">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="jk"
                                    id="Laki-laki"
                                    checked={jk === "Laki-laki"}
                                    value={jk}
                                    onChange={(event) => {
                                        setJk(event.target.id);
                                    }}
                                />
                                <label className="form-check-label" htmlFor="Laki-laki">
                                    Laki-laki
                                </label>
                            </div>
                            <div className="form-check w-auto">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="jk"
                                    id="Perempuan"
                                    checked={jk === "Perempuan"}
                                    value={jk}
                                    onChange={(event) => {
                                        setJk(event.target.id);
                                    }}
                                />
                                <label className="form-check-label" htmlFor="Perempuan">
                                    Perempuan
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Position</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Input Position"
                                name="jabatan"
                                value={jabatan}
                                onChange={(event) => {
                                    setJabatan(event.target.value);
                                }}
                            />
                        </div>

                        <label className="form-label">Employee Status</label>
                        <select
                            className="form-select mb-3"
                            name="status"
                            value={status}
                            onChange={(event) => {
                                setStatus(event.target.value);
                            }}
                        >
                            <option value="">Select Employee Status</option>
                            <option value="Pegawai Tetap">Pegawai Tetap</option>
                            <option value="Pegawai Vendor">Pegawai Vendor</option>
                            <option value="Pegawai Intern">Pegawai Intern</option>
                        </select>

                        <label className="form-label">Transportation</label>
                        <div className="row ps-3 mb-3 flex-nowrap">
                            <div className="form-check w-auto">
                                <input className="form-check-input" type="checkbox" name="transportasi" value="Mobil" id="Mobil" checked={checkMobil} onChange={(event) => handleCheckMobil(event)} />
                                <label className="form-check-label" htmlFor="Mobil">
                                    Mobil
                                </label>
                            </div>
                            <div className="form-check w-auto">
                                <input className="form-check-input" type="checkbox" name="transportasi" value="Motor" id="Motor" checked={checkMotor} onChange={(event) => handleCheckMotor(event)} />
                                <label className="form-check-label" htmlFor="Motor">
                                    Motor
                                </label>
                            </div>
                            <div className="form-check w-auto">
                                <input className="form-check-input" type="checkbox" name="transportasi" value="Transportasi Umum" id="Umum" checked={checkUmum} onChange={(event) => handleCheckUmum(event)} />
                                <label className="form-check-label" htmlFor="Umum">
                                    Transportasi Umum
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Input Address"
                                name="alamat"
                                value={alamat}
                                onChange={(event) => {
                                    setAlamat(event.target.value);
                                }}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-success btn-sm">
                            {id ? "Update Employee" : "Add Employee"}
                        </button>
                        {id && (
                            <button className="btn btn-warning btn-sm mx-1" onClick={() => handleCancelEdit()}>
                                Cancel Edit
                            </button>
                        )}
                        {message && <span className="fs-6 my-auto mx-3 text-danger">Please complete the entire input form</span>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
