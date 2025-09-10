import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SudokuSolver.module.css";

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        // Check row and column
        if (board[row][i] === num || board[i][col] === num) return false;
        // Check 3x3 subgrid
        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[boxRow][boxCol] === num) return false;
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === ".") {
                for (let num = 1; num <= 9; num++) {
                    num = String(num);
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = "."; // Backtrack
                    }
                }
                return false; // Trigger backtracking if no number fits
            }
        }
    }
    return true; // All cells are filled
}

function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => []); // [[],[],[],[],[],[],[],[],[]]
    const cols = Array.from({ length: 9 }, () => []); // [[],[],[],[],[],[],[],[],[]]
    const boxes = Array.from({ length: 9 }, () => []); // [[],[],[],[],[],[],[],[],[]]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = board[i][j];
            if (cell !== ".") {
                if (rows[i].includes(cell)) return false;
                rows[i].push(cell);

                if (cols[j].includes(cell)) return false;
                cols[j].push(cell);

                const boxIndex = 3 * Math.floor(i / 3) + Math.floor(j / 3);
                if (boxes[boxIndex].includes(cell)) return false;
                boxes[boxIndex].push(cell);
            }
        }
    }
    return true;
}

function getSolveSteps(board) {
    const steps = [];

    function helper(board, row = 0, col = 0) {
        // Find next empty cell
        for (let r = row; r < 9; r++) {
            for (let c = r === row ? col : 0; c < 9; c++) {
                if (board[r][c] === ".") {
                    for (let num = 1; num <= 9; num++) {
                        let n = String(num);
                        if (isValid(board, r, c, n)) {
                            board[r][c] = n;
                            steps.push({ r, c, n });
                            if (helper(board, r, c + 1)) return true;
                            board[r][c] = ".";
                            steps.push({ r, c, n: "." }); // Backtrack step
                        }
                    }
                    // If no number matches the empty square
                    return false;
                }
            }
        }
        return true;
    }

    const boardCopy = board.map((row) => [...row]);
    helper(boardCopy);
    return steps;
}

const board = [
    ["5", "3", "4", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", "4", "2", ".", "6", "7"],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    ["3", "4", ".", ".", "8", ".", ".", "7", "9"],
];

const Cell = ({ i, j, cell }) => {
    return (
        <div
            className={`${styles.cell} 
                        ${(i + 1) % 3 === 0 ? styles.boxRow : styles.boxRow1} 
                        ${(j + 1) % 3 === 0 ? styles.boxCol : styles.boxCol1}
                        ${cell === "." && styles.empty}
            `}
            id={`cell-${i}-${j}`}
        >
            {cell}
        </div>
    );
};

const SudokuSolver = () => {
    const [problem, setProblem] = useState(board); // our problem board
    const [total, setTotal] = useState(0); // total steps
    const [animated, setAnimated] = useState(0); // steps completed
    const [steps, setSteps] = useState([]); // array of steps
    const [isAnimating, setIsAnimating] = useState(false); // checks is animation running
    const [solveThis, setSolveThis] = useState(false); // for instant solving the sudoku board
    const [sliderVal, setSliderVal] = useState(1);
    const handleSliderVal = (event) => {
        console.log(event.target.value);
        setSliderVal(event.target.value);
    };

    const handleSolve = () => {
        handleReset();
        setSolveThis(true);
    };

    useEffect(() => {
        if (isAnimating || !solveThis) return;
        if (isValidSudoku(problem)) {
            const boardCopy = problem.map((row) => [...row]);
            solveSudoku(boardCopy);
            setProblem(boardCopy);
            setSolveThis(false);
        } else {
            console.log("Board is invalid");
        }
    }, [solveThis, problem, isAnimating]);

    const nextStep = useCallback(() => {
        if (animated < steps?.length && steps[animated]) {
            const { r, c, n } = steps[animated];
            setProblem((prev) => {
                const copy = prev.map((row) => [...row]);
                copy[r][c] = n;
                return copy;
            });
            setAnimated((prev) => prev + 1);
        }
    }, [animated, steps]);

    const animateSolve = () => {
        setIsAnimating(false); // Cancel any running animation
        handleReset();
        const boardCopy = board.map((row) => [...row]);
        const stepsArr = getSolveSteps(boardCopy);
        setSteps(stepsArr);
        setTotal(stepsArr.length);
        setAnimated(0);
        setIsAnimating(true);
    };

    useEffect(() => {
        if (isAnimating && total > 0 && animated < total) {
            const timer = setTimeout(() => {
                nextStep();
            }, sliderVal);
            return () => clearTimeout(timer);
        }
        // Reset isAnimating when animation finishes
        if (isAnimating && total > 0 && animated >= total) {
            setIsAnimating(false);
            setSteps([]);
            setTotal(0);
            setAnimated(0);
        }
    }, [isAnimating, animated, steps, nextStep, total, sliderVal]);

    const handleReset = () => {
        setIsAnimating(false); // Cancel any running animation
        const boardCopy = board.map((row) => [...row]);
        setProblem(boardCopy);
    };

    const gridRef = useRef(null);
    const [gridHeight, setGridHeight] = useState(0);
    useEffect(() => {
        if (gridRef.current) {
            setGridHeight(gridRef.current.offsetHeight);
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1>Sudoku Solver</h1>
            <div className={styles.middle}>
                <div className={styles.grid} ref={gridRef}>
                    {problem.map((row, i) => {
                        return row.map((cell, j) => <Cell i={i} j={j} cell={cell} key={`${i}${j}`} />);
                    })}
                </div>
                <div className={styles["slider-container"]}>
                    <div className={styles["slider-wrapper"]}>
                        <input
                            type="range"
                            min="1"
                            max="500"
                            className={styles["vertical-slider"]}
                            id="myRange"
                            style={{ minWidth: gridHeight * 0.8 }}
                            onChange={handleSliderVal}
                            value={sliderVal}
                        />
                    </div>
                    <p className={styles["ani-speed"]}>{sliderVal}</p>
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={handleSolve} className={styles.button}>
                    Solve
                </button>
                <button onClick={animateSolve} className={styles.button}>
                    {!isAnimating || !total ? "Animate" : `Steps : ${animated}/${total}`}
                </button>
                <button onClick={handleReset} className={styles.button}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default SudokuSolver;
