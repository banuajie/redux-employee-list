import axios from "axios";

export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const DETAIL_EMPLOYEE = "DETAIL_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";

export const getEmployee = () => {
    return (dispatch) => {
        // loading
        dispatch({
            type: GET_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        // get data
        axios({
            method: "GET",
            url: "http://localhost:4000/employees",
            timeout: 10000,
        })
            .then((response) => {
                // when success get data
                dispatch({
                    type: GET_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                // when failed get data
                dispatch({
                    type: GET_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const addEmployee = (data) => {
    return (dispatch) => {
        // loading
        dispatch({
            type: ADD_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        // add data
        axios({
            method: "POST",
            url: "http://localhost:4000/employees",
            timeout: 10000,
            data: data,
        })
            .then((response) => {
                // when success add data
                dispatch({
                    type: ADD_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                // when failed add data
                dispatch({
                    type: ADD_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const deleteEmployee = (id) => {
    return (dispatch) => {
        // loading
        dispatch({
            type: DELETE_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        // delete data
        axios({
            method: "DELETE",
            url: "http://localhost:4000/employees/" + id,
            timeout: 10000,
        })
            .then((response) => {
                // when success delete data
                dispatch({
                    type: DELETE_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                // when failed delete data
                dispatch({
                    type: DELETE_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};

export const detailEmployee = (data) => {
    return (dispatch) => {
        // loading
        dispatch({
            type: DETAIL_EMPLOYEE,
            payload: {
                data: data,
            },
        });
    };
};

export const updateEmployee = (data) => {
    return (dispatch) => {
        // loading
        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            },
        });

        // update data
        axios({
            method: "PUT",
            url: "http://localhost:4000/employees/" + data.id,
            timeout: 10000,
            data: data,
        })
            .then((response) => {
                // when success update data
                dispatch({
                    type: UPDATE_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: response.data,
                        errorMessage: false,
                    },
                });
            })
            .catch((error) => {
                // when failed update data
                dispatch({
                    type: UPDATE_EMPLOYEE,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    },
                });
            });
    };
};
