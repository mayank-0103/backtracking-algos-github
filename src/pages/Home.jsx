import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const algos = [
    [
        1,
        "Largest Island",
        "largest-island",
        <>O(m×n)</>,
        <>
            <p>
                Given a 2D grid of 0s and 1s, find the area of the largest connected group of 1s (island, connected
                horizontally or vertically).
            </p>
            <table className={styles.islandTable}>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Time Complexity</strong>
                        </td>
                        <td>
                            O(m × n), where m and n are the grid's dimensions.
                            <br />
                            Every cell is visited once, and DFS/BFS explores each connected land cell.
                            <br />
                            Each DFS call explores one island completely, so no overlap occurs.
                            <br />
                            The traversal efficiently checks all cells with minimal repeated effort.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Space Complexity</strong>
                        </td>
                        <td>
                            O(m × n) in the worst case, due to the recursion stack or visited matrix.
                            <br />
                            If the whole grid is land, auxiliary space equals grid size.
                            <br />
                            BFS implementation may require additional queue space.
                            <br />
                            Extra space is proportional to the number of land cells stored during traversal.
                        </td>
                    </tr>
                </tbody>
            </table>
        </>,
    ],
    [
        2,
        "Path finder",
        "path-finder",
        <>O(m×n)</>,
        <>
            <p>
                Given a 2D grid where <b>1</b> represents traversable land and <b>0</b> represents a wall, determine if
                there is any path from the top-left corner (start) to the bottom-right corner (goal) using only up,
                down, left, or right moves. This algorithm uses Depth-First Search (DFS) and does not guarantee the
                shortest path.
            </p>
            <table className={styles.islandTable}>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Time Complexity</strong>
                        </td>
                        <td>
                            O(m × n), where m and n are the grid's dimensions.
                            <br />
                            Each cell is visited at most once during DFS as we explore possible paths.
                            <br />
                            In the worst case (all cells are traversable), the DFS checks every cell.
                            <br />
                            The search stops early if a valid path is found to the goal.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Space Complexity</strong>
                        </td>
                        <td>
                            O(m × n) in the worst case, due to the recursion stack and visited matrix.
                            <br />
                            The stack depth is at most the number of cells in the current path.
                            <br />
                            Begins fresh for each path search, maintaining auxiliary arrays for marking visited cells.
                            <br />
                            Space is minimized if walls prevent deep recursion or long paths.
                        </td>
                    </tr>
                </tbody>
            </table>
        </>,
    ],
    [
        3,
        "Permutations of a string",
        "permutations",
        <>O(n!)</>,
        <>
            <p>
                Given a string, this tool calculates all possible permutations of its characters. Each permutation is a
                unique arrangement and no character repeats in a single result. The algorithm uses recursion and swaps
                characters, ensuring every order is generated.
            </p>
            <table className={styles.islandTable}>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Time Complexity</strong>
                        </td>
                        <td>
                            O(n!), where <b>n</b> is the length of the input string.
                            <br />
                            Every possible arrangement (permutation) is generated, with n! total results.
                            <br />
                            Each recursive call branches out n times until the string is empty.
                            <br />
                            The number of operations grows rapidly as n increases.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Space Complexity</strong>
                        </td>
                        <td>
                            O(n! × n), as every permutation of length n is stored.
                            <br />
                            Additional space is used by the recursion stack, up to O(n) in depth.
                            <br />
                            Storing all results requires significant memory for longer strings.
                            <br />
                            Auxiliary storage and output both scale exponentially with n.
                        </td>
                    </tr>
                </tbody>
            </table>
        </>,
    ],
    [
        4,
        "Sudoku Solver",
        "sudoku-solver",
        <>
            O(9<sup>m</sup>)
        </>,
        <>
            <p>
                A Sudoku solver is an algorithm that fills a 9×9 grid so that every row, column, and 3×3 subgrid
                contains all digits from 1 to 9 exactly once. The most common method is <b>backtracking</b>, which
                systematically tries all possibilities for empty cells, placing a number, checking validity, and
                backtracking if a conflict occurs. This guarantees a solution if one exists and always finds one (though
                not necessarily the unique one) for valid puzzles. While simple to implement and reliable, backtracking
                is not the fastest and its performance declines on grids with fewer clues or many possible combinations.
            </p>

            <table className={styles.islandTable}>
                <thead>
                    <tr>
                        <th>Aspect</th>
                        <th>Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Time Complexity</strong>
                        </td>
                        <td>
                            The worst-case time complexity is O(9^(m)), where m is the number of empty cells.
                            <br />
                            At each empty cell, the algorithm tries all 9 possible digits, recursing deeper for each
                            choice.
                            <br />
                            In practice, the branching factor is often much smaller due to early pruning by the isValid
                            check.
                            <br />
                            Despite pruning, the algorithm is exponential and performance degrades as the number of
                            empty cells increases.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Space Complexity</strong>
                        </td>
                        <td>
                            Space complexity is O(m) due to the recursion stack, where m is the number of empty cells.
                            <br />
                            Additional O(1) space is used for the Sudoku board itself (constant size 9x9).
                            <br />
                            The stack depth never exceeds the number of empty cells as each recursive call fills one
                            cell.
                            <br />
                            Auxiliary storage is negligible compared to the recursion stack, as all operations occur in
                            place.
                        </td>
                    </tr>
                </tbody>
            </table>
        </>,
    ],
];

const Home = () => {
    const [popupContent, setPopupContent] = useState(null); // State for popup

    const closePopup = () => setPopupContent(null);
    const handlePopUp = (title, text) => {
        setPopupContent(<PopUp title={title} text={text} close={closePopup} />);
    };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        <th scope="col" className={styles.th}>
                            S.no
                        </th>
                        <th scope="col" className={styles.th}>
                            Problem
                        </th>
                        <th scope="col" className={styles.th}>
                            Visualization
                        </th>
                        <th scope="col" className={styles.th}>
                            Time Complexity
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {algos.map((algo, index) => {
                        const [id, problem, route, time_complexity, text] = algo;
                        return (
                            <Entry
                                key={`algo-${index}`}
                                id={id}
                                problem={problem}
                                route={route}
                                time_complexity={time_complexity}
                                text={text}
                                func={handlePopUp}
                            />
                        );
                    })}
                </tbody>
            </table>
            {popupContent}
        </div>
    );
};

const Entry = ({ id, problem, route, time_complexity, text, func }) => {
    return (
        <tr className={styles.tr}>
            <td scope="row" className={styles.td}>
                {id}
            </td>
            <th scope="row" className={styles.td}>
                <div>
                    <p>{problem}</p>
                    <img src="/info.png" onClick={() => func(problem, text)} />
                </div>
            </th>
            <td className={styles.td}>
                <Link to={`/${route}`} className={styles.link}>
                    <p>Open</p>
                    <img src="/open.svg" alt="Open icon" />
                </Link>
            </td>
            <td className={`${styles.td} ${styles.complexity}`}>{time_complexity}</td>
        </tr>
    );
};

const PopUp = ({ title, text, close }) => {
    const [visible, setVisible] = useState(false);

    // When component mounts, trigger visible state for transition
    useEffect(() => {
        const openTimer = setTimeout(() => setVisible(true), 10); // 10ms delay
        return () => clearTimeout(openTimer);
    }, []);

    // Handle animate-out
    const handleClose = () => {
        setVisible(false);
        setTimeout(close, 250); // match transition duration
    };

    return (
        <div className={`${styles["black-bg"]} ${visible ? styles["show-bg"] : styles["hide-bg"]}`}>
            <div className={`${styles.popup} ${visible ? styles.show : styles.hide}`}>
                <div className={styles["title-bar"]}>
                    <p>{title}</p>
                    <img src="/cancel.svg" onClick={handleClose} style={{ cursor: "pointer" }} />
                </div>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
};

export default Home;
