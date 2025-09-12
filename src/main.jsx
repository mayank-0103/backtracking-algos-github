// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LargestIsland from "./pages/LargestIsland.jsx";
import PathFinder from "./pages/PathFinder.jsx";
import Permutations from "./pages/Permutations.jsx";
import SudokuSolver from "./pages/SudokuSolver.jsx";
import Nqueens_problem from "./pages/Nqueens_problem.jsx";

//! Creating router for our chat application
const routerMine = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App is the layout
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/largest-island",
                element: <LargestIsland />,
            },
            {
                path: "/path-finder",
                element: <PathFinder />,
            },
            {
                path: "/permutations",
                element: <Permutations />,
            },
            {
                path: "/sudoku-solver",
                element: <SudokuSolver />,
            },
            {
                path: "/n-queens",
                element: <Nqueens_problem/>
            }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <RouterProvider router={routerMine} />
    // </StrictMode>
);
