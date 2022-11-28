import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Header from "./components/Header";

function App() {
    return (
        <div>
            <Header />
            <AddEmployee />
            <EmployeeList />
        </div>
    );
}

export default App;
