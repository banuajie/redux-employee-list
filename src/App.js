import AddEmployee from "./components/AddEmployee";
import Header from "./components/Header";
import ListEmployee from "./components/ListEmployee";

function App() {
    return (
        <div className="App">
            <Header />
            <AddEmployee />
            <ListEmployee />
        </div>
    );
}

export default App;
