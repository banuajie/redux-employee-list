import { ADD_EMPLOYEE, DELETE_EMPLOYEE, DETAIL_EMPLOYEE, GET_EMPLOYEE, UPDATE_EMPLOYEE } from "../../actions/employeeActions";

const initialState = {
    getEmployeeLoading: false,
    getEmployeeResult: false,
    getEmployeeError: false,

    addEmployeeLoading: false,
    addEmployeeResult: false,
    addEmployeeError: false,

    deleteEmployeeLoading: false,
    deleteEmployeeResult: false,
    deleteEmployeeError: false,

    detailEmployeeResult: false,

    updateEmployeeLoading: false,
    updateEmployeeResult: false,
    updateEmployeeError: false,
};

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE:
            return {
                ...state,
                getEmployeeLoading: action.payload.loading,
                getEmployeeResult: action.payload.data,
                getEmployeeError: action.payload.errorMessage,
            };

        case ADD_EMPLOYEE:
            return {
                ...state,
                addEmployeeLoading: action.payload.loading,
                addEmployeeResult: action.payload.data,
                addEmployeeError: action.payload.errorMessage,
            };

        case DELETE_EMPLOYEE:
            return {
                ...state,
                deleteEmployeeLoading: action.payload.loading,
                deleteEmployeeResult: action.payload.data,
                deleteEmployeeError: action.payload.errorMessage,
            };

        case DETAIL_EMPLOYEE:
            return {
                ...state,
                detailEmployeeResult: action.payload.data,
            };

        case UPDATE_EMPLOYEE:
            return {
                ...state,
                updateEmployeeLoading: action.payload.loading,
                updateEmployeeResult: action.payload.data,
                updateEmployeeError: action.payload.errorMessage,
            };

        default:
            return state;
    }
};

export default EmployeeReducer;
