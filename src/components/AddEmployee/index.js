import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, getEmployee, updateEmployee } from "../../actions/employeeActions";

const AddEmployee = () => {
    const dispatch = useDispatch();
    const { addEmployeeResult, deleteEmployeeResult, detailEmployeeResult, updateEmployeeResult } = useSelector((state) => state.EmployeeReducer);

    const [id, setId] = useState("");
    const [nama, setNama] = useState("");
    const [jk, setJk] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [status, setStatus] = useState("");
    const [transportasi, setTransportasi] = useState([]);
    const [mobil, setMobil] = useState(false);
    const [motor, setMotor] = useState(false);
    const [umum, setUmum] = useState(false);
    const [alamat, setAlamat] = useState("");
    const [message, setMessage] = useState(false);

    const generatedId = () => {
        return Date.now();
    };

    const resetForm = () => {
        setId("");
        setNama("");
        setJk("");
        setJabatan("");
        setStatus("");
        setTransportasi([]);
        setMobil(false);
        setMotor(false);
        setUmum(false);
        setAlamat("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (nama === "" || jk === "" || jabatan === "" || status === "" || transportasi === [] || alamat === "") {
            return setMessage(true);
        } else if (mobil === false && motor === false && umum === false) {
            return setMessage(true);
        }

        // hide message
        setMessage(false);

        if (id) {
            // update data karyawan
            dispatch(updateEmployee({ id: id, nama: nama, jk: jk, jabatan: jabatan, status: status, transportasi: transportasi, alamat: alamat }));
        } else {
            // add data karyawan
            dispatch(addEmployee({ id: generatedId(), nama: nama, jk: jk, jabatan: jabatan, status: status, transportasi: transportasi, alamat: alamat }));
        }
    };

    useEffect(() => {
        // refresh tabel ketika sukses add data
        dispatch(getEmployee());
    }, [addEmployeeResult, dispatch]);

    useEffect(() => {
        // reset form ketika sukses add/edit data
        resetForm();
    }, [addEmployeeResult]);

    useEffect(() => {
        // reset form ketika sukses delete data
        if (deleteEmployeeResult) {
            resetForm();
        }
    }, [deleteEmployeeResult]);

    useEffect(() => {
        if (detailEmployeeResult) {
            setId(detailEmployeeResult.id);
            setNama(detailEmployeeResult.nama);
            setJk(detailEmployeeResult.jk);
            setJabatan(detailEmployeeResult.jabatan);
            setStatus(detailEmployeeResult.status);
            setTransportasi(detailEmployeeResult.transportasi);
            setMobil(detailEmployeeResult.transportasi.includes("Mobil"));
            setMotor(detailEmployeeResult.transportasi.includes("Motor"));
            setUmum(detailEmployeeResult.transportasi.includes("Transportasi Umum"));
            setAlamat(detailEmployeeResult.alamat);
        }
    }, [detailEmployeeResult]);

    const handleCancelEdit = (event) => {
        event.preventDefault();

        // reset form ketika klik "Batal Edit"
        resetForm();

        // refresh tabel ketika klik "Batal Edit"
        dispatch(getEmployee());

        // refresh tabel ketika klik "Batal Edit"
        setMessage(false);
    };

    useEffect(() => {
        // reset form ketika sukses update data
        resetForm();

        // refresh tabel ketika sukses update data
        dispatch(getEmployee());
    }, [updateEmployeeResult, dispatch]);

    return (
        <>
            <section id="add-employee" className="pt-3 pb-3">
                {/* Content Label Tambah Karyawan */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="fs-4">{id ? "Edit Karyawan" : "Tambah Karyawan"}</p>
                        </div>
                    </div>
                </div>

                {/* Content form Tambah Karyawan */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form className="w-50" onSubmit={(event) => handleSubmit(event)}>
                                {id && (
                                    // label ID
                                    <div className="mb-3">
                                        <label className="form-label">ID Karyawan</label>
                                        <input type="text" className="form-control" name="id" value={id} disabled />
                                    </div>
                                )}

                                {/* Input nama */}
                                <div className="mb-3">
                                    <label className="form-label">Nama</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nama"
                                        placeholder="Input Nama Karyawan"
                                        value={nama}
                                        onChange={(event) => {
                                            setNama(event.target.value);
                                        }}
                                    />
                                </div>

                                {/* Input gender */}
                                <div className="mb-3">
                                    <div className="row">
                                        <label className="form-label">Jenis Kelamin</label>
                                    </div>

                                    <div className="form-check form-check-inline">
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
                                    <div className="form-check form-check-inline">
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

                                {/* Input jabatan */}
                                <div className="mb-3">
                                    <label className="form-label">Jabatan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="jabatan"
                                        placeholder="Input Jabatan"
                                        value={jabatan}
                                        onChange={(event) => {
                                            setJabatan(event.target.value);
                                        }}
                                    />
                                </div>

                                {/* input status karyawan */}
                                <div className="mb-3">
                                    <label className="form-label">Status Karyawan</label>
                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(event) => {
                                            setStatus(event.target.value);
                                        }}
                                    >
                                        <option value="">Pilih Status Karyawan</option>
                                        <option value="Pegawai Tetap">Pegawai Tetap</option>
                                        <option value="Pegawai Vendor">Pegawai Vendor</option>
                                        <option value="Pegawai Intern">Pegawai Intern</option>
                                    </select>
                                </div>

                                {/* input transportasi */}
                                <div className="mb-3">
                                    <div className="row">
                                        <label className="form-label">Modal Transportasi</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="mobil"
                                            id="Mobil"
                                            checked={mobil}
                                            value="Mobil"
                                            onChange={(event) => {
                                                setMobil(!mobil);
                                                if (!mobil) {
                                                    setTransportasi([...transportasi, event.target.value]);
                                                } else {
                                                    setTransportasi(
                                                        transportasi.filter((item) => {
                                                            return item !== event.target.value;
                                                        })
                                                    );
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="Mobil">
                                            Mobil
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="motor"
                                            id="Motor"
                                            checked={motor}
                                            value="Motor"
                                            onChange={(event) => {
                                                setMotor(!motor);
                                                if (!motor) {
                                                    setTransportasi([...transportasi, event.target.value]);
                                                } else {
                                                    setTransportasi(
                                                        transportasi.filter((item) => {
                                                            return item !== event.target.value;
                                                        })
                                                    );
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="Motor">
                                            Motor
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="umum"
                                            id="Transportasi Umum"
                                            checked={umum}
                                            value="Transportasi Umum"
                                            onChange={(event) => {
                                                setUmum(!umum);
                                                if (!umum) {
                                                    setTransportasi([...transportasi, event.target.value]);
                                                } else {
                                                    setTransportasi(
                                                        transportasi.filter((item) => {
                                                            return item !== event.target.value;
                                                        })
                                                    );
                                                }
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="Transportasi Umum">
                                            Transportasi Umum
                                        </label>
                                    </div>
                                </div>

                                {/* input alamat */}
                                <div class="mb-3">
                                    <label class="form-label">Alamat</label>
                                    <textarea
                                        class="form-control"
                                        rows="3"
                                        name="alamat"
                                        placeholder="Input alamat / asal kota"
                                        value={alamat}
                                        onChange={(event) => {
                                            setAlamat(event.target.value);
                                        }}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-success btn-sm">
                                    {id ? "Update Karyawan" : "Tambah Karyawan"}
                                </button>
                                {id && (
                                    <button className="btn btn-warning btn-sm ms-3" onClick={(event) => handleCancelEdit(event)}>
                                        Batal Edit
                                    </button>
                                )}
                                {message && (
                                    <span className="fs-6 ms-3" style={{ color: "red" }}>
                                        Mohon isi semua inputan form...!
                                    </span>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddEmployee;
