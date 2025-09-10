import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import  "./App.css";

function App() {
    return (
        <>
            {/* Maybe a navbar here */}
            <Header/>
            <main>
                <Outlet />
            </main>
            {/* <h1>© Mayank Raj</h1> */}
        </>
    );
}

export default App;
