import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import  "./App.css";

function App() {
    return (
        <div className="website">
            {/* Maybe a navbar here */}
            <Header/>
            <main>
                <Outlet />
            </main>
            {/* <h1>© Mayank Raj</h1> */}
        </div>
    );
}

export default App;
